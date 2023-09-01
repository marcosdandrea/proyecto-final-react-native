import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BASE_FIREBASE_REALTIME_DATABASE } from "../../constants/firebase";
import "react-native-random-uuid";

export const exercisesAPI = createApi({
  reducerPath: "exercisesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE,
  }),
  tagTypes: ["exercises"],
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "/exercises/items.json",
      providesTags: ["exercises"],
    }),
    getExercisesById: builder.query({
      query: ({id}) => `/exercises/items/${id}.json`,
      providesTags: ["exercises"],
    }),
    getCategories: builder.query({
      query: () => "/exercises/categories.json",
    }),
    saveExercises: builder.mutation({
      query: ({ data, key }) => ({
          url: `/exercises/items/${key}.json`,
          method: "PATCH",
          body: data,
        }),    
      invalidatesTags: ["exercises"],
    }),
    addNewExercises: builder.mutation({
      query: ({ data }) => ({
        url: "/exercises/items.json",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["exercises"],
    }),
    removeExercise: builder.mutation({
        query: ({ key }) => ({
          url: `/exercises/items/${key}.json`,
          method: "DELETE",
        }),
        invalidatesTags: ["exercises"],
    })
  }),
});

export const {
  useGetExercisesQuery,
  useGetExercisesByIdQuery,
  useGetCategoriesQuery,
  useSaveExercisesMutation,
  useAddNewExercisesMutation,
  useRemoveExerciseMutation,
} = exercisesAPI;
