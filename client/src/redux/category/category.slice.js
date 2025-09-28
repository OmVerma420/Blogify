// slice.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { refresh: false },
  reducers: {
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    }
  }
});

export const { triggerRefresh } = categorySlice.actions;
export default categorySlice.reducer;
