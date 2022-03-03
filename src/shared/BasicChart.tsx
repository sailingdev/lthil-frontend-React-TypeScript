import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { ThemeContext } from '../AppRouter'
import { useContext } from 'react'

export const BasicChart = (props: {
  containerId: string
  width: number
  type?: 'basic' | 'trading'
}) => {
  const { themeContext, setThemeContext } = useContext(ThemeContext)

  const basicChartProperites = {
    symbols: [['Apple', 'AAPL']],
    chartOnly: true,
    width: `${props.width}px`,
    height: '550px',
    locale: 'in',
    colorTheme: themeContext ? 'dark' : 'light',
    gridLineColor: 'rgba(244, 204, 204, 0)',
    fontColor: '#787B86',
    isTransparent: true,
    autosize: false,
    showVolume: false,
    scalePosition: 'left',
    scaleMode: 'Logarithmic',
    fontFamily: 'Raleway',
    noTimeScale: false,
    valuesTracking: '1',
    chartType: 'candlesticks',
    upColor: '#22ab94',
    downColor: '#f7525f',
    borderUpColor: '#22ab94',
    borderDownColor: '#f7525f',
    wickUpColor: '#22ab94',
    wickDownColor: '#f7525f',
    container_id: props.containerId,
  }

  const tradingChartProperites = {
    width: `${props.width}px`,
    height: '600px',
    symbol: 'NASDAQ:AAPL',
    timezone: 'Etc/UTC',
    theme: themeContext ? 'dark' : 'light',
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
    container_id: props.containerId,
  }

  useEffect(() => {
    if (props.type === 'trading') {
      // @ts-ignore
      new window.TradingView.widget(tradingChartProperites)
    } else {
      // @ts-ignore
      new window.TradingView.MediumWidget(basicChartProperites)
    }
  }, [themeContext, props.type])

  return null
}
