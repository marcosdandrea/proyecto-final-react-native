import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import exercisesReducer from "./exercises/exercises.slice";
import routinesReducer from "./routines/routines.slice";
import categoriesSlice from "./categories.slice";
import { exercisesAPI } from "./exercises/exercises.API";
import { routinesAPI } from "./routines/routines.API";
import { authApi } from "./auth/auth.API";
import authReducer from './auth/auth.slice';
import { userApi } from "./user/user.API";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesSlice,
    auth: authReducer,
    [exercisesAPI.reducerPath]: exercisesAPI.reducer,
    [routinesAPI.reducerPath]: routinesAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exercisesAPI.middleware,
      routinesAPI.middleware,
      authApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
