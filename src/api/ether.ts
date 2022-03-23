import { BigNumber, Transaction, ethers } from 'ethers'
import {
  OpenPosition,
  PositionType,
  PositionWasOpenedEvent,
  Priority,
  ProfitsAndLosses,
  TransactionReceipt,
} from '../types'

import { ContractFactory } from './contract-factory'
import { hexToDecimal } from '../utils'
import addresses from '../assets/addresses.json'

// THIS GLOBAL INSTANCE IS USED TO SIMPLIFY ARHITECTURE
export let etherGlobal: Ether

export const initializeGlobalInstance = (instance: Ether) => {
  etherGlobal = instance
}

const MaxUint256: BigNumber = BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
)

export class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.initializeSigner()
  }

  // TODO: rename this function maybe?
  parseUnits(amount: string, decimal: number): ethers.BigNumber {
    return ethers.utils.parseUnits(amount, decimal)
  }

  async initializeSigner() {
    this.signer = await this.provider.getSigner()
  }

  getProvider() {
    return this.provider
  }
  getBlockNumber() {
    return this.provider.getBlockNumber()
  }
  getSigner() {
    return this.signer
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

  // TODO: COMMENTED THIS OUT SO WE CAN TEST STAKING ON THE NEWEST DEPLOYMENT
  async getMaxWithdrawAmount(tokenAddress: string): Promise<number> {
    // const vault = ContractFactory.getVaultContract(this.signer)
    // // @ts-ignore
    // const amount = (await vault.claimable(tokenAddress)).toHexString()

    // return hexToDecimal(amount)
    return 2
  }

  async getMaxDepositAmount(tokenAddress: string): Promise<number> {
    const tokenContract = ContractFactory.getTokenContract(
      tokenAddress,
      this.signer,
    )
    const balance = (
      await tokenContract.balanceOf(this.getAccountAddress())
    ).toHexString()

    return hexToDecimal(balance)
  }

  async getTokenTvl(tokenAddres: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(this.signer)
    //@ts-ignore
    const tvl = (await vault.balance(tokenAddres)).toHexString()

    return hexToDecimal(tvl)
  }

  async computeAnnualPercentageYield(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(this.signer)
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)

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
      this.signer,
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
        this.signer,
      )
      const decimals = await tokenContract.decimals()
      const gasLimit = await this.getApprovalGasEstimation(
        tokenAddress,
        destinationAddress,
        amount,
      )

      console.log('Gas limit, ', gasLimit)

      return tokenContract.approve(
        destinationAddress,
        this.parseUnits(amount.toString(), decimals),
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
      this.signer,
    )
    const decimals = await tokenContract.decimals()
    const gas = await tokenContract.estimateGas.approve(
      destinationAddress,
      this.parseUnits(amount.toString(), decimals),
    )
    return gas.mul(120).div(100)
  }
  async getTransactionGasEstimate(account: string, to: string, value: number) {
    // THIS IS CURRENTLY NOT WORKING.
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-estimateGas
    //
    const gas = await this.signer.estimateGas({ from: account, to, value })
    console.log(gas)
    return gas
  }

  async getUserTokenBalance(tokenAddress: string): Promise<number> {
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)
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
      const vault = ContractFactory.getVaultContract(this.signer)
      const token = ContractFactory.getTokenContract(tokenAddress, this.signer)

      // Check balance -> TODO: where to do the balance checking? On the input? Do we need to do this even?

      //@ts-ignore
      const stake = await vault.stake(
        tokenAddress,
        this.parseUnits(amount, await token.decimals()),
        {
          gasLimit: 1000000, // GAS LIMIT
        },
      )
      return stake
    } catch (error) {
      console.log(error)
    }
  }

  async withdrawToken(tokenAddress: string, amount: string): Promise<any> {
    try {
      const vault = ContractFactory.getVaultContract(this.signer)
      const token = ContractFactory.getTokenContract(tokenAddress, this.signer)

      //@ts-ignore
      const withdraw = await vault.unstake(
        tokenAddress,
        this.parseUnits(amount, await token.decimals()),
        {
          gasLimit: 1000000, // GAS LIMIT
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
      this.signer,
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

  async computeMinObtained(
    spentToken: string,
    obtainedToken: string,
    margin: number,
    leverage: number,
    priority: Priority,
    positionType: PositionType,
    slippage: number,
  ): Promise<BigNumber> {
    const MarginTrading = ContractFactory.getMarginTradingStrategyContract(
      this.signer,
    )

    const Margin = BigNumber.from(margin)
    const Leverage = BigNumber.from(leverage)
    const Slippage = BigNumber.from(slippage)

    if (positionType === 'long') {
      const quoted = await MarginTrading.quote(
        spentToken,
        obtainedToken,
        Margin.mul(Leverage).toHexString(),
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
        return Margin.mul(Leverage)
      } else {
        // priority is 'sell'
        return Margin.mul(Leverage).mul(
          BigNumber.from(1).sub(Slippage.div(100)),
        )
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
      this.signer,
    )

    const Margin = BigNumber.from(margin)
    const Leverage = BigNumber.from(leverage)
    const Slippage = BigNumber.from(slippage)

    if (positionType === 'long') {
      if (priority === 'buy') {
        return Margin.mul(Leverage).div(
          BigNumber.from(1).sub(Slippage.div(100)),
        )
      } else {
        // priority is 'sell'
        return Margin.mul(Leverage)
      }
    } else {
      // positionType is 'short'

      const quoted = await MarginTrading.quote(
        obtainedToken,
        spentToken,
        margin * leverage,
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
      this.signer,
    )

    const positionInfo = {
      spentToken,
      obtainedToken,
      deadline: BigNumber.from(
        Math.floor(Date.now() / 1000) + 60 * deadline,
      ).toHexString(), // deadline should be integer representing minutes
      collateral: BigNumber.from(margin).toHexString(),
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
