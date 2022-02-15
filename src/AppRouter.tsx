import 'twin.macro'

import { Redirect, Route, Switch } from 'react-router-dom'

import { DashboardPage } from './pages/DashboardPage'
import tw from 'twin.macro'

/** @jsxImportSource @emotion/react */

const PublicRouter = () => {
  return (
    <Switch>
      {/* <Route path='/login' component={LoginPage} /> */}
      <Redirect to='/login' />
    </Switch>
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
        <Switch>
          <Route exact path='/' component={DashboardPage} />

          <Redirect to='/' />
        </Switch>
      </div>
    </div>
  )
}

export const AppRouter = () => {
  // const user = useLoggedInUser()
  const user = true
  return !user ? <PublicRouter /> : <PrivateRouter />
}
