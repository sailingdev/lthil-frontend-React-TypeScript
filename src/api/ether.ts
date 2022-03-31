import { BigNumber, Transaction, ethers } from 'ethers'
import {
  IOpenPosition,
  IParsedPositionWasOpenedEvent,
  IPositionWasOpenedEvent,
  PositionType,
  Priority,
  ProfitsAndLosses,
  TransactionReceipt,
} from '../types'

import { ContractFactory } from './contract-factory'
import { MarginTrading } from './margin-trading'
import { TokenDetails } from '../types'
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
  public marginTrading!: MarginTrading

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.signer = this.provider.getSigner()
    this.marginTrading = new MarginTrading(this.provider, this.signer)
  }
  getSigner(): ethers.providers.JsonRpcSigner {
    return this.signer
  }

  static parseUnits(
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

  static formatUnits(amount: string, tokenAddress: string): string | undefined {
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

  getTokenData(tokenAddress: string): TokenDetails | undefined {
    try {
      const token = tokens.find((tkn) => tkn.address === tokenAddress)
      if (!token) {
        throw new Error('token not found!')
      }
      return {
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        address: token.address,
      }
    } catch (error) {
      console.log(error)
    }
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
    const vault = ContractFactory.getVaultContract(this.signer)

    // @ts-ignore
    const amount = (await vault.claimable(tokenAddress)).toHexString()

    return hexToDecimal(amount)
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

  async getTokenTvl(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(this.signer)
    //@ts-ignore
    const tvl = (await vault.balance(tokenAddress)).toHexString()

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
      const gasLimit = await this.getApprovalGasEstimation(
        tokenAddress,
        destinationAddress,
        amount,
      )

      return tokenContract.approve(
        destinationAddress,
        Ether.parseUnits(amount.toString(), tokenAddress),
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
    const gas = await tokenContract.estimateGas.approve(
      destinationAddress,
      Ether.parseUnits(amount.toString(), tokenAddress),
    )
    return gas.mul(120).div(100)
  }
  async getTransactionGasEstimate(account: string, to: string, value: number) {
    // THIS IS CURRENTLY NOT WORKING.
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-estimateGas
    //
    const gas = await this.signer.estimateGas({
      from: account,
      to,
      value,
    })
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

      //@ts-ignore
      const stake = await vault.stake(
        tokenAddress,
        Ether.parseUnits(amount, tokenAddress),
      )
      return stake
    } catch (error) {
      console.log(error)
    }
  }

  async withdrawToken(tokenAddress: string, amount: string): Promise<any> {
    try {
      const vault = ContractFactory.getVaultContract(this.signer)

      //@ts-ignore
      const withdraw = await vault.unstake(
        tokenAddress,
        Ether.parseUnits(amount, tokenAddress),
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

  async computeProfitsAndLosses(
    positionEvent: IParsedPositionWasOpenedEvent,
  ): Promise<[number, number] | undefined> {
    try {
      const {
        amountIn,
        interestRate,
        toBorrow,
        collateralReceived,
        collateralToken,
        spentToken,
        obtainedToken,
        createdAt,
        positionId,
      } = positionEvent

      const marginTrading = ContractFactory.getMarginTradingStrategyContract(
        this.signer,
      )

      let profitsAndLosses: BigNumber | undefined = undefined
      console.log(positionEvent)

      const positionFees = (await marginTrading.positions(positionId)).fees

      const currentTime = BigNumber.from(
        BigNumber.from(new Date().getTime()).div(BigNumber.from(1000)),
      )
      const time = currentTime.sub(createdAt)
      const timeFees = toBorrow
        .mul(interestRate)
        .mul(time)
        .div(BigNumber.from(864000000))

      const fees = timeFees.add(positionFees)

      if (this.getPositionType(positionEvent) === 'long') {
        profitsAndLosses = amountIn
          .sub(
            (
              await marginTrading.quote(
                spentToken,
                obtainedToken,
                toBorrow.add(fees),
              )
            )[0],
          )
          .sub(collateralReceived)
      } else {
        profitsAndLosses = (
          await marginTrading.quote(spentToken, obtainedToken, amountIn)
        )[0]
          .sub(toBorrow)
          .sub(collateralReceived)
          .sub(fees)
      }

      // TODO: percentage is maybe wrong, double check it
      return [
        Number(
          Ether.formatUnits(profitsAndLosses!.toString(), collateralToken),
        ),
        Number(
          profitsAndLosses!.div(collateralReceived).mul(BigNumber.from(100)),
        ),
      ]
    } catch (error) {
      console.log(error)
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
      spentToken: args[2] as string,
      obtainedToken: args[3] as string,
      collateralToken: args[4] as string,
      collateralReceived: args[5] as BigNumber,
      toBorrow: args[6] as BigNumber,
      amountIn: args[7] as BigNumber,
      interestRate: args[8] as BigNumber,
      createdAt: args[9] as BigNumber,
    }
  }

  // TODO: Update dashboard table after transaction gets verified

  async MarginTradingClosePosition(positionId: string): Promise<any> {
    const marginTrading = ContractFactory.getMarginTradingStrategyContract(
      this.signer,
    )
    try {
      const closePosition = await marginTrading.closePosition(positionId, {
        gasLimit: 10000000,
      })
      return closePosition
    } catch (error) {
      console.log(error)
    }
  }

  async getMarginTradingPositionById(
    positionId: string,
  ): Promise<IParsedPositionWasOpenedEvent> {
    const marginTradingStrategy =
      ContractFactory.getMarginTradingStrategyContract(this.signer)

    const events = await marginTradingStrategy.queryFilter(
      marginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )

    const position = events.filter(
      (position) =>
        // @ts-ignore
        position!.args![0].toHexString() == positionId.toHexString(),
    )

    return this.parsePositionWasOpenedEvent(
      position[0] as unknown as IPositionWasOpenedEvent,
    )
  }

  getPositionOpenPrice(
    position: IParsedPositionWasOpenedEvent,
  ): BigNumber | undefined {
    try {
      const { collateralReceived, amountIn, toBorrow } = position
      if (this.getPositionType(position) === 'long') {
        const initalPositionValue = toBorrow.add(collateralReceived)
        console.log(
          'Open price: ',
          initalPositionValue.div(amountIn).toString(),
        )
        return initalPositionValue.div(amountIn)
      } else {
        console.log('Current price: ', amountIn.div(toBorrow).toString())
        return amountIn.div(toBorrow)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getPositionCurrentPrice(
    position: IParsedPositionWasOpenedEvent,
  ): Promise<BigNumber | undefined> {
    try {
      const { spentToken, obtainedToken, amountIn, toBorrow, collateralToken } =
        position

      const marginTradingStrategy =
        ContractFactory.getMarginTradingStrategyContract(this.signer)

      if (collateralToken === spentToken) {
        console.log(
          'Current price: ',
          (
            await marginTradingStrategy.quote(
              obtainedToken,
              spentToken,
              amountIn,
            )
          )[0]
            .div(amountIn)
            .toString(),
        )
        return (
          await marginTradingStrategy.quote(obtainedToken, spentToken, amountIn)
        )[0].div(amountIn)
      } else {
        console.log(
          'Current price: ',
          (
            await marginTradingStrategy.quote(
              spentToken,
              obtainedToken,
              toBorrow,
            )
          )[0]
            .div(toBorrow)
            .toString(),
        )
        return (
          await marginTradingStrategy.quote(spentToken, obtainedToken, toBorrow)
        )[0].div(toBorrow)
      }
    } catch (error) {
      console.log(error)
    }
  }

  getPositionLeverage(
    position: IParsedPositionWasOpenedEvent,
  ): BigNumber | undefined {
    try {
      const { collateralReceived, toBorrow } = position
      console.log('Collateral: ', collateralReceived.toString())
      console.log('To borrow: ', toBorrow.toString())

      console.log(
        'Leverage: ',
        BigNumber.from(1).add(toBorrow.div(collateralReceived)).toNumber(),
        'x',
      )
      return BigNumber.from(1).add(toBorrow.div(collateralReceived))
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: Using numbers there instead of BigNumber
  getPositionLiquidationPrice(
    position: IParsedPositionWasOpenedEvent,
    openPrice: BigNumber,
    leverage: BigNumber,
  ): number | undefined {
    try {
      const openPriceNum = openPrice.toNumber()
      const leverageNum = leverage.toNumber()

      const { collateralToken, spentToken } = position

      if (collateralToken === spentToken) {
        console.log(
          'Liquidation price: ',
          openPriceNum * (1 - 1 / (0.5 * leverageNum)),
        )
        return openPriceNum * (1 - 1 / (0.5 * leverageNum))
      } else {
        console.log(
          'Liquidation price: ',
          openPriceNum * (1 + 1 / (0.5 * leverageNum)),
        )
        return openPriceNum * (1 + 1 / (0.5 * leverageNum))
      }
    } catch (error) {
      console.log(error)
    }
  }

  computeDistanceFromLiquidation(
    position: IParsedPositionWasOpenedEvent,
    liquidationPrice: number,
    currentPrice: number,
  ): number {
    if (this.getPositionType(position) === 'long') {
      console.log(
        'Distance from liquidation: ',
        1 - liquidationPrice / currentPrice,
      )
      return 1 - liquidationPrice / currentPrice
    } else {
      console.log(
        'Distance from liquidation: ',
        liquidationPrice / currentPrice - 1,
      )
      return liquidationPrice / currentPrice - 1
    }
  }

  getPositionType(position: IParsedPositionWasOpenedEvent): 'long' | 'short' {
    const { collateralToken, spentToken } = position

    if (collateralToken === spentToken) {
      console.log('Position type: ', 'long')
      return 'long'
    } else {
      console.log('Position type: ', 'short')
      return 'short'
    }
  }

  getPositionShortDescription(position: IParsedPositionWasOpenedEvent): string {
    const { spentToken, obtainedToken } = position

    const leverage = this.getPositionLeverage(position)
    const positionType = this.getPositionType(position)
    const spentTokenSymbol = this.getTokenData(spentToken)?.symbol
    const obtainedTokenSymbol = this.getTokenData(obtainedToken)?.symbol
    if (positionType === 'long') {
      return `${obtainedTokenSymbol}/${spentTokenSymbol} ${leverage}x ${positionType}`
    } else {
      return `${spentTokenSymbol}/${obtainedTokenSymbol} ${leverage}x ${positionType}`
    }
  }
}
