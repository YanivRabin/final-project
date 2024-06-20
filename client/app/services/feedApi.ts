import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFeed: builder.query({
      query: () => ({
        url: '/api/gemini/try-gemini',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetFeedQuery } = feedApi;
