import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItems = state.items;
      const itemIndex = cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity++;
      if (itemIndex === -1) {
        // new item
        cartItems.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
        });
      } else {
        // existing item
        const existingCartItem = cartItems[itemIndex];
        const updatedCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };

        cartItems[itemIndex] = updatedCartItem;
      }
      state.items = cartItems;
    },
    removeFromCart(state, action) {
      const cartItems = state.items;
      const itemIndex = cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const itemToBeDeleted = cartItems[itemIndex];
      state.totalQuantity--;
      if (itemToBeDeleted.quantity === 1) {
        state.items = cartItems.filter((item) => item.id != action.payload.id);
      } else {
        cartItems[itemIndex] = {
          ...itemToBeDeleted,
          quantity: itemToBeDeleted.quantity - 1,
        };
        state.items = cartItems;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
