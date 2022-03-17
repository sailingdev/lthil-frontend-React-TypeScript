import { BigNumber, Contract, ethers } from 'ethers'

import ERC20Abi from './assets/abi/ERC20.json'
import MarginTradingStrategyAbi from './assets/abi/MarginTradingStrategy.json'
import MockTaxedTokenAbi from './assets/abi/MockTaxedToken.json'
import MockWETHAbi from './assets/abi/MockWETH.json'
import { PositionWasOpenedEvent, ProfitsAndLosses, TokenDetails } from './types'
import VaultAbi from './assets/abi/Vault.json'
import MockKyberNetworkProxyAbi from './assets/abi/MockKyberNetworkProxy.json'
import { VaultInterface } from './config/typings'
import addresses from './assets/addresses.json'
import { useWeb3React } from '@web3-react/core'

// THIS GLOBAL INSTANCE IS USED TO SIMPLIFY ARHITECTURE
export let etherGlobal: Ether

export const initializeGlobalInstance = (instance: Ether) => {
  etherGlobal = instance
}
export class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner

  // Addresses
  private vaultAddress = addresses.addresses.Vault
  private mockTaxedTokenAddress = addresses.addresses.MockTaxedToken
  private mockWETHTokenAddress = addresses.addresses.MockWETH
  private marginTradingStrategyAddress =
    addresses.addresses.MarginTradingStrategy
  private mockKyberNetworkProxyAddress =
    addresses.addresses.MockKyberNetworkProxy

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.initializeSigner()
  }

  parseHexValueToEtherBase10(hexAmount: string) {
    return ethers.utils.formatUnits(
      BigNumber.from(parseInt(hexAmount, 16).toString()),
      18,
    )
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

  // ========= STAKE PAGE =========

  async getMaxWithdrawAmount(tokenAddress: string): Promise<string> {
    const vault = this.getVaultContract()
    // @ts-ignore
    const amount = (await vault.claimable(tokenAddress)).toHexString()

    return this.parseHexValueToEtherBase10(amount)
  }

  async getMaxDepositAmount(tokenAddres: string): Promise<string> {
    const tokenContract = new Contract(tokenAddres, ERC20Abi.abi, this.signer)
    const balance = (
      await tokenContract.balanceOf(this.getAccountAddress())
    ).toHexString()

    // TODO: this.parseHexValueToEtherBase10 fails here. Fix it and use that function
    return (parseInt(balance, 16) / 1000000000000000000).toString()
  }

  async getTokenTvl(tokenAddres: string): Promise<string> {
    const vault = this.getVaultContract()
    //@ts-ignore
    const tvl = (await vault.balance(tokenAddres)).toHexString()

    return this.parseHexValueToEtherBase10(tvl)
  }

  async computeAnnualPercentageYield(tokenAddress: string): Promise<number> {
    const vault = this.getVaultContract()
    const token = new Contract(tokenAddress, ERC20Abi.abi, this.signer)

    // TODO: calculate the correct daysFromStart using this: (createdAt comes from the vault)
    // const daysFromStart = Math.floor((Date.now() - createdAt) / 86400)
    const daysFromStart = Date.now()
    // @ts-ignore
    const balance = vault.balance(tokenAddress)
    const tokenTotalSupply = token.totalSupply()

    return Math.pow(balance / tokenTotalSupply, (365 / daysFromStart - 1) * 100)
  }

  // ========= DASHBOARD PAGE =========

  // async computeProfitsAndLosses(
  //   positionEvent: PositionWasOpenedEvent,
  // ): Promise<ProfitsAndLosses> {
  //   const createdAt = parseInt(positionEvent.createdAt.toHexString(), 16)
  //   const principal = positionEvent.principal.toHexString()
  //   const interestRate = 0.002 // (positionEvent.interestRate) where do I get the interestRate?
  //   const time = new Date().getTime() / 1000 - createdAt
  //   const timeFees = (principal * interestRate * time) / 864000000
  //   const positionFees = positionEvent.fees
  //   const fees = timeFees + positionFees

  // }

  // ========= CONTRACTS =========

  getVaultContract(): Promise<VaultInterface> {
    // @ts-ignore
    return new Contract(this.vaultAddress, VaultAbi.abi, this.signer)
  }
  getMockTaxedTokenContract() {
    return new Contract(
      this.mockTaxedTokenAddress,
      MockTaxedTokenAbi.abi,
      this.signer,
    )
  }
  getMockWETHTokenContract() {
    return new Contract(this.mockWETHTokenAddress, MockWETHAbi.abi, this.signer)
  }
  getMarginTradingStrategyContract() {
    return new Contract(
      this.marginTradingStrategyAddress,
      MarginTradingStrategyAbi.abi,
      this.signer,
    )
  }
  getMockKyberNetworkProxyContract() {
    return new Contract(
      this.mockKyberNetworkProxyAddress,
      MockKyberNetworkProxyAbi.abi,
      this.signer,
    )
  }

  // ========= HELPER FUNCTIONS =========

  async getTokenInfo(
    tokenAddres: string,
    signer: any,
    userAddress: string,
  ): Promise<TokenDetails> {
    const tokenContract = new Contract(tokenAddres, ERC20Abi.abi, signer)
    const name = await tokenContract.name()
    const symbol = await tokenContract.symbol()
    const decimals = await tokenContract.decimals()
    const balance = await tokenContract.balanceOf(userAddress)
    // const userAllowance = await tokenContract.allowance(userAddress, destAddress TODO: figure out why we need this?
    return { name, symbol, decimals, balance }
  }
}
