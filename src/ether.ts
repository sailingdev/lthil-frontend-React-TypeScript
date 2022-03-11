import { Contract, ethers } from 'ethers'

import ERC20Abi from './assets/abi/ERC20.json'
import MarginTradingStrategyAbi from './assets/abi/MarginTradingStrategy.json'
import MockTaxedTokenAbi from './assets/abi/MockTaxedToken.json'
import MockWETHAbi from './assets/abi/MockWETH.json'
import { TokenDetails } from './types'
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

  constructor(baseProvider: any) {
    this.provider = new ethers.providers.Web3Provider(baseProvider)
    this.initializeSigner()
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

// console.log('account: ', await ether.getAccount())

// const Vault = ether.getVaultContract()
// // console.log(Vault)

// const MarginTradingStrategy = ether.getMarginTradingStrategyContract()
// console.log(MarginTradingStrategy)

// // console.log(
// //   //@ts-ignore
// //   await Vault.stake('0x1C51De870718801E745482b25d3bB2Bd3b86e08C', 1, {
// //     gasLimit: 1000000,
// //   }),
// // )

// const openedPositions = await MarginTradingStrategy.queryFilter(
//   MarginTradingStrategy.filters.PositionWasOpened(),
//   '0x1',
//   'latest',
// )
// // const closedPositions = await MarginTradingStrategy.queryFilter(
// //   MarginTradingStrategy.filters.PositionWasClosed(),
// //   'earliest',
// //   'latest',
// // )
// // const liquidatedPositions = await MarginTradingStrategy.queryFilter(
// //   MarginTradingStrategy.filters.PositionWasLiquidated(),
// //   'earliest',
// //   'latest',
// // )

// console.log('Opened positions: ', openedPositions)
// // console.log('Closed positions: ', closedPositions)
// // console.log('Liquidated positions: ', liquidatedPositions)

// // console.log(
// //   'User deposited token to vault: ',
// //   //@ts-ignore
// //   await Vault.queryFilter(Vault.filters.Deposit(), 'earliest', 'latest'),
// // )

// const MockTaxedToken = ether.getMockTaxedTokenContract()

// // console.log('token owner: ', await MockTaxedToken.owner())

// // console.log(
// //   //@ts-ignore
// //   await Vault.claimable('0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b', {
// //     gasLimit: 1000000,
// //   }),
// // )

// console.log(
//   await MockTaxedToken.approve(
//     '0xBEeB7Aa057aec50c30c93c893086B9c0eDc157Dd',
//     ethers.constants.MaxUint256,
//   ),
// )

// // console.log(
// //   await MockTaxedToken.approve(
// //     '0x27001942d886573b4C68d77547143C4b98f3775C',
// //     ethers.constants.MaxUint256,
// //     {
// //       gasLimit: 100000000000,
// //     },
// //   ),
// // )

// console.log(
//   //@ts-ignore
//   await Vault.stake('0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b', 100, {
//     gasLimit: 100000000000,
//   }),
// )
// } catch (e) {
// console.error(e)
// }
