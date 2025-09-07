import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: {
      name: '',
      
    },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state , action) => {
      state.status = true;
      state.userData = action.payload
    },
    removeUser : (state ) => {
      state.status = false;
      state.userData = null;
    },
  },
})

export const { setUser , removeUser} = userSlice.actions;

export default userSlice.reducer;

