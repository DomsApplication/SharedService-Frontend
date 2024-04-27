// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  drawerOpen: false,
  componentDrawerOpen: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
  },
});

export default menuSlice.reducer;

export const { openDrawer, openComponentDrawer } = menuSlice.actions;
