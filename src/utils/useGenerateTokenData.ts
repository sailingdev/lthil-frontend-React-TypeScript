import { Contract } from 'ethers'
import ERC20Abi from '../assets/abi/ERC20.json'

export const getTokenInfo = async (
  tokenAddres: string,
  signer: any,
  userAddress: string,
) => {
  const tokenContract = new Contract(tokenAddres, ERC20Abi.abi, signer)
  const name = await tokenContract.name()
  const symbol = await tokenContract.symbol()
  const decimals = await tokenContract.decimals()
  const balance = await tokenContract.balanceOf(userAddress)
  // const userAllowance = await tokenContract.allowance(userAddress, destAddress) // TODO: figure out why we need this?

  return { name, symbol, decimals, balance }
}
