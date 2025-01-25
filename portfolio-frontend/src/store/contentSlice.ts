// src/store/contentSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { PloneContent } from '@/lib/plone'

interface ContentState {
  data: PloneContent | null
  loading: boolean
  error: string | null
}

const initialState: ContentState = {
  data: null,
  loading: false,
  error: null
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    setLoading: (state) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { setContent, setLoading, setError } = contentSlice.actions
export default contentSlice.reducer