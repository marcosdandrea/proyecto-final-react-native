import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
  URL_BASE_FIREBASE_REALTIME_DATABASE,
} from '../../constants/firebase/index';

export const workoutApi = createApi({
  reducerPath: 'workoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE }),
  tagTypes: ['workouts'],
  endpoints: (builder) => ({
    saveWorkout: builder.mutation({
      query: (workout) => ({
        url: `workouts.json`,
        method: 'POST',
        body: workout,
      }),
      invalidatesTags: ["workouts"]
    }),
    getWorkouts: builder.query({
        query: () => ({
          url: `workouts.json`,
          method: 'GET'
        }),
        providesTags: ["workouts"]
      }),

  }),
});

export const { useSaveWorkoutMutation, useGetWorkoutsQuery } = workoutApi;