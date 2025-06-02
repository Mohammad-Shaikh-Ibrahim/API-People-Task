import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import store from './stores/store'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, 
        refetchInterval: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)