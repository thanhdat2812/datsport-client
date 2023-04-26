import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: '',
  reducers: {
    displayToast: (state, action) => {
      toast(action.payload.message, {
        type: action.payload.type,
      });
      return state;
    },
  },
});

export const { displayToast } = toastSlice.actions;
export default toastSlice.reducer;