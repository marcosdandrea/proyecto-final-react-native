import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import exercisesReducer from "./exercises/exercises.slice";
import routinesReducer from "./routines/routines.slice";
import categoriesSlice from "./categories.slice";
import { exercisesAPI } from "./exercises/exercises.API";
import { routinesAPI } from "./routines/routines.API";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesSlice,
    [exercisesAPI.reducerPath]: exercisesAPI.reducer,
    [routinesAPI.reducerPath]: routinesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exercisesAPI.middleware,
      routinesAPI.middleware
    ),
});

setupListeners(store.dispatch);
