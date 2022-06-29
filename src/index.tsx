/** @jsxImportSource @emotion/react */
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Web3ReactProvider } from '@web3-react/core'

import 'react-loading-skeleton/dist/skeleton.css'
import 'tailwindcss/dist/base.min.css'
import './index.css'

import { Ether, initializeGlobalInstance } from './api/ether'

import { AppRouter } from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './shared/ErrorBoundary'

import { store } from './state/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

ReactDOM.render(
  <Web3ReactProvider
    getLibrary={(baseProvider: any) => {
      const localInstance = new Ether(baseProvider)
      initializeGlobalInstance(localInstance)
      return localInstance
    }}
  >
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <ToastContainer
            position='bottom-right'
            hideProgressBar
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            style={{ zIndex: 10000 }}
          />
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </Web3ReactProvider>,

  document.getElementById('root'),
)
