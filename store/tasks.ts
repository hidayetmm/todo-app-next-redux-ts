import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "./types";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61dd876ff60e8f00176688cc.mockapi.io/",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: () => `tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks" as const, id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (body) => ({
        url: `tasks`,
        method: "POST",
        body: body,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: Task }, meta, arg) => response.data,
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
