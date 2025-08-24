import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import cartReducer from "./slice/cart";
import profileReducer from "./slice/profile";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    profile: profileReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
