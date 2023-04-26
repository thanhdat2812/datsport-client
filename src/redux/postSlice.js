import { createSlice } from "@reduxjs/toolkit";
import { postsActions } from "./postActions";
import { toast } from "react-toastify";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    success: false,
    error: null,
    dataAllPosts: [],
    dataPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postsActions.getAll.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postsActions.getAll.fulfilled, (state, { payload }) => {
        state.dataAllPosts = payload;
        state.totalPages = payload.totalPages;
        state.lastPage = payload.last;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(postsActions.getAll.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(postsActions.create.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postsActions.create.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataAllPosts.push(payload);
        toast.success("Add new posts Success!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(postsActions.create.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
        toast.error("Add new posts falied!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })

      .addCase(postsActions.getSingle.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postsActions.getSingle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.dataPosts = payload;
      })
      .addCase(postsActions.getSingle.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;
      })

      .addCase(postsActions.update.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postsActions.update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const prevDataAllPosts = state.dataAllPosts;

        const updatedPostsList = prevDataAllPosts.map((posts) => {
          if (posts.posts_id === payload.posts_id) {
            return payload;
          } else {
            return posts;
          }
        });

        state.dataAllPosts = updatedPostsList;
        toast.success("Update posts Success!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(postsActions.update.rejected, (state, { payload }) => {
        state.loading = true;
        state.error = payload;

        toast.error("Update posts falied!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  },
});

export const selectLoading = (state) => state.posts.loading;
export const selectSuccess = (state) => state.posts.success;
export const selectError = (state) => state.posts.error;
export const selectDataAllPosts = (state) => state.posts.dataAllPosts;
export const selectDataPosts = (state) => state.posts.dataPosts;

export default postSlice.reducer;
