import { createSlice } from "@reduxjs/toolkit";

let initialState = { 
    progress: [] 
};
const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    loadProgress: (state, action) => {
      state.progress = action.payload;
    },
    saveProgress: (state, action) => {
      state.progress.push(action.payload);
    },
    deleteProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { loadProgress, saveProgress, deleteProgress } =
  progressSlice.actions;
export default progressSlice.reducer;
