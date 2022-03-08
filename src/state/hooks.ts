import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { RootState } from './store'
import { toggleTheme } from './theme/theme.actions'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTheme = () => useAppSelector((state) => state.theme.value)

export const useToggleTheme = () => {
  const dispatch = useDispatch()
  return () => dispatch(toggleTheme())
}
