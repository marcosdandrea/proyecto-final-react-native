import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BASE_FIREBASE_REALTIME_DATABASE } from "../../constants/firebase";


export const routinesAPI = createApi({
  reducerPath: "routinesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE,
  }),
  tagTypes: ["routine", "routines"],

  endpoints: (builder) => ({
    getAllRoutines: builder.query({
      query: () => "/routines.json",
      providesTags: ["routines"],
    }),

    getSingleRoutine: builder.query({
      query: ({ key }) => `/routines/${key}.json`,
      providesTags: ["routine"],
    }),

    deleteRoutine: builder.mutation({
      query: ({ key }) => {
        return {
          url: `/routines/${key}.json`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["routines", "routine"],
    }),

    saveRoutine: builder.mutation({
      query: ({ routine, key }) => {
        return {
          url: `/routines/${key}.json`,
          method: "PATCH",
          body: routine,
        }
      },
      invalidatesTags: ["routines", "routine"],

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
      invalidatesTags: ["routines", "routine"],
    }),

    addExerciseToRoutine: builder.mutation({
      query: ({ exercise, routineID }) => {
        return {
          url: `/routines/${routineID}/exercises.json`,
          method: "POST",
          body: exercise,
        };
      },
      invalidatesTags: ["routines", "routine"],
    }),

    removeExerciseFromRoutine: builder.mutation({
      query: ({ exerciseIndex, routineID }) => {
        return {
          url: `/routines/${routineID}/exercises/${exerciseIndex}.json`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["routines", "routine"],
    }),

  }),
});

export const {
  useGetAllRoutinesQuery,
  useGetSingleRoutineQuery,
  useSaveRoutineMutation,
  useDeleteRoutineMutation,
  usePatchRoutineExerciseMutation,
  useAddExerciseToRoutineMutation,
  useRemoveExerciseFromRoutineMutation,
} = routinesAPI;
