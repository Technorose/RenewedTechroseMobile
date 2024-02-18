import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state = initialState, action) => {
      state.user = action.payload
    },
    removeUser: (state = initialState, action) => {
      state.user = {}
    },
    updateUser: (state = initialState, action) => {
      state.user = {...state.user, ...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, updateUser } = userSlice.actions


export default userSlice.reducer;