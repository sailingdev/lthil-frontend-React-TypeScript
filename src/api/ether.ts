import { PositionWasOpenedEvent, ProfitsAndLosses } from '../types'

import { ContractFactory } from './contract-factory'
import { addresses } from '../assets/addresses.json'
import { ethers } from 'ethers'
import { hexToDecimal } from '../utils'

// THIS GLOBAL INSTANCE IS USED TO SIMPLIFY ARHITECTURE
export let etherGlobal: Ether

export const initializeGlobalInstance = (instance: Ether) => {
  etherGlobal = instance
}

export class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner
  private vaultAddress = addresses.Vault

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

  // TODO: function returns Promise <any>
  async approveSpending(
    tokenAddress: string,
    destinationAddress: string,
    amount: string,
  ): Promise<any> {
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)
    const approvedSpending = await token.approve(
      destinationAddress,
      this.parseUnits(amount, await token.decimals()),
    )
    return approvedSpending
  }

  async getUserTokenBalance(tokenAddress: string): Promise<number> {
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)
    const balance = await token.balanceOf(this.getAccountAddress())
    return hexToDecimal(balance.toHexString())
  }

  async depositToken(tokenAddress: string, amount: string): Promise<any> {
    const vault = ContractFactory.getVaultContract(this.signer)
    const token = ContractFactory.getTokenContract(tokenAddress, this.signer)

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
}