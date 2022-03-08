import { Contract, ethers } from 'ethers'

import VaultAbi from './assets/abi/abi.json'
import MockTaxedTokenAbi from './assets/abi/MockTaxedToken.json'
import MarginTradingStrategyAbi from './assets/abi/MarginTradingStrategy.json'
import { Vault, VaultInterface } from './config/typings'
import addresses from './assets/addresses.json'

/* 
NOTES:
  - each contract takes it's own address and ABI
*/

class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner

  // Addresses
  private vaultAddress = addresses.addresses.Vault
  private mockTaxedTokenAddress = addresses.addresses.MockTaxedToken
  private marginTradingStrategyAddress =
    addresses.addresses.MarginTradingStrategy

  async initializeProvider(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.signer = await this.provider.getSigner()
  }
  getProvider() {
    return this.provider
  }
  getSigner() {
    return this.signer
  }

  getNetwork() {
    return this.provider.getNetwork()
  }
  async getAccount(): Promise<string | null> {
    const accounts = await this.provider.listAccounts()
    return accounts.length > 0 ? accounts[0] : null
  }

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
  getMarginTradingStrategyContract() {
    return new Contract(
      this.marginTradingStrategyAddress,
      MarginTradingStrategyAbi.abi,
      this.signer,
    )
  }
}

export const ether = new Ether()
