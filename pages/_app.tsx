import { Provider } from 'react-redux'
import { FunctionComponent, ComponentType } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import CssBaseline from '@material-ui/core/CssBaseline'

import { store, persistor } from '../lib/store'

type MyAppProps = {
  Component: ComponentType
  pageProps: Record<string, unknown>
}

// eslint-disable-next-line react/prop-types
const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
