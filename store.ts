import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import redditReducer from './lib/slices/redditSlice'
import drawerReducer from './lib/slices/drawerSlice'

const rootReducer = combineReducers({
  reddit: redditReducer,
  drawer: drawerReducer,
})

const persistConfig = {
  key: 'next-redux-reddit-example',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
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
