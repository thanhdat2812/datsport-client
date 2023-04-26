import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountApi from "../api/account";

export const createAccount = createAsyncThunk(
  "account/create",
  async (account) => {
    const data = await accountApi.createAccount(account);
    return data;
  }
);

export const getAccountByUsername = createAsyncThunk(
  "account/getByUsername",
  async (username) => {
    const data = await accountApi.getAccountByUsername(username);
    return data;
  }
);

export const updateAccountStatus = createAsyncThunk(
  "account/updateStatus",
  async (payload) => {
    const data = await accountApi.updateAccountStatus(payload);
    return data;
  }
);

export const listAccounts = createAsyncThunk("account/list", async () => {
  const data = await accountApi.listAccounts();
  return data;
});

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    currentAccount: null,
    status: "idle",
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    [createAccount.pending]: (state) => {
      state.status = "loading";
    },
    [createAccount.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.currentAccount = action.payload;
    },
    [createAccount.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getAccountByUsername.pending]: (state) => {
      state.status = "loading";
      state.loading = true;
      state.success = false;
    },
    [getAccountByUsername.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.currentAccount = action.payload;
      state.loading = false;
      state.success = true;
    },
    [getAccountByUsername.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },
    [updateAccountStatus.pending]: (state) => {
      state.status = "loading";
      state.success=false;
      state.loading=true;
    },
    [updateAccountStatus.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.currentAccount = action.payload;
      state.success=true;
      state.loading=false;
    },
    [updateAccountStatus.rejected]: (state, action) => {
      state.status = "failed";
      state.success=false;
      state.loading=false;
      state.error = action.error.message;
    },
    [listAccounts.pending]: (state) => {
      state.status = "loading";
    },
    [listAccounts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.accounts = action.payload;
      console.log("accounts", action.payload);
    },
    [listAccounts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const { resetSuccess} = accountSlice.actions;
export default accountSlice.reducer;
