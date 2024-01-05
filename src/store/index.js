import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import mealsReducer from "./meals";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    meals: mealsReducer,
  },
});

export default store;
