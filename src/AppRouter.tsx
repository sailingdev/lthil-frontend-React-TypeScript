import 'twin.macro'

import { Route, Routes, Navigate } from 'react-router-dom'

import { DashboardPage } from './pages/DashboardPage'
import tw from 'twin.macro'
import { Footer } from './shared/Footer'

/** @jsxImportSource @emotion/react */

const PublicRouter = () => {
  return (
    <Routes>
      {/* <Route path='/login' element={<LoginPage />} /> */}
      {/* <Route path='*' element={<Navigate to='/' />} /> */}
    </Routes>
  )
}

const PrivateRouter = () => {
  const isMobile = true

  return (
    <div
      css={[
        tw`flex bg-primary min-h-screen`,
        isMobile ? tw`flex-col` : tw`flex-row`,
      ]}
    >
      <div tw='flex-grow'>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export const AppRouter = () => {
  // const user = useLoggedInUser()
  const user = true
  return !user ? <PublicRouter /> : <PrivateRouter />
}
