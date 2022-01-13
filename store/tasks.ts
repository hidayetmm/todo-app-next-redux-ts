import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "./types";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61dd876ff60e8f00176688cc.mockapi.io/",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: () => `tasks`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksQuery } = tasksApi;
