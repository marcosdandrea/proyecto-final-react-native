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
      query: ({userID, name, mail, profilePic}) => ({
        url: `users/${userID}.json`,
        method: 'POST',
        body: {name, mail, profilePic},
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
      query: ({userID, firebaseID, name, mail, profilePic}) => {
        console.log (`/users/${userID}/${firebaseID}.json`)
        return({
          url: `/users/${userID}/${firebaseID}.json`,
          method: 'PUT',
          body: {name, mail, profilePic},
      })},
      providesTags: ['user'],
  })

  }),
});

export const { useGetUserDataQuery, useSetUserDataMutation, useUpdateUserDataMutation } = userApi;