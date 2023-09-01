/* eslint-disable no-unused-vars */
import { apiSlice } from "../api/apiSlice";

export const lessonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: `/lesson`,
        method: "GET",
      }),
    }),
    addLesson: builder.mutation({
      query: (data) => ({
        url: `/lesson`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ id, email }) => ({
        url: `/todo/deletetodo/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        console.log(result);
        console.log(arg);

        const queryString = "";

        if (result?.data?.status == "success") {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTodos",
              { email: arg?.email, queryString: queryString },
              (draft) => {
                console.log("caching");
                console.log(JSON.stringify(draft?.todos));
                const filterDraft = draft?.todos?.filter(
                  (d) => d?._id !== arg?.id
                );

                return {
                  ...draft,
                  todos: filterDraft,
                };
              }
            )
          );
        }
      },
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `todo/edittodo/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        const email = result?.data?.todo?.user?.email;
        const updatedTodo = result?.data?.todo;
        console.log(updatedTodo);
        const queryString = "";
        console.log(arg);

        if (result?.data?.status == "success") {
          dispatch(
            apiSlice.util.updateQueryData(
              "getTodos",
              { email: email, queryString: queryString },
              (draft) => {
                console.log("caching when edit");
                console.log(JSON.stringify(draft?.todos));
                const findDraft = draft?.todos?.find((d) => d?._id == arg?.id);
                console.log(JSON.stringify(findDraft));
                findDraft.title = updatedTodo?.title;
                findDraft.description = updatedTodo?.description;
                findDraft.category = updatedTodo?.category;
                findDraft.createdAt = updatedTodo?.createdAt;
                findDraft.updatedAt = updatedTodo?.updatedAt;
                findDraft.complete = updatedTodo?.complete;
                findDraft.user = updatedTodo?.user;
              }
            )
          );
        }
      },
    }),
    getSingleLesson: builder.query({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetSingleLessonQuery,
  useAddLessonMutation,
} = lessonApi;
