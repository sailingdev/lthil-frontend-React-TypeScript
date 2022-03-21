import { InjectedConnector } from '@web3-react/injected-connector'
import { ReactComponent as MetaMaskIcon } from '../../assets/images/metamask.svg'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ReactComponent as WalletConnectIcon } from '../../assets/images/walletconnect.svg'

// TODO VALENTIN LIST ALL NETWORKS HERE: KOVAN, GOERLI, ROPSTEN, ETC.
// WE NEED THEM LISTED HERE IN ORDER FOR THE NETWORK OVERLAY MODAL TO WORK
export const allNetworks = [
  {
    name: 'Rinkeby',
    chainId: 4,
  },
  {
    name: 'Ethereum Main Network',
    chainId: 1,
  },
  {
    name: 'Kovan',
    chainId: 42,
  },
  {
    name: 'Goerli',
    chainId: 5,
  },
  {
    name: 'Ropsten',
    chainId: 3,
  },
]
export const allChainIds = allNetworks.map((n) => n.chainId)
export const allowedChainIds = [4]
export const injected = new InjectedConnector({
  supportedChainIds: allChainIds,
})

export const connectors = [
  {
    name: 'WalletConnect',
    icon: WalletConnectIcon,
    connector: new WalletConnectConnector({
      infuraId: '4a06377afcb842f394dc13f47f6cac54',
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      supportedChainIds: allChainIds,
    }),
  },
  {
    name: 'MetaMask',
    icon: MetaMaskIcon,
    connector: injected,
  },
]
