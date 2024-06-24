import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createWorkoutPlan: builder.mutation({
      query: (userProfile) => ({
        url: '/api/gemini/create-workout',
        method: 'POST',
        body: userProfile,
      }),
    }),
  }),
});

export const { useCreateWorkoutPlanMutation } = feedApi;
