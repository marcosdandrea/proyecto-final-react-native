import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BASE_FIREBASE_REALTIME_DATABASE } from "../../constants/firebase";

export const routinesAPI = createApi({
  reducerPath: "routinesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE,
  }),
  tagTypes: ["routines"],

  endpoints: (builder) => ({
    getAllRoutines: builder.query({
      query: () => "/routines.json",
      providesTags: ["routines"],
    }),

    getSingleRoutine: builder.query({
      query: ({ key }) => `/routines/${key}.json`,
      providesTags: ["routines"],
    }),

    saveRoutine: builder.mutation({
      query: ({ routine, key }) => {
        //console.log (key)
        //console.log (JSON.stringify(routine))
        return {
          url: `/routines/${key}.json`,
          method: "PATCH",
          body: routine,
        };
      },
      async onQueryStarted({ routine, key }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          routinesAPI.util.updateQueryData(
            "getAllRoutines",
            undefined,
            (draft) => {
              draft[key] = routine;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    patchRoutineExercise: builder.mutation({
      query: ({ exercise, routineID, index }) => {
        return {
          url: `/routines/${routineID}/exercises/${index}.json`,
          method: "PATCH",
          body: exercise,
        };
      },
      invalidatesTags: ["routines"],
    }),

    addExerciseToRoutine: builder.mutation({
      query: ({ exercise, routineID }) => {
        return {
          url: `/routines/${routineID}/exercises.json`,
          method: "POST",
          body: exercise,
        };
      },
      invalidatesTags: ["routines"],
    }),

    removeExerciseFromRoutine: builder.mutation({
      query: ({ exerciseIndex, routineID }) => {
        console.log (exerciseIndex, routineID);
        return {
          url: `/routines/${routineID}/exercises/${exerciseIndex}.json`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["routines"],
    }),

  }),
});

export const {
  useGetAllRoutinesQuery,
  useGetSingleRoutineQuery,
  useSaveRoutineMutation,
  usePatchRoutineExerciseMutation,
  useAddExerciseToRoutineMutation,
  useRemoveExerciseFromRoutineMutation,
} = routinesAPI;
