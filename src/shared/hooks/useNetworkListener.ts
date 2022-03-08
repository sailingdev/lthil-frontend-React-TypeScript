/** @jsxImportSource @emotion/react */

import { injected } from '../test/connectors'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

export const useNetworkListener = () => {
  const { activate } = useWeb3React()

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window
    if (!ethereum || !ethereum.on) {
      return
    }
    //     const handleAccountsChanged = (accounts: any) => {
    //       console.log('accountsChanged', accounts)
    //       if (accounts.length > 0) {
    //         activate(injected)
    //       }
    //     }
    const onChainChange = (chainId: number) => {
      activate(injected)
    }
    ethereum.on('chainChanged', onChainChange)
    // ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', onChainChange)
        // ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])
}
