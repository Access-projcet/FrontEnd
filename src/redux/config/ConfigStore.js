import { configureStore } from "@reduxjs/toolkit";
import AdminMenuSlice from "../store/AdminMenuSlice";

const store = configureStore({
  reducer: {
    AdminMenuSlice,

    //...:...
    //...:...
  },
});

export default store;
