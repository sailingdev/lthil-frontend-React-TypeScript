import { ReactComponent as MetaMaskIcon } from '../../assets/images/metamask.svg'
import { ReactComponent as WalletConnectIcon } from '../../assets/images/walletconnect.svg'
import { useWeb3React } from '@web3-react/core'

export const useProviderInfo = () => {
  const { library } = useWeb3React()

  const connUrl = library?.provider?.connection?.url

  if (connUrl == 'metamask') {
    return {
      name: 'Metamask',
      icon: MetaMaskIcon,
    }
  } else if (connUrl == 'eip-1193:') {
    return {
      name: 'WalletConnect',
      icon: WalletConnectIcon,
    }
  }
}
