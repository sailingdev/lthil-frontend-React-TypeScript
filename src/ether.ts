import { ethers } from 'ethers'

class Ether {
  private provider!: ethers.providers.Web3Provider
  initializeProvider(baseProvider: any): void {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
  }
}

export const ether = new Ether()
