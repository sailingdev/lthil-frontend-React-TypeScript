import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  initializeAccountAddress,
  initializeAccountBalance,
  updateBlockNumber,
} from './network/network.actions'
// @ts-ignore
import { initializeUserStakes } from './stake/stake.actions'
import { initializePositionsData } from './marginTrading/marginTrading.actions'
import { RootState } from './store'
import { toggleTheme } from './theme/theme.actions'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// THEME HOOKS

export const useTheme = () => useAppSelector((state) => state.theme.value)

export const useToggleTheme = () => {
  const dispatch = useDispatch()
  return () => dispatch(toggleTheme())
}

// NETWORK HOOKS

export const useLatestBlock = () =>
  useAppSelector((state) => state.network.latestBlock)

export const useUpdateBlock = () => {
  const dispatch = useDispatch()
  return () => dispatch(updateBlockNumber())
}

export const useAccountBalance = () =>
  useAppSelector((state) => state.network.accountBalance)

export const useInitAccountBalance = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializeAccountBalance())
}

export const useAccountAddress = () => {
  const address = useAppSelector((state) => state.network.accountAddress)
  if (address) {
    const shortAddress = `${address!.substring(0, 6)}...${address!.substring(
      address!.length - 5,
      address!.length,
    )}`
    return [address, shortAddress]
  }
  return [undefined, undefined]
}

export const useInitAccountAddress = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializeAccountAddress())
}

// STAKE HOOKS

export const useStakeTokens = () => {
  return useAppSelector((state) => state.stake.tokenStakeData)
}

export const useInitStakeTokens = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializeUserStakes())
}

// MARGIN TRADING HOOKS

export const usePositions = () => {
  return useAppSelector((state) => state.marginTrading.positions)
}

export const useInitPositions = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializePositionsData())
}

// TODO MISLAV
// export function useEagerConnect() {
//   const { activate, active } = useWeb3React();

//   const [tried, setTried] = useState(false);

//   useEffect(() => {
//     injected.isAuthorized().then(isAuthorized => {
//       if (isAuthorized) {

//         activate(injected, undefined, true).catch(() => {
//           setTried(true);
//         });
//       } else {
//         setTried(true);
//       }
//     });
//   }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

//   // if the connection worked, wait until we get confirmation of that to flip the flag
//   useEffect(() => {
//     if (!tried && active) {
//       setTried(true);
//     }
//   }, [tried, active]);

//   return tried;
// }
