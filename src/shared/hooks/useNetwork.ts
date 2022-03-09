/** @jsxImportSource @emotion/react */

import { supportedNetworks } from '../test/connectors'
import { useWeb3React } from '@web3-react/core'

export const useNetwork = () => {
  const { chainId } = useWeb3React()

  return supportedNetworks.find((n) => n.chainId === chainId)
}
