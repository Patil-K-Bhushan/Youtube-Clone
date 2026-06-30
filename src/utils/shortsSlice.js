import { createSlice } from "@reduxjs/toolkit";

const shortsSlice = createSlice({
  name: "shorts",
  initialState: {
    shortsList: [],
    activeIndex: 0,
    isMuted: true,
    isCommentsOpen: false,
    nextPageToken: null,
  },
  reducers: {
    setShortsList: (state, action) => {
      state.shortsList = action.payload;
    },
    appendShortsList: (state, action) => {
      state.shortsList = [...state.shortsList, ...action.payload];
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setMuted: (state, action) => {
      state.isMuted = action.payload;
    },
    toggleComments: (state) => {
      state.isCommentsOpen = !state.isCommentsOpen;
    },
    setCommentsOpen: (state, action) => {
      state.isCommentsOpen = action.payload;
    },
    setNextPageToken: (state, action) => {
      state.nextPageToken = action.payload;
    },
  },
});

export const {
  setShortsList,
  appendShortsList,
  setActiveIndex,
  toggleMute,
  setMuted,
  toggleComments,
  setCommentsOpen,
  setNextPageToken,
} = shortsSlice.actions;

export default shortsSlice.reducer;
