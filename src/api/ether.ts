import { BigNumber, Transaction, ethers } from 'ethers'
import {
  IParsedPositionWasOpenedEvent,
  IPositionWasOpenedEvent,
  OpenPosition,
  PositionType,
  PositionWasOpenedEvent,
  Priority,
  ProfitsAndLosses,
  TransactionReceipt,
} from '../types'

import { ContractFactory } from './contract-factory'
import addresses from '../assets/addresses.json'
import { hexToDecimal } from '../utils'
import { tokens } from '../assets/tokenlist.json'

// THIS GLOBAL INSTANCE IS USED TO SIMPLIFY ARHITECTURE
export let etherGlobal: Ether

export const initializeGlobalInstance = (instance: Ether) => {
  etherGlobal = instance
}

export const maxApproval: BigNumber = ethers.constants.MaxUint256

export class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.ensureSigner()
  }

  parseUnits(
    amount: string,
    tokenAddress: string,
  ): ethers.BigNumber | undefined {
    try {
      const token = tokens.find((tkn) => tkn.address === tokenAddress)
      if (!token) {
        throw new Error('token not found!')
      }
      const decimals = token.decimals

      return ethers.utils.parseUnits(amount, decimals)
    } catch (error) {
      console.log(error)
    }
  }

  formatUnits(amount: string, tokenAddress: string): string | undefined {
    try {
      const token = tokens.find((tkn) => tkn.address === tokenAddress)
      if (!token) {
        throw new Error('token not found!')
      }
      const decimals = token.decimals

      return ethers.utils.formatUnits(amount, decimals)
    } catch (error) {
      console.log(error)
    }
  }

  async ensureSigner() {
    if (!this.signer) {
      this.signer = await this.provider.getSigner()
    }
    return this.signer
  }

  getProvider() {
    return this.provider
  }
  getBlockNumber() {
    return this.provider.getBlockNumber()
  }

  getNetwork() {
    return this.provider.getNetwork()
  }

  async getBalance() {
    const account = await this.getAccountAddress()
    const balance = await this.provider.getBalance(account!)
    return balance.toHexString()
  }
  async getAccountAddress(): Promise<string | null> {
    const accounts = await this.provider.listAccounts()
    return accounts.length > 0 ? accounts[0] : null
  }

  getAddresses() {
    return addresses.addresses
  }

  async getBlockGasLimit() {
    return await (
      await this.provider.getBlock('latest')
    ).gasLimit
  }

  // ========= STAKE PAGE =========

  async getMaxWithdrawAmount(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(await this.ensureSigner())

    // @ts-ignore
    const amount = (await vault.claimable(tokenAddress)).toHexString()

    return hexToDecimal(amount)
  }

  async getMaxDepositAmount(tokenAddress: string): Promise<number> {
    const tokenContract = ContractFactory.getTokenContract(
      tokenAddress,
      await this.ensureSigner(),
    )
    const balance = (
      await tokenContract.balanceOf(this.getAccountAddress())
    ).toHexString()

    return hexToDecimal(balance)
  }

  async getTokenTvl(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(await this.ensureSigner())
    //@ts-ignore
    const tvl = (await vault.balance(tokenAddress)).toHexString()

    return hexToDecimal(tvl)
  }

  async computeAnnualPercentageYield(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(await this.ensureSigner())
    const token = ContractFactory.getTokenContract(
      tokenAddress,
      await this.ensureSigner(),
    )

    // @ts-ignore
    const tokenSubvault = await vault.vaults(tokenAddress)
    const createdAt = parseInt(tokenSubvault.creationTime.toHexString(), 16)
    const daysFromStart = Math.floor(
      (new Date().getTime() / 1000 - createdAt) / 86400,
    )
    // @ts-ignore
    const balance = (await vault.balance(tokenAddress)).toHexString()
    const tokenTotalSupply = (await token.totalSupply()).toHexString()

    return Math.pow(
      parseInt(balance) / parseInt(tokenTotalSupply),
      (365 / daysFromStart - 1) * 100,
    )
  }
  async allowanceForToken(
    tokenAddress: string,
    destinationAddress: string,
  ): Promise<number> {
    const account = await this.getAccountAddress()
    const tokenContract = ContractFactory.getTokenContract(
      tokenAddress,
      await this.ensureSigner(),
    )
    const allowance = await tokenContract.allowance(account, destinationAddress)
    return hexToDecimal(allowance.toHexString())
  }

  async approve(
    tokenAddress: string,
    destinationAddress: string,
    amount: number,
  ): Promise<Transaction | null> {
    try {
      const tokenContract = ContractFactory.getTokenContract(
        tokenAddress,
        await this.ensureSigner(),
      )
      const gasLimit = await this.getApprovalGasEstimation(
        tokenAddress,
        destinationAddress,
        amount,
      )

      return tokenContract.approve(
        destinationAddress,
        this.parseUnits(amount.toString(), tokenAddress),
        {
          gasLimit,
        },
      )
    } catch (e: any) {
      console.error(e)
      return null
    }
  }
  async getApprovalGasEstimation(
    tokenAddress: string,
    destinationAddress: string,
    amount: number,
  ) {
    const tokenContract = ContractFactory.getTokenContract(
      tokenAddress,
      await this.ensureSigner(),
    )
    const gas = await tokenContract.estimateGas.approve(
      destinationAddress,
      this.parseUnits(amount.toString(), tokenAddress),
    )
    return gas.mul(120).div(100)
  }
  async getTransactionGasEstimate(account: string, to: string, value: number) {
    // THIS IS CURRENTLY NOT WORKING.
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-estimateGas
    //
    const gas = await (
      await this.ensureSigner()
    ).estimateGas({
      from: account,
      to,
      value,
    })
    return gas
  }

  async getUserTokenBalance(tokenAddress: string): Promise<number> {
    const token = ContractFactory.getTokenContract(
      tokenAddress,
      await this.ensureSigner(),
    )
    const balance = await token.balanceOf(this.getAccountAddress())
    return hexToDecimal(balance.toHexString())
  }
  async getSerializableTransactionReceipt(
    tx: string,
  ): Promise<TransactionReceipt | null> {
    const response = await this.provider.getTransactionReceipt(tx)
    if (!response) {
      return null
    }
    const {
      blockHash,
      blockNumber,
      contractAddress,
      from,
      status,
      to,
      transactionHash,
      transactionIndex,
    } = response
    return {
      blockHash,
      blockNumber,
      contractAddress,
      from,
      status,
      to,
      transactionHash,
      transactionIndex,
    }
  }

  async depositToken(tokenAddress: string, amount: string): Promise<any> {
    try {
      const vault = ContractFactory.getVaultContract(await this.ensureSigner())

      //@ts-ignore
      const stake = await vault.stake(
        tokenAddress,
        this.parseUnits(amount, tokenAddress),
      )
      return stake
    } catch (error) {
      console.log(error)
    }
  }

  async withdrawToken(tokenAddress: string, amount: string): Promise<any> {
    try {
      const vault = ContractFactory.getVaultContract(await this.ensureSigner())

      //@ts-ignore
      const withdraw = await vault.unstake(
        tokenAddress,
        this.parseUnits(amount, tokenAddress),
        {
          gasLimit: 10000000, // GAS LIMIT
        },
      )
      return withdraw
    } catch (error) {
      console.log(error)
    }
  }

  // ========= MARGIN TRADING =========

  // TODO: This function is layed out but the data is wrong since we don't yet know precisely what data PositionWasOpened event returns.
  async computeProfitsAndLosses(
    positionEvent: PositionWasOpenedEvent,
  ): Promise<ProfitsAndLosses> {
    const marginTrading = ContractFactory.getMarginTradingStrategyContract(
      await this.ensureSigner(),
    )

    let profitsAndLosses = 0

    const createdAt = parseInt(positionEvent.createdAt, 16)
    const principal = parseInt(positionEvent.principal, 16)
    const interestRate = 0.002 // (positionEvent.interestRate) TODO: where do I get the interestRate?
    const time = new Date().getTime() / 1000 - createdAt
    const timeFees = (principal * interestRate * time) / 864000000
    const positionFees = parseInt(positionEvent.fees, 16)
    const fees = timeFees + positionFees
    const allowance = parseInt(positionEvent.allowance, 16)
    const collateral = parseInt(positionEvent.collateral, 16)

    if (positionEvent.heldToken === positionEvent.collateralToken) {
      profitsAndLosses =
        allowance -
        marginTrading.quote(
          positionEvent.owedToken,
          positionEvent.heldToken,
          positionEvent.principal + fees,
        ) -
        collateral
    } else {
      profitsAndLosses =
        marginTrading.quote(
          positionEvent.heldToken,
          positionEvent.owedToken,
          positionEvent.allowance,
        ) -
        principal -
        collateral -
        fees
    }

    return {
      currencyValue: profitsAndLosses,
      percentageValue: (profitsAndLosses / collateral) * 100,
    }
  }

  parsePositionWasOpenedEvent(
    event: IPositionWasOpenedEvent,
  ): IParsedPositionWasOpenedEvent {
    const { args, ...eventExceptArgs } = event
    return {
      ...eventExceptArgs,
      positionId: args[0] as string,
      ownerId: args[1] as string,
      owedToken: args[2] as string,
      heldToken: args[3] as string,
      collateralToken: args[4] as string,
      collateral: args[5] as BigNumber,
      principal: args[6] as BigNumber,
      allowance: args[7] as BigNumber,
      fees: args[8] as BigNumber,
      createdAt: args[9] as BigNumber,
    }
  }

  async computeMinObtained(
    spentToken: string,
    obtainedToken: string,
    margin: number,
    leverage: number,
    priority: Priority,
    positionType: PositionType,
    slippage: number,
  ): Promise<BigNumber> {
    const marginTrading = ContractFactory.getMarginTradingStrategyContract(
      await this.ensureSigner(),
    )

    const Margin = this.parseUnits(margin.toString(), spentToken)
    const Leverage = BigNumber.from(leverage)
    const Slippage = BigNumber.from(slippage)

    if (positionType === 'long') {
      const quoted = await marginTrading.quote(
        spentToken,
        obtainedToken,
        Margin!.mul(Leverage).toHexString(),
      )

      if (priority === 'buy') {
        return quoted[0]
      } else {
        // priority is 'sell'
        return quoted[0].mul(BigNumber.from(1).sub(Slippage.div(100)))
      }
    } else {
      // positionType is 'short'

      if (priority === 'buy') {
        return Margin!.mul(Leverage)
      } else {
        // priority is 'sell'
        return Margin!
          .mul(Leverage)
          .mul(BigNumber.from(1).sub(Slippage.div(100)))
      }
    }
  }

  async computeMaxSpent(
    spentToken: string,
    obtainedToken: string,
    margin: number,
    leverage: number,
    priority: Priority,
    positionType: PositionType,
    slippage: number,
  ): Promise<BigNumber> {
    const MarginTrading = ContractFactory.getMarginTradingStrategyContract(
      await this.ensureSigner(),
    )

    const Margin = this.parseUnits(margin.toString(), spentToken)
    const Leverage = BigNumber.from(leverage)
    const Slippage = BigNumber.from(slippage)

    if (positionType === 'long') {
      if (priority === 'buy') {
        return Margin!
          .mul(Leverage)
          .div(BigNumber.from(1).sub(Slippage.div(100)))
      } else {
        // priority is 'sell'
        return Margin!.mul(Leverage)
      }
    } else {
      // positionType is 'short'

      const quoted = await MarginTrading.quote(
        obtainedToken,
        spentToken,
        Margin!.mul(Leverage).toHexString(),
      )

      if (priority === 'buy') {
        return quoted[0].div(BigNumber.from(1).sub(Slippage.div(100)))
      } else {
        // priority is 'sell'
        return quoted[0]
      }
    }
  }

  // TODO: Update dashboard table after transaction gets verified
  async marginTradingOpenPosition(positionData: OpenPosition): Promise<any> {
    const {
      spentToken,
      obtainedToken,
      leverage,
      slippage,
      deadline,
      margin,
      positionType,
      priority,
    } = positionData

    const marginTrading = ContractFactory.getMarginTradingStrategyContract(
      await this.ensureSigner(),
    )

    const marginValue = this.parseUnits(margin.toString(), spentToken)

    const positionInfo = {
      spentToken,
      obtainedToken,
      deadline: BigNumber.from(
        Math.floor(Date.now() / 1000) + 60 * deadline,
      ).toHexString(), // deadline should be integer representing minutes
      collateral: marginValue!.toHexString(),
      collateralIsSpentToken: positionType === 'long' ? true : false,
      minObtained: (
        await this.computeMinObtained(
          spentToken,
          obtainedToken,
          margin,
          leverage,
          priority,
          positionType,
          slippage,
        )
      ).toHexString(),
      maxSpent: (
        await this.computeMaxSpent(
          spentToken,
          obtainedToken,
          margin,
          leverage,
          priority,
          positionType,
          slippage,
        )
      ).toHexString(),
    }
    try {
      const position = await marginTrading.openPosition(positionInfo, {
        // gasLimit: (await etherGlobal.getBlockGasLimit()).toNumber() - 1, // GAS LIMIT // TODO: testing max gas limit
        gasLimit: 10000000,
      })
      console.log(positionInfo)
      console.log(position)
      return position
    } catch (error) {
      console.log(error)
    }
  }
}
