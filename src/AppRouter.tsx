import 'twin.macro'

import { Route, Routes, Navigate } from 'react-router-dom'

import { DashboardPage } from './pages/DashboardPage'
import tw from 'twin.macro'

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
  return (
    <div
      css={[
        tw`flex bg-primary min-h-screen`,
        // isMobile ? tw`flex-col` : tw`flex-row`,
      ]}
    >
      {/* <Sidebar /> */}
      <div tw='flex-grow'>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  )
}

export const AppRouter = () => {
  // const user = useLoggedInUser()
  const user = true
  return !user ? <PublicRouter /> : <PrivateRouter />
}
