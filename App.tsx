import { useMemo } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-native-paper'
import { QueryClientProvider, QueryClient } from 'react-query'
import { StripeProvider } from '@stripe/stripe-react-native'
import { ToastProvider } from 'react-native-toast-notifications'

import Main from './src/Main'
import { STRIPE_PUBLISHABLE_KEY } from './src/constants/stripe'

const App = () => {
  const client = useMemo(() => new QueryClient(), [])
  return (
    <>
      <StatusBar />
      <QueryClientProvider client={client}>
        <Provider>
          <ToastProvider>
            <StripeProvider
              publishableKey={STRIPE_PUBLISHABLE_KEY}
              merchantIdentifier='merchant.identifier'
            >
              <Main />
            </StripeProvider>
          </ToastProvider>
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
