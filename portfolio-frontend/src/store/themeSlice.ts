import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
  accentColor: string;
}

const initialState: ThemeState = {
  mode:
    typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as ThemeState['mode']) || 'light'
      : 'light',
  accentColor: typeof window !== 'undefined'
  ? (localStorage.getItem('accentColor') as ThemeState['accentColor']) || '#3b82f6'
  : '#3b82f6',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode);
        localStorage.setItem('accentColor', state.accentColor);
      }
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
  },
});

export const { toggleTheme, setAccentColor } = themeSlice.actions;
export default themeSlice.reducer;
