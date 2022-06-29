/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ChartsPage } from './pages/ChartsPage'
import { DashboardPage } from './pages/DashboardPage'
import { FaucetsPage } from './pages/FaucetsPage'
import { Footer } from './shared/Footer'
import { Header } from './shared/Header'
import { LeveragedTradingPage } from './pages/LeveragedTrading'
import { MarginTradingPage } from './pages/MarginTradingPage'
import { PositionPage } from './pages/position-page/PositionPage'
import { StakePage } from './pages/stake-page/StakePage'
import { TradePage } from './pages/TradePage'
import { UnsupportedNetworkWarning } from './shared/UnsupportedNetworkWarning'
import { isDesktop } from './utils'
import { useBlockNumberListener } from './shared/hooks/useBlockNumberListener'
import { useEagerConnect } from './shared/hooks/useEagerConnect'
import { useInitSetup } from './shared/hooks/useInitSetup'
import { useNetworkListener } from './shared/hooks/useNetworkListener'
import { useVerifyTransaction } from './shared/hooks/useVerifyTransactions'

export const AppRouter = () => {
  useEagerConnect()
  useNetworkListener()
  useBlockNumberListener()
  useVerifyTransaction()
  useInitSetup()

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <>
      <UnsupportedNetworkWarning />
      <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
        <div tw='flex-grow flex flex-col'>
          <Header />
          <div tw='flex-grow'>
            <Routes>
              <Route path='/trade' element={<TradePage />} />
              <Route
                path='/trade/margin-trading'
                element={<MarginTradingPage />}
              />
              <Route
                path='/trade/leveraged-trading'
                element={<LeveragedTradingPage />}
              />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route
                path='/:strategy/position/:positionId'
                element={<PositionPage />}
              />
              <Route path='/stake' element={<StakePage />} />
              <Route path='/faucets' element={<FaucetsPage />} />
              <Route path='/charts' element={<ChartsPage />} />
              <Route path='*' element={<Navigate to='/trade' replace />} />
            </Routes>
          </div>
          {!isDesktop && <Footer />}
        </div>
      </div>
    </>
  )
}
