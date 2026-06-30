import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import authSlice from "./authSlice";
import shortsSlice from "./shortsSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    shorts: shortsSlice,
  },
});

export default store;