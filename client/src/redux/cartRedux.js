import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      const index = state.products.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      console.log(index);

      if (index !== -1) {
        state.products[index].quantity += action.payload.quantity;
        state.products[index].total +=
          action.payload.price * action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    addCart: (state, action) => {
      console.log(action.payload);
      const index = state.products.findIndex(
        (item) =>
          item._id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (index !== -1) {
        console.log("first");
        state.products[index].quantity += 1;
        state.total += state.products[index].price;
      }
    },

    removeCart: (state, action) => {
      console.log(action.payload);
      const index = state.products.findIndex(
        (item) =>
          item._id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (index !== -1) {
        console.log("first");
        state.products[index].quantity -= 1;
        state.total -= state.products[index].price;
      }
    },

    removeProduct: (state, action) => {
      console.log(action.payload);
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.products[index].quantity -= action.payload.quantity;
        state.products[index].total -=
          action.payload.price * action.payload.quantity;
        state.total -= action.payload.price * action.payload.quantity;
      }
    },

    removeBulk: (state, action) => {
      console.log(action.payload);

      const index = state.products.findIndex(
        (item) =>
          item._id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      console.log(index);

      if (index > -1) {
        // only splice array when item is found
        state.products.splice(index, 1); // 2nd parameter means remove one item only
      }
      state.quantity -= 1;
      state.total -= action.payload.amount;
    },
  },
});

export const { addProduct, removeProduct, removeBulk, addCart, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
