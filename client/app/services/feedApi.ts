import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createWorkoutPlan: builder.mutation({
      query: (userProfile) => ({
        url: '/api/gemini/create-workout',
        method: 'POST',
        body: userProfile,
      }),
    }),
    updateWorkoutPlan: builder.mutation({
      query: (workoutPlanUpdate) => ({
        url: '/api/gemini/update-workout-plan',
        method: 'POST',
        body: workoutPlanUpdate,
      }),
    }),
  }),
});

export const { useCreateWorkoutPlanMutation, useUpdateWorkoutPlanMutation } = feedApi;