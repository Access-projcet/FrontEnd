import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: "guest",
};

const LoginMenuSlice = createSlice({
  name: "LoginMenuSlice",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = LoginMenuSlice.actions;
export default LoginMenuSlice.reducer;
