import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://anxious-rugby-shirt-ray.cyclic.app/api/v1`,
  }),
  endpoints: () => ({}),
});
