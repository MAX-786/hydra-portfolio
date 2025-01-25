'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleTheme } from '@/store/themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.mode)

  return (
    <button 
      onClick={() => dispatch(toggleTheme())}
      className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    >
      Toggle {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}