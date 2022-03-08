import 'react-loading-skeleton/dist/skeleton.css'
import 'tailwindcss/dist/base.min.css'
import './index.css'

import { QueryClient, QueryClientProvider } from 'react-query'

import { AppRouter } from './AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './shared/ErrorBoundary'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
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
  </Provider>,
  document.getElementById('root'),
)
