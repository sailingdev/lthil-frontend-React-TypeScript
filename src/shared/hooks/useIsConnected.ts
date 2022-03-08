/** @jsxImportSource @emotion/react */

import { useWeb3React } from '@web3-react/core'

export const useIsConnected = () => {
  const { chainId, active, library } = useWeb3React()

  console.log(chainId, active)
  console.log('------------------------')
  return !!(library && chainId && active)
}
