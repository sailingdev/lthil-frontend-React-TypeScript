import { BigNumber, Contract, ethers } from 'ethers'
import { PositionWasOpenedEvent, ProfitsAndLosses, TokenDetails } from './types'

import ERC20Abi from './assets/abi/ERC20.json'
import MarginTradingStrategyAbi from './assets/abi/MarginTradingStrategy.json'
import MockKyberNetworkProxyAbi from './assets/abi/MockKyberNetworkProxy.json'
import MockTaxedTokenAbi from './assets/abi/MockTaxedToken.json'
import MockWETHAbi from './assets/abi/MockWETH.json'
import VaultAbi from './assets/abi/Vault.json'
import { VaultInterface } from './config/typings'
import addresses from './assets/addresses.json'

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

  // TODO: rename this function
  parseHexValueToEtherBase10(hexAmount: string): number {
    return parseFloat(
      ethers.utils.formatUnits(BigNumber.from(hexAmount).toString()),
    )
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

  // ========= STAKE PAGE =========

  async getMaxWithdrawAmount(tokenAddress: string): Promise<number> {
    const vault = this.getVaultContract()
    // @ts-ignore
    const amount = (await vault.claimable(tokenAddress)).toHexString()

    return this.parseHexValueToEtherBase10(amount)
  }

  async getMaxDepositAmount(tokenAddres: string): Promise<number> {
    const tokenContract = new Contract(tokenAddres, ERC20Abi.abi, this.signer)
    const balance = (
      await tokenContract.balanceOf(this.getAccountAddress())
    ).toHexString()

    return this.parseHexValueToEtherBase10(balance)
  }

  async getTokenTvl(tokenAddres: string): Promise<number> {
    const vault = this.getVaultContract()
    //@ts-ignore
    const tvl = (await vault.balance(tokenAddres)).toHexString()

    return this.parseHexValueToEtherBase10(tvl)
  }

  async computeAnnualPercentageYield(tokenAddress: string): Promise<number> {
    const vault = this.getVaultContract()
    const token = new Contract(tokenAddress, ERC20Abi.abi, this.signer)

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

  // TODO: function returns Promise <any>
  async approveSpending(
    tokenAddress: string,
    destinationAddress: string,
    amount: string,
  ): Promise<any> {
    const token = new Contract(tokenAddress, ERC20Abi.abi, this.signer)
    const approvedSpending = await token.approve(
      destinationAddress,
      this.parseUnits(amount, await token.decimals()),
    )
    return approvedSpending
  }

  async getUserTokenBalance(tokenAddress: string): Promise<number> {
    const token = new Contract(tokenAddress, ERC20Abi.abi, this.signer)
    const balance = await token.balanceOf(this.getAccountAddress())
    return this.parseHexValueToEtherBase10(balance.toHexString())
  }

  async depositToken(tokenAddress: string, amount: string): Promise<any> {
    const vault = this.getVaultContract()
    const token = new Contract(tokenAddress, ERC20Abi.abi, this.signer)

    // Check balance -> TODO: where to do the balance checking? On the input?

    // Allow token spending
    await this.approveSpending(tokenAddress, this.vaultAddress, amount)

    // Do the staking
    //@ts-ignore
    const stake = await vault.stake(
      tokenAddress,
      this.parseUnits(amount, await token.decimals()),
      {
        gasLimit: 1000000,
      },
    )
    return stake
  }

  // ========= DASHBOARD PAGE =========

  // TODO: This function is layed out but the data is wrong since we don't yet know precisely what data PositionWasOpened event returns.
  async computeProfitsAndLosses(
    positionEvent: PositionWasOpenedEvent,
  ): Promise<ProfitsAndLosses> {
    const marginTrading = this.getMarginTradingStrategyContract()

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
