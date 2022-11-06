import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    addOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.isFetching = false;
    },
    addOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { addOrderStart, addOrderSuccess, addOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
