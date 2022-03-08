import { Contract, ethers } from 'ethers'

import ABI from './assets/abi.json'
import ERC20 from './assets/ERC20.json'
import { VaultInterface } from './config/typings'
import addresses from './assets/addresses.json'

export const abi = ABI

// THIS GLOBAL INSTANCE IS USED TO SIMPLY ARHITECTURE
export let etherGlobal: Ether

export const initializeGlobalInstance = (instance: Ether) => {
  etherGlobal = instance
}
export class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner
  private address = addresses.addresses.Vault

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
  }
  // this.signer = await this.provider.getSigner()

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
    const account = await this.getAccount()
    return this.provider.getBalance(account!)
  }
  async getAccount(): Promise<string | null> {
    const accounts = await this.provider.listAccounts()
    return accounts.length > 0 ? accounts[0] : null
  }

  getContract(): Promise<VaultInterface> {
    // @ts-ignore
    return new Contract(this.address, abi, this.signer)
  }
  getERC20Contract() {
    return new Contract(this.address, ERC20.abi, this.signer)
  }
}
