import { createSlice } from "@reduxjs/toolkit";

const wideScreen = typeof window !== "undefined" ? window.innerWidth >= 1024 : true;

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: wideScreen,
    lastOpen: wideScreen,
    activeChip: "All",
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    collapseForWatch: (state) => {
      state.lastOpen = state.isMenuOpen;
      state.isMenuOpen = false;
    },
    restoreMenu: (state) => {
      state.isMenuOpen = state.lastOpen;
    },
    setActiveChip: (state, action) => {
      state.activeChip = action.payload;
    },
  },
});

export const { toggleMenu, collapseForWatch, restoreMenu, setActiveChip } =
  appSlice.actions;
export default appSlice.reducer;
