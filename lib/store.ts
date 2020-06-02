import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import ReduxThunk from 'redux-thunk'

import redditReducer from './slices/redditSlice'
import drawerReducer from './slices/drawerSlice'

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    drawer: drawerReducer,
  },
  devTools: true,
  middleware: [ReduxThunk],
})
export const persistor = persistStore(store)
