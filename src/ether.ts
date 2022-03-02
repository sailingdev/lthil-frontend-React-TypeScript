import { ContractFactory, ethers } from 'ethers'

import { BaseStrategyInterface } from './config/typings'

import ABI from './assets/abi.json'
import addresses from './assets/addresses.json'

export const abi = ABI

class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner
  private address = addresses.addresses.Vault

  async initializeProvider(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.signer = await this.provider.getSigner(this.address)
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

  async getContract(): Promise<BaseStrategyInterface> {
    // @ts-ignore
    return ContractFactory.getContract(this.address, abi.abi, await this.signer)
  }
}

export const ether = new Ether()
