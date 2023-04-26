import { createAsyncThunk } from "@reduxjs/toolkit";
import brandApi from "../api/brand";

export const brandActions = {
  getAll: createAsyncThunk("brand/getAll", async (id) => {
    try {
      const rs = await brandApi.getAll(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getSingle: createAsyncThunk("brand/getSingle", async (id) => {
    try {
      const rs = await brandApi.getById(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("brand/create", async (data) => {
    try {
      const rs = await brandApi.create(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("brand/delete", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("brand/update", async (data) => {
    try {
      const rs = await brandApi.update(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
};