import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
  URL_BASE_FIREBASE_REALTIME_DATABASE,
} from '../../constants/firebase/index';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE }),
  tagTypes: ['user'],
  endpoints: (builder) => ({

    setUserData: builder.mutation({
      query: ({userID, data}) => ({
        url: `users/${userID}.json`,
        method: 'PUT',
        body: {...data},
      }),
      invalidatesTags: ['user'],
    }),

    getUserData: builder.query({
        query: ({userID}) => {
          return({
            url: `/users/${userID}.json`,
            method: 'GET',
        })},
        providesTags: ['user'],
    }),

    updateUserData: builder.mutation({
      query: ({userID, data}) => 
      {
      return({
          url: `/users/${userID}.json`,
          method: 'PATCH',
          body: {...data},
      })},
      invalidatesTags: ['user'],
  })

  }),
});

export const { useGetUserDataQuery, useSetUserDataMutation, useUpdateUserDataMutation } = userApi;