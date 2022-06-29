import { useCallback, useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'

import { http } from '../../http'
import { useTheme } from '../../state/hooks'

const darkTheme = {
  chart: {
    layout: {
      backgroundColor: 'transparent',

      textColor: 'white',
    },
    watermark: {
      color: 'rgba(0, 0, 0, 0)',
    },

    grid: {
      horzLines: {
        visible: true,
      },
      vertLines: {
        visible: true,
      },
    },
  },
  series: {
    topColor: 'rgba(33, 150, 243, 0.56)',
    bottomColor: 'rgba(33, 150, 243, 0.04)',
    lineColor: 'rgba(33, 150, 243, 1)',
    lineWidth: 2,
  },
}

const lightTheme = {
  chart: {
    layout: {
      backgroundColor: 'transparent',

      textColor: '#191919',
    },
    watermark: {
      color: 'rgba(0, 0, 0, 0)',
    },

    grid: {
      horzLines: {
        visible: true,
      },
      vertLines: {
        visible: true,
      },
    },
  },
  series: {
    topColor: 'rgba(33, 150, 243, 0.56)',
    bottomColor: 'rgba(33, 150, 243, 0.04)',
    lineColor: 'rgba(33, 150, 243, 1)',
    lineWidth: 2,
  },
}

export const YearnChart = (props: { tokenAddress: string }) => {
  const theme = useTheme()

  const ref = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)

  const loadGraph = useCallback(async () => {
    ref.current.innerText = ''

    const chart = createChart(ref.current)
    const series = chart.addAreaSeries({})
    const styles = theme ? darkTheme : lightTheme

    chart.applyOptions({
      ...styles.chart,
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      timeScale: { timeVisible: true },
    })
    // @ts-ignore
    series.applyOptions(styles.series)

    const data = await http.getYearnHistoricalEarnings(1)
    console.log({ data })

    if (data.length > 0) {
      series.setData(data)
    }
    chart.timeScale().fitContent()
  }, [theme, props.tokenAddress])

  useEffect(() => {
    if (isMounted || !ref.current) {
      return
    }
    loadGraph()
    setIsMounted(true)
  }, [ref.current])

  useEffect(() => {
    loadGraph()
  }, [theme, props.tokenAddress])

  return <div ref={ref} style={{ height: '100%', width: '100%' }} />
}
