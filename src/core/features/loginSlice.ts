import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  value: number
}



export const loginSlice = createSlice({
  name: 'user',
  initialState : {
    user : {},
    token : '',
    isUserAuthenticated : false
  },
  reducers: {
    loginDetails : (state, action) => {
        state.isUserAuthenticated =  action.payload.token ? true : false
        state.user = action.payload.user
        state.token = action.payload.token
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginDetails } = loginSlice.actions

export default loginSlice.reducer