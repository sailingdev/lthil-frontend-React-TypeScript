import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { ReactComponent as MetaMaskIcon } from '../../assets/images/metamask.svg'
import { ReactComponent as WalletConnectIcon } from '../../assets/images/walletconnect.svg'

export const supportedNetworks = [
  {
    name: 'Rinkeby',
    chainId: 4,
  },
  {
    name: 'Ethereum Main Network',
    chainId: 1,
  },
]
export const supportedChainIds = supportedNetworks.map((n) => n.chainId)
export const injected = new InjectedConnector({
  supportedChainIds,
})

export const connectors = [
  {
    name: 'WalletConnect',
    icon: WalletConnectIcon,
    connector: new WalletConnectConnector({
      infuraId: '4a06377afcb842f394dc13f47f6cac54',
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      supportedChainIds,
      chainId: supportedChainIds[0],
    }),
  },
  {
    name: 'MetaMask',
    icon: MetaMaskIcon,
    connector: injected,
  },
]
