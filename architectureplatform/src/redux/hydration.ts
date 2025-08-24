import { store } from "./store";
import { setUser } from "./slice/user";
import { setCartItems } from "./slice/cart";

export const hydrateStore = () => {
  const serializedState = localStorage.getItem("reduxState");
  if (serializedState) {
    const state = JSON.parse(serializedState);

    if (state.user?.user) {
      store.dispatch(setUser(state.user.user));
    }

    if (state.cart?.items) {
      store.dispatch(setCartItems(state.cart.items));
    }
  }
};

export const clearStoredData = () => {
  localStorage.removeItem("reduxState");
  localStorage.removeItem("user");
};
