// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import themeReducer from './themeSlice'
import contentReducer from './contentSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  content: contentReducer
})

export const makeStore = () => 
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({ serializableCheck: false })
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)