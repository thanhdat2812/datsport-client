import { createAsyncThunk } from "@reduxjs/toolkit";
import sliderApi from "../api/slider";

export const sliderActions = {
  getAll: createAsyncThunk("slider/getAll", async (id) => {
    try {
      const rs = await sliderApi.getAll(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getSingle: createAsyncThunk("slider/getSingle", async (id) => {
    try {
      const rs = await sliderApi.getById(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("slider/create", async (data) => {
    try {
      const rs = await sliderApi.create(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("slider/delete", async () => {
    try {
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("slider/update", async (data) => {
    try {
      const rs = await sliderApi.update(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
};
