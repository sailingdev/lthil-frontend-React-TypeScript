import { useEffect } from 'react'

export const BasicChart = (props: { containerId: string }) => {
  useEffect(() => {
    // @ts-ignore
    new window.TradingView.MediumWidget({
      symbols: [['Apple', 'AAPL']],
      chartOnly: false,
      width: '100%',
      height: 400,
      locale: 'in',
      container_id: props.containerId,
    })
  }, [])

  return null
}
