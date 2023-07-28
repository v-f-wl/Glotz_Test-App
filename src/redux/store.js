import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './filter/filter-slice'
import selectReducer from './deleteSetting/select-slice'

export const store = configureStore({
  reducer: {
    filterReducer,
    selectReducer
  }
})