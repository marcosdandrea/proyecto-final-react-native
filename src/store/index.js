import { configureStore } from "@reduxjs/toolkit";

import exercisesReducer from "./exercises/exercises.slice";
import routinesReducer from "./routines/routines.slice";
import categoriesSlice from "./categories.slice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesSlice,
  },
});
