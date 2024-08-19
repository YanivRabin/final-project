import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    googleSignIn: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/google",
        method: "POST",
        body: credentials,
      }),
    }),
    getWorkoutForUser: builder.query({
      query: () => "/api/auth/workout",
    }),
    getGoogleApiKey: builder.query({
      query: () => "/api/auth/googleApiKey",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGoogleSignInMutation,
  useGetWorkoutForUserQuery,
  useGetGoogleApiKeyQuery,
} = authApi;
