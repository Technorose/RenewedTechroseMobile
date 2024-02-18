import { configureStore } from '@reduxjs/toolkit'
import selectedNutritionsSlice from './slices/selectedNutritionsSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    selectedNutritions: selectedNutritionsSlice,
    user: userSlice
  },
})