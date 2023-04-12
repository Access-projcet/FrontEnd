import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: "admin",
};

const AdminMenuSlice = createSlice({
  name: "AdminMenuSlice",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = AdminMenuSlice.actions;
export default AdminMenuSlice.reducer;
