import 'twin.macro'

import { Navigate, Route, Routes } from 'react-router-dom'

import { ChartsPage } from './pages/ChartsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Header } from './shared/Header'
import { StakePage } from './pages/StakePage'
import { TradePage } from './pages/TradePage'
import tw from 'twin.macro'
import { Footer } from './shared/Footer'
import { isMobile, isTablet, isDesktop } from './utils'

/** @jsxImportSource @emotion/react */

export const AppRouter = () => {
  return (
    <div
      css={[
        tw`flex bg-primary min-h-screen`,
        isMobile || (isTablet && !isDesktop) ? tw`flex-col` : tw`flex-row`, // COMMENT: Is this a good way of handling this?
      ]}
    >
      <div tw='flex-grow'>
        <Header />
        <Routes>
          <Route path='/' element={<TradePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/stake' element={<StakePage />} />
          <Route path='/charts' element={<ChartsPage />} />

          <Route path='*' element={<Navigate to='/trade' />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
