import { createAsyncThunk } from "@reduxjs/toolkit";
import postsApi from "../api/posts";

export const postsActions = {
  getAll: createAsyncThunk("posts/getAll", async (id) => {
    try {
      const rs = await postsApi.getAll(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getSingle: createAsyncThunk("posts/getSingle", async (id) => {
    try {
      const rs = await postsApi.getById(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("posts/create", async (data) => {
    try {
      const rs = await postsApi.create(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("posts/delete", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("posts/update", async (data) => {
    try {
      const rs = await postsApi.update(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
};