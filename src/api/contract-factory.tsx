import { Contract, ethers } from 'ethers'

import ERC20Abi from '../assets/abi/ERC20.json'
import MarginTradingStrategyAbi from '../assets/abi/MarginTradingStrategy.json'
import MockKyberNetworkProxyAbi from '../assets/abi/MockKyberNetworkProxy.json'
import MockTaxedTokenAbi from '../assets/abi/MockTaxedToken.json'
import MockWETHAbi from '../assets/abi/MockWETH.json'
import VaultAbi from '../assets/abi/Vault.json'
import { VaultInterface } from '../config/typings'
import { addresses } from '../assets/addresses.json'

export class ContractFactory {
  public static getTokenContract(
    tokenAddress: string,
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(tokenAddress, ERC20Abi.abi, signer)
  }
  public static getMockKyberNetworkProxyContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(
      addresses.MockKyberNetworkProxy,
      MockKyberNetworkProxyAbi.abi,
      signer,
    )
  }
  public static getVaultContract(
    signer: ethers.providers.JsonRpcSigner,
  ): Promise<VaultInterface> {
    //   @ts-ignore
    return new Contract(addresses.Vault, VaultAbi.abi, signer)
  }
  public static getMockTaxedTokenContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(addresses.MockTaxedToken, MockTaxedTokenAbi.abi, signer)
  }
  public static getMockWETHTokenContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(addresses.MockWETH, MockWETHAbi.abi, signer)
  }
  public static getMarginTradingStrategyContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(
      addresses.MarginTradingStrategy,
      MarginTradingStrategyAbi.abi,
      signer,
    )
  }
}
