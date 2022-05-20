import { InjectedConnector } from '@web3-react/injected-connector'
import { ReactComponent as MetaMaskIcon } from '../../assets/images/metamask.svg'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ReactComponent as WalletConnectIcon } from '../../assets/images/walletconnect.svg'

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
      infuraId: 'a39977b637f440808224bf89d840b420',
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
