import { configureStore } from "@reduxjs/toolkit";
import AdminMenuSlice from "../store/AdminMenuSlice";
import LoginMenuSlice from "../store/LoginMenuSlice";

const store = configureStore({
  reducer: {
    AdminMenuSlice,
    LoginMenuSlice,
    //...:...
    //...:...
  },
});

export default store;
