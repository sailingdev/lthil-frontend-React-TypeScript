import 'twin.macro'

import { Navigate, Route, Routes } from 'react-router-dom'

import { ChartsPage } from './pages/ChartsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Footer } from './shared/Footer'
import { Header } from './shared/Header'
import { StakePage } from './pages/StakePage'
import { TradePage } from './pages/TradePage'
import { isDesktop } from './utils'
import tw from 'twin.macro'
import { useEffect } from 'react'
import { PositionPage } from './pages/PositionPage'

import { RootState } from './state/store'
import { useSelector } from 'react-redux'

/** @jsxImportSource @emotion/react */

export const AppRouter = () => {
  const theme = useSelector((state: RootState) => state.theme.value)

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark')
    }
  }, [])

  return (
    <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
      <div tw='flex-grow flex flex-col'>
        {isDesktop && <Header />}
        <div tw='flex-grow'>
          <Routes>
            <Route path='/' element={<TradePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/dashboard/:position' element={<PositionPage />} />
            <Route path='/stake' element={<StakePage />} />
            <Route path='/charts' element={<ChartsPage />} />
            <Route path='*' element={<Navigate to='/trade' />} />
          </Routes>
        </div>
        {!isDesktop && <Footer />}
      </div>
    </div>
  )
}
