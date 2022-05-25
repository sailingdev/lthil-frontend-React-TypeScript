import { BigNumber, FixedNumber, Transaction, ethers } from 'ethers'

import { ContractFactory } from './contract-factory'
import { MarginTrading } from './margin-trading'
import { TokenDetails } from '../types'
import { TransactionReceipt } from '../types'
import { Utils } from './utils'
import { hexToDecimal } from '../utils'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'
import { addresses } from '@ithil-protocol/deployed/latest/addresses.json'

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
  public static utils = Utils

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.signer = this.provider.getSigner()
    this.marginTrading = new MarginTrading(this.signer)
  }
  getSigner(): ethers.providers.JsonRpcSigner {
    return this.signer
  }

  getTokenData(tokenAddress: string): TokenDetails | undefined {
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
    //Used to return in Hex
    const account = await this.getAccountAddress()
    const balance = await this.provider.getBalance(account!)
    return balance
  }
  async getAccountAddress(): Promise<string | null> {
    const accounts = await this.provider.listAccounts()
    return accounts.length > 0 ? accounts[0] : null
  }

  getAddresses() {
    return addresses
  }

  async getBlockGasLimit() {
    return await (
      await this.provider.getBlock('latest')
    ).gasLimit
  }

  async getMaxWithdrawAmount(tokenAddress: string): Promise<FixedNumber> {
    const vault = ContractFactory.getVaultContract(this.signer)

    // @ts-ignore
    const amount = await vault.claimable(tokenAddress)

    return FixedNumber.from(Ether.utils.formatUnits(amount))
  }

  async getMaxDepositAmount(tokenAddress: string): Promise<Number> {
    const tokenContract = ContractFactory.getTokenContract(
      tokenAddress,
      this.signer,
    )
    const balance = await tokenContract.balanceOf(this.getAccountAddress())

    return parseFloat(ethers.utils.formatUnits(BigNumber.from(balance)))
  }

  async getTokenTvl(tokenAddress: string): Promise<FixedNumber> {
    const vault = ContractFactory.getVaultContract(this.signer)
    //@ts-ignore
    const tvl = await vault.balance(tokenAddress)
    return FixedNumber.from(Ether.utils.formatUnits(tvl))
  }

  async computeAnnualPercentageYield(tokenAddress: string): Promise<number> {
    const vault = ContractFactory.getVaultContract(this.signer)
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)

    // @ts-ignore
    const tokenSubvault = await vault.vaults(tokenAddress)
    const createdAt = parseInt(tokenSubvault.creationTime, 16)
    const daysFromStart = Math.floor(
      (new Date().getTime() / 1000 - createdAt) / 86400,
    )
    // @ts-ignore
    const balance = await vault.balance(tokenAddress)
    const tokenTotalSupply = await token.totalSupply()

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
    return allowance
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
        Ether.utils.parseTokenUnits(amount.toString(), tokenAddress),
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
      Ether.utils.parseTokenUnits(amount.toString(), tokenAddress),
    )
    return gas.mul(120).div(100)
  }
  async getTransactionGasEstimate(account: string, to: string, value: number) {
    // THIS IS CURRENTLY NOT WORKING.
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-estimateGas
    //
    const tes = await this.provider.getTransaction(
      '0x67c64199f93d4d05a1dab145259207d9ba9cd9334fa20d967f42bdeea011e9e0',
    )

    const idk = await this.signer.getGasPrice()
    const t = '0x419fed4d'.toString()
    console.log(t)

    const gas = await this.provider.estimateGas({
      to: tes.to,

      // `function deposit() payable`
      data: tes.data,

      // 1 ether
      value: tes.value,
    })

    return t
  }

  async getUserTokenBalance(tokenAddress: string): Promise<FixedNumber> {
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)
    const balance = await token.balanceOf(this.getAccountAddress())
    return FixedNumber.from(Ether.utils.formatTokenUnits(balance, tokenAddress))
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
        Ether.utils.parseTokenUnits(amount, tokenAddress),
      )
      return stake
    } catch (error) {
      console.error(error)
    }
  }

  async withdrawToken(tokenAddress: string, amount: string): Promise<any> {
    try {
      const vault = ContractFactory.getVaultContract(this.signer)

      //@ts-ignore
      const withdraw = await vault.unstake(
        tokenAddress,
        Ether.utils.parseTokenUnits(amount, tokenAddress),
        {
          gasLimit: 10000000,
        },
      )
      return withdraw
    } catch (error) {
      console.error(error)
    }
  }
}
