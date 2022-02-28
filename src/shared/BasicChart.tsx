export const BasicChart = () => {
  //@ts-ignore
  new TradingView.MediumWidget({
    symbols: [['Apple', 'AAPL']],
    chartOnly: false,
    width: 1000,
    height: 400,
    locale: 'in',
    container_id: 'chartid',
  })

  return <div id='chartid'></div>
}
