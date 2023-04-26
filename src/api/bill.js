import axiosClient from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const fetchProductsApi = async () => {
  const { id } = JSON.parse(localStorage.getItem("data_user")) ?? {};
  const response = await axiosClient.get(
    `${BASE_URL}/api/getdetailbillbyaccount/${id}/0`
    
  );
  return response.data;
};

export const addToCartApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/createbill`, {
    ...payload,
  });
  return response.data;
};

export const updateCartItemQuantityApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/createbill`, {
    ...payload,
  });
  return response.data;
};

export const checkoutApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/checkout`, payload);
  return response.data;
};

export const deleteCartItemApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/deleteproductfrombill`,payload);
  return response.data;
};

export const fetchOrdersApi = async ({accountId,status}) => {
  const response = await axiosClient.get(`${BASE_URL}/api/getallorderbyacount/${accountId}/${status}`);
  return response.data;
};

export const fetchOrderByIdApi = async ({billId}) => {
  const response = await axiosClient.get(`${BASE_URL}/api/getdetailbillbybillid/${billId}`);
  return response.data;
};

export const updateOrderApi = async (payload) => {
  const response = await axiosClient.post(`${BASE_URL}/api/checkout`, payload);
  return response.data;
};

export const fetchAllOrdersApi = async () => {
  const response = await axiosClient.get(`${BASE_URL}/admin/getallbill`);
  return response.data;
};