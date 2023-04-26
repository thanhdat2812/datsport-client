import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import revenueApi from '../api/revenue';

export const fetchRevenueData = createAsyncThunk(
  'revenue/fetchRevenueData',
  async (year,{ rejectWithValue }) => {
    const response = await revenueApi.fetchRevenueData(year);
    if(response==null){
        return rejectWithValue('Fetch revenue failed');
    }
    return response;
  }
);


export const revenueSlice = createSlice({
  name: 'revenue',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default revenueSlice.reducer;