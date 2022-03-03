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
import { useEffect, createContext } from 'react'
import { useLocalStorage } from 'react-use'
import { PositionPage } from './pages/PositionPage'

/** @jsxImportSource @emotion/react */

export const ThemeContext = createContext<any>(null)

export const AppRouter = () => {
  const [themeContext, setThemeContext] = useLocalStorage('darkMode', false)

  // const [darkMode] = useLocalStorage('darkMode', false)

  useEffect(() => {
    if (themeContext) {
      document.documentElement.classList.toggle('dark')
    }
  }, [])

  return (
    <div css={[tw`flex flex-col bg-primary min-h-screen desktop:flex-row`]}>
      <div tw='flex-grow flex flex-col'>
        <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
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
        </ThemeContext.Provider>
      </div>
    </div>
  )
}
