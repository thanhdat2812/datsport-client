import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchProductsApi,
  addToCartApi,
  updateCartItemQuantityApi,
  deleteCartItemApi,
  checkoutApi,
} from "../api/bill";

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await fetchProductsApi();
    return response;
  }
);

export const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  const response = await addToCartApi(payload);
  return response;
});

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (payload) => {
    const response = await updateCartItemQuantityApi(payload);
    return response;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (payload) => {
    const response = await deleteCartItemApi(payload);
    return response;
  }
);

// Checkout model
// {bill_id,
//   user_id,
//   bill_total,
//   bill_payment,
//   bill_address_ship,
//   bill_date,
//   bill_status}
export const checkout = createAsyncThunk("cart/checkout", async (payload) => {
  const response = await checkoutApi(payload);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartItems: [],
    status: "idle",
    loading:false,
    error: null,
    billTotal: 0,
    checkoutStatus:"",
    successBill:{},
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.cartItems = [...action.payload];
      state.status = "succeeded";
      state.products = action.payload;
      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addToCart.pending]: (state) => {
      state.status = "loading";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (
        !state.cartItems.some(
          (item) =>
            item.billdetailSize == action.payload.billdetailSize &&
            item.billdetailId == action.payload.billdetailId
        )
      ) {
        state.cartItems.push(action.payload);
      }

      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
        toast.success("Added to cart !", {
          position: toast.POSITION.TOP_RIGHT,
        });
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateCartItemQuantity.pending]: (state) => {
      state.status = "loading";
    },
    [updateCartItemQuantity.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const i = state.cartItems.findIndex(
        (x) => x.billdetailId === action.payload.billdetailId
      );
      state.cartItems[i] = action.payload;
      if (state.cartItems.length)
        state.billTotal = state.cartItems.reduce(
          (acc, product) =>
            acc + product.billdetailPrice * product.billdetailQuantity,
          0
        );
        toast.success("Update success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
    },
    [updateCartItemQuantity.rejected]: (state, action) => {
      state.status = "failed";

      state.error = action.error.message;
    },
    [deleteCartItem.pending]: (state) => {
      state.status = "loading";
    },
    [deleteCartItem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.cartItems = [...action.payload];
      state.billTotal = state.cartItems.reduce(
        (acc, product) =>
          acc + product.billdetailPrice * product.billdetailQuantity,
        0
      );
      toast.success("Deleted cart item !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [checkout.pending]: (state) => {
      state.status = "loading";
      state.loading=true;
    },
    [checkout.fulfilled]: (state, action) => {
      state.status = "succeded";
      state.successBill=action.payload;
      state.loading=false;
      toast.success("Order placed successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [checkout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading=false;
      toast.error("Something went wrong when placing order !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  },
});

export default cartSlice.reducer;
