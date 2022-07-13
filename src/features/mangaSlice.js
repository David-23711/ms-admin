
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://127.0.0.1:8000/api";
// const baseUrl="https://manga23711.herokuapp.com/api/admin";
export const mangaSlice = createApi({
  reducerPath: "mangaSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Mangas"],
  endpoints: (builder) => ({
    createManga: builder.mutation({
      query: (manga) => ({
        url: "/admin/creatingManga",
        method: "POST",
        body: manga,
      }),
      invalidatesTags: ["Mangas","Episodes"],
    }),
    fetchManga: builder.query({
      query: ({page,searchName}) => ({
        url: `/admin/fetchingManga?page=${page} &search=${searchName}`,
      }),
      providesTags: ["Mangas"],
    }),
    fetchMangaForSearch:builder.query({
      query:(page)=>({
        url:`/admin/fetchingManga?page=${page}`
      })
    }),
    fetchByMangaId:builder.query({
      query:(id)=>({
        url:`/admin/fetchByMangaId/${id}`
      }),
      providesTags:['Mangas'],
    }),
    updateManga: builder.mutation({
      query: ({manga,id}) =>({
        url: `/admin/updatingManga/${id}`,
        method: "POST",
        body: manga,
      }),
      invalidatesTags:["Mangas"]
    }),
    deleteManga:builder.mutation({
        query:({id,image})=>({
            url:`/admin/deletingManga/${id}/${image}`,
            method:"DELETE",
        }),
        invalidatesTags:["Mangas"]
    }),
    createEpisode:builder.mutation({
     query:({name,mangaId})=>({
      url:"/admin/creatingEpisode",
      method:"POST",
      body:{name,mangaId}
     }),
     invalidatesTags:["Episodes"]
    }),
    fetchEpisode:builder.query({
      query:(id)=>({
        url:`/admin/fetchingEpisode/${id}`
      }),
      providesTags:['Episodes']
    }),
    countEpisode:builder.query({
      query:(id)=>({
        url:`/admin/gettingImageCount/${id}`
      }),
      providesTags:['Episodes']
    }),
    deleteEpisode:builder.mutation({
      query:(id)=>({
        url:`/admin/deletingEpisode/${id}`,
        method:'DELETE',
      }),
      invalidatesTags:["Episodes"]
    }),
    createImagesById:builder.mutation({
      query:({id,formData})=>({
        url:`/admin/creatingImages/${id}`,
        method:"POST",
        body:formData
      })
    }),
    login:builder.mutation({
      query:(data)=>({
        url:'/admin/msmanga/login',
        method:'POST',
        body:data
      })
    }),
    registerAdmin:builder.mutation({
      query:(data)=>({
        url:'/msmanga/register',
        method:'POST',
        body:data
      })
    })
  }),
});
export const {
  useCreateMangaMutation,
  useFetchMangaQuery,
  useUpdateMangaMutation,
  useDeleteMangaMutation,
  useFetchByMangaIdQuery,
  useFetchMangaForSearchQuery,
  useFetchEpisodeQuery,
  useCreateEpisodeMutation,
  useDeleteEpisodeMutation,
  useCreateImagesByIdMutation,
  useCountEpisodeQuery,
  useLoginMutation,
  useRegisterAdminMutation
} = mangaSlice;


