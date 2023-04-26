import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrdersApi, fetchOrderByIdApi,updateOrderApi,fetchAllOrdersApi } from '../api/bill';
import { toast } from "react-toastify";

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (payload) => {
  const orders = await fetchOrdersApi(payload);
  return orders;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId) => {
  const order = await fetchOrderByIdApi(orderId);
  return order;
});


export const updateOrder = createAsyncThunk('orders/updateOrder', async (payload) => {
  const order = await updateOrderApi(payload);
  return order;
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (orderId) => {
  const order = await fetchAllOrdersApi(orderId);
  return order;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    billDetails:[],
    selectedOrder: {},
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = [...action.payload];
        console.log(action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.selectedOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.billDetails = action.payload;
        state.selectedOrder=action.payload[0].bill;
        console.log(action.payload[0].bill);
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(updateOrder.pending, (state) => {
        
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        toast.success("Success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(action.payload);
      })
      .addCase(updateOrder.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = [...action.payload];
        console.log(action.payload);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});

export const { selectOrder } = ordersSlice.actions;

export default ordersSlice.reducer;