import { Contract, ethers } from 'ethers'

import ABI from './assets/abi.json'
import ERC20 from './assets/ERC20.json'
import { VaultInterface } from './config/typings'
import addresses from './assets/addresses.json'

export const abi = ABI
class Ether {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner
  private address = addresses.addresses.Vault

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

  getContract(): Promise<VaultInterface> {
    // @ts-ignore
    return new Contract(this.address, abi, this.signer)
  }
  getERC20Contract() {
    return new Contract(this.address, ERC20.abi, this.signer)
  }
}

export const ether = new Ether()
