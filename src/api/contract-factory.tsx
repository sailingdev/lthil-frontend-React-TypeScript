import ERC20Abi from '@ithil-protocol/deployed/abi/ERC20.json'
import MarginTradingStrategyAbi from '@ithil-protocol/deployed/abi/MarginTradingStrategy.json'
import MockKyberNetworkProxyAbi from '@ithil-protocol/deployed/abi/MockKyberNetworkProxy.json'
import MockTaxedTokenAbi from '@ithil-protocol/deployed/abi/MockTaxedToken.json'
import MockTokenAbi from '@ithil-protocol/deployed/abi/MockToken.json'
import MockWETHAbi from '@ithil-protocol/deployed/abi/MockWETH.json'
import VaultAbi from '@ithil-protocol/deployed/abi/Vault.json'
import YearnStrategyAbi from '@ithil-protocol/deployed/abi/YearnStrategy.json'
import { addresses } from '@ithil-protocol/deployed/latest/addresses.json'
import { Contract, ethers } from 'ethers'
import { VaultInterface } from '../config/typings'

export class ContractFactory {
  public static getTokenContract(
    tokenAddress: string,
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(tokenAddress, ERC20Abi, signer)
  }
  public static getSmartTokenContract(
    tokenAddress: string,
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(tokenAddress, MockTokenAbi, signer)
  }

  public static getMockKyberNetworkProxyContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(
      addresses.MockKyberNetworkProxy,
      MockKyberNetworkProxyAbi,
      signer,
    )
  }
  public static getVaultContract(
    signer: ethers.providers.JsonRpcSigner,
  ): Promise<VaultInterface> {
    //   @ts-ignore
    return new Contract(addresses.Vault, VaultAbi, signer)
  }
  public static getMockTaxedTokenContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(addresses.MockTaxedToken, MockTaxedTokenAbi, signer)
  }
  public static getMockWETHTokenContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(addresses.MockWETH, MockWETHAbi, signer)
  }
  public static getMarginTradingStrategyContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(
      addresses.MarginTradingStrategy,
      MarginTradingStrategyAbi,
      signer,
    )
  }
  public static getYearnStrategyContract(
    signer: ethers.providers.JsonRpcSigner,
  ) {
    return new Contract(addresses.YearnStrategy, YearnStrategyAbi, signer)
  }
}
