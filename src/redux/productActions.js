import { createAsyncThunk } from "@reduxjs/toolkit";

import productApi from "../api/product";

export const productActions = {
  getAll: createAsyncThunk("product/getAll", async (queryProduct) => {
    try {
      const rs = await productApi.getAll(queryProduct);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getHot: createAsyncThunk("product/getHot", async (id) => {
    try {
      const rs = await productApi.getHotProducts();
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  getProductByCategoryId: createAsyncThunk(
    "product/searchByCategoryId",
    async (id) => {
      try {
        const rs = await productApi.getProductByCategoryId(id);
        return rs;
      } catch (error) {
        console.log("error", error);
      }
    }
  ),

  getSingle: createAsyncThunk("product/getSingle", async (id) => {
    try {
      const rs = await productApi.getProductByProductId(id);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  create: createAsyncThunk("product/create", async (data) => {
    try {
      const rs = await productApi.createProduct(data);
      // console.log("rsData", rs);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: createAsyncThunk("product/delete", async (data) => {
    try {
      const rs = await productApi.delete(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
  update: createAsyncThunk("product/update", async (data) => {
    try {
      const rs = await productApi.updateProduct(data);
      return rs;
    } catch (error) {
      console.log("error", error);
    }
  }),
};
