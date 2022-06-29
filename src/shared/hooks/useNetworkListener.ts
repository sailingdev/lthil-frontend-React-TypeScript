import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { useInitAccountAddress, useInitAccountBalance } from '../../state/hooks'
import { injected } from '../test/connectors'

export const useNetworkListener = () => {
  const { activate } = useWeb3React()
  const initAccountBalance = useInitAccountBalance()
  const initAccountAddress = useInitAccountAddress()

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window
    if (!ethereum || !ethereum.on) {
      return
    }
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        activate(injected)
        initAccountBalance()
        initAccountAddress()
      }
    }
    const onChainChange = () => {
      activate(injected)
    }
    ethereum.on('chainChanged', onChainChange)
    ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', onChainChange)
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])
}
