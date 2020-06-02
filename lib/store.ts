import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import redditReducer from './slices/redditSlice'
import drawerReducer from './slices/drawerSlice'

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    drawer: drawerReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    // Disable serializable check from default middleware to avoid
    // console errors realted to redux-persist
    // Reference: https://github.com/rt2zz/redux-persist/issues/988
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
export const persistor = persistStore(store)
