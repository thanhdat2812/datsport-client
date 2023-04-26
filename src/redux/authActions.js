// authActions.js
import axios from "axios";
import authApi from "../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";


const BASE_URL = process.env.REACT_APP_API_URL;

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_,
    { rejectWithValue,getState }
  ) => {
    try {
      const { data } = getState().auth;
      const rs = await authApi.getDetails(data.userName);
      return rs.data;
    } catch (error) {

      //return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed");
      }
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    { id, userfullname, email, password, image, phone, gender, address },
    { rejectWithValue }
  ) => {
    try {
      const rs = await authApi.updateProfile({
        id,
        userfullname,
        email,
        image,
        password,
        phone,
        gender,
        address,
      });

      return rs.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    payload,
    { rejectWithValue }
  ) => {
    try {
      const rs = await authApi.changePassword(payload);
      if (rs.data != null) return rs.data;
      else return rejectWithValue(rs.message);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    payload,
    { rejectWithValue }
  ) => {
    try {
      const rs = await authApi.resetPassword(payload);
      if (rs.message === 'Send Mail Success') return rs.message;
      else return rejectWithValue(rs.message);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await authApi.login(payload);
      const dataUser = {
        ...rs.data
      };
      localStorage.setItem("auth_token", rs.data.token);
      localStorage.setItem("data_user", JSON.stringify(dataUser));
      return rs.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, email,userfullname, password, phone, gender, address },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${BASE_URL}/api/register`,
        { username, email,userfullname, password, phone, address, gender },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
