import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import exercisesReducer from "./exercises/exercises.slice";
import routinesReducer from "./routines/routines.slice";
import categoriesSlice from "./categories.slice";
import authReducer from './auth/auth.slice';
import workoutReducer from "./workout/workout.slice"
import progressReducer from "./progress/progress.slice";
import { exercisesAPI } from "./exercises/exercises.API";
import { routinesAPI } from "./routines/routines.API";
import { authApi } from "./auth/auth.API";
import { userApi } from "./user/user.API";
import { workoutApi } from "./workout/workout.api";
import { _loadProgress } from "./progress/progress.services";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesSlice,
    auth: authReducer,
    workout: workoutReducer,
    progress: progressReducer,
    [exercisesAPI.reducerPath]: exercisesAPI.reducer,
    [routinesAPI.reducerPath]: routinesAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workoutApi.reducerPath]: workoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exercisesAPI.middleware,
      routinesAPI.middleware,
      authApi.middleware,
      userApi.middleware,
      workoutApi.middleware,
    ),
});


setupListeners(store.dispatch);
