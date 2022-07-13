
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://127.0.0.1:8000/api/admin";
// const baseUrl="https://manga23711.herokuapp.com/api/admin";
export const genreSlice = createApi({
  reducerPath: "genreSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Genres"],
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (genre) => ({
        url: "/creatingGenre",
        method: "POST",
        body: { genre },
      }),
      invalidatesTags: ["Genres"],
    }),
    fetchGenre: builder.query({
      query: (page) => ({
        url: `/fetchingGenre?page=${page}`,
      }),
      providesTags: ["Genres"],
    }),
    updateGenre: builder.mutation({
      query: ({ genre, genreId }) => ({
        url: `/updatingGenre/${genreId}`,
        method: "PUT",
        body: { genre },
      }),
      invalidatesTags:["Genres"]
    }),
    deleteGenre:builder.mutation({
        query:(id)=>({
            url:`/deletingGenre/${id}`,
            method:"DELETE",
        }),
        invalidatesTags:["Genres"]
    })
  }),
});
export const {
  useCreateGenreMutation,
  useFetchGenreQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation
} = genreSlice;
