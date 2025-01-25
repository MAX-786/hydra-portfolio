'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'
import { setupListeners } from '@reduxjs/toolkit/query'
import { setContent } from '@/store/contentSlice'

export const ReduxProvider = ({
  children,
  preloadedState,
}: {
  children: ReactNode
  preloadedState: { content: { data: unknown } }
}) => {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  // Hydrate the store with server-side data
  useEffect(() => {
    if (preloadedState && storeRef.current) {
      storeRef.current.dispatch(setContent(preloadedState.content.data))
    }
  }, [preloadedState])

  // Set up RTK Query listeners
  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = setupListeners(storeRef.current.dispatch)
      return unsubscribe
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}