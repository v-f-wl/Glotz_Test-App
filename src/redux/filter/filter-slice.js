import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    rating: '',
    category: ''
  }
}
export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    resetFilter: () => initialState,
    changeCategory: (state, action) => {
      state.value.rating = action.payload.rating;
      state.value.category = action.payload.category;
    }
  }
})

export const {resetFilter, changeCategory} = filter.actions

export default filter.reducer