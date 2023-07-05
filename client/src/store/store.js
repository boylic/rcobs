import { configureStore } from "@reduxjs/toolkit";
import { postUser } from "./fetchUser";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupListeners(store.dispatch);
