// hooks.js
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch();
  return (
    useCallback((asyncThunk) => {
      return dispatch(asyncThunk).then(unwrapResult);
    }),
    [dispatch]
  );
};

export default useUnwrapAsyncThunk;
