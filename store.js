import { configureStore } from '@reduxjs/toolkit'
import selectedNutritionsSlice from './slices/selectedNutritionsSlice'

export const store = configureStore({
  reducer: {
    selectedNutritions: selectedNutritionsSlice,
  },
})