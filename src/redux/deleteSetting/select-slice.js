import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: ''
}
export const select = createSlice({
  name: 'selectTest',
  initialState,
  reducers: {
    resetSelect: () => initialState,
    changeSelect: (state, action) => {
      state.id = action.payload.id;
    }
  }
})

export const {resetSelect, changeSelect} = select.actions

export default select.reducer