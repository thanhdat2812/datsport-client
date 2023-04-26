import axiosClient from "./axiosClient";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

const accountApi = {
  createAccount: async function(account) {
    try {
      const response = await axiosClient.post(`${BASE_URL}/api/register`, account);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getAccountByUsername: async function(username) {
    try {
      const response = await axiosClient.post(`${BASE_URL}/api/findaccountbyusername`,{username});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateAccountStatus: async function(payload) {
    try {
      const response = await axiosClient.post(`${BASE_URL}/admin/updatestatusaccount`, payload);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  listAccounts: async function() {
    try {
      const response = await axiosClient.get(`${BASE_URL}/admin/listaccount`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default accountApi;