import 'twin.macro'
import tw from 'twin.macro'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import useLocalStorage from './shared/hooks/useLocalStorage'
import { ChartsPage } from './pages/ChartsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Footer } from './shared/Footer'
import { Header } from './shared/Header'
import { StakePage } from './pages/StakePage'
import { TradePage } from './pages/TradePage'
import { isDesktop } from './utils'

/** @jsxImportSource @emotion/react */

export const AppRouter = () => {
  const [darkMode] = useLocalStorage('darkMode', false)

  useEffect(() => {
    if (darkMode) document.documentElement.classList.toggle('dark')
  }, [])

  return (
    <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
      <div tw='flex-grow flex flex-col'>
        {isDesktop && <Header />}
        <div tw='flex-grow'>
          <Routes>
            <Route path='/' element={<TradePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
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
