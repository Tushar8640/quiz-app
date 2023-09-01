/* eslint-disable no-unused-vars */
import { apiSlice } from "../api/apiSlice";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizByQuizId: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
      }),
    }),
    getQuizByLesson: builder.query({
      query: (id) => ({
        url: `/quiz/lesson/${id}`,
        method: "GET",
      }),
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quiz/addquiz`,
        method: "POST",
        body: data,
      }),
    }),
    saveResult: builder.mutation({
      query: (data) => ({
        url: `/result`,
        method: "POST",
        body: data,
      }),
    }),
    getResult: builder.query({
      query: (id) => ({
        url: `/result/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetQuizByQuizIdQuery,
  useGetQuizByLessonQuery,
  useAddQuizMutation,
  useSaveResultMutation,
  useGetResultQuery,
} = todoApi;
