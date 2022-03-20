/** @jsxImportSource @emotion/react */

import { allNetworks } from '../test/connectors'
import { useWeb3React } from '@web3-react/core'

export const useNetwork = () => {
  const { chainId } = useWeb3React()

  return allNetworks.find((n) => n.chainId === chainId)
}
