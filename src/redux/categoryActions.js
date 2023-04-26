import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../api/category";

export const categoryActions = {
  getAll: createAsyncThunk("category/getAll", async (id) => {
    try {
      const rs = await categoryApi.getAll(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getSingle: createAsyncThunk("category/getSingle", async (id) => {
    try {
      const rs = await categoryApi.getById(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("category/create", async (data) => {
    try {
      const rs = await categoryApi.create(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("category/delete", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("category/update", async (data) => {
    try {
      const rs = await categoryApi.update(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
};
