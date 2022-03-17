import 'twin.macro'

import { Route, Routes } from 'react-router-dom'

import { ChartsPage } from './pages/ChartsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Footer } from './shared/Footer'
import { Header } from './shared/Header'
import { MarginTradingPage } from './pages/MarginTradingPage'
import { PositionPage } from './pages/PositionPage'
import { StakePage } from './pages/StakePage'
import { isDesktop } from './utils'
import tw from 'twin.macro'
import { useBlockNumberListener } from './shared/hooks/useBlockNumberListener'
import { useEffect } from 'react'
import { useInitSetup } from './shared/hooks/useInitSetup'
import { useNetworkListener } from './shared/hooks/useNetworkListener'

/** @jsxImportSource @emotion/react */

export const AppRouter = () => {
  useNetworkListener()
  useBlockNumberListener()
  useInitSetup()

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
      <div tw='flex-grow flex flex-col'>
        <Header />
        <div tw='flex-grow'>
          <Routes>
            <Route path='/' element={<MarginTradingPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/margintrading' element={<MarginTradingPage />} />
            <Route path='/dashboard/:position' element={<PositionPage />} />
            <Route path='/stake' element={<StakePage />} />
            <Route path='/charts' element={<ChartsPage />} />
            {/* <Route path='*' element={<Navigate to='/trade' />} /> */}
          </Routes>
        </div>
        {!isDesktop && <Footer />}
      </div>
    </div>
  )
}
