import { useEffect } from 'react'

import { RootState } from '../../state/store'
import { useSelector } from 'react-redux'

export const TradingChart = (props: {}) => {
  const theme = useSelector((state: RootState) => state.theme.value)

  const tradingChartProperites = {
    width: `100%`,
    height: '100%',
    symbol: 'NASDAQ:AAPL',
    timezone: 'Etc/UTC',
    theme: theme ? 'dark' : 'light',
    style: 1,
    locale: 'en',
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    withdateranges: true,
    range: 'YTD',
    hide_side_toolbar: false,
    allow_symbol_change: true,
    details: true,
    calendar: true,
    container_id: 'chart',
  }

  useEffect(() => {
    // @ts-ignore
    new window.TradingView.widget(tradingChartProperites)
  }, [theme])

  return <div id='chart' />
}
