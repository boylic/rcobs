import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../api/api";

// Define a service using a base URL and expected endpoints
export const postUser = createApi({
  reducerPath: "signup",
  baseQuery: fetchBaseQuery({ baseUrl: `${api}` }),
  endpoints: (builder) => ({
    postUser: builder.query({
      query: (name) => ({
        url: "127.0.0.1/700/signup",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { userApi } = postUser;
