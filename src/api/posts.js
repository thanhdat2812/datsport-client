import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;
const postsApi = {
  getAll: async (status) => {
    try {
      const url = `${BASE_URL}/api/getallpost/${status}`;
      const rs = await axiosClient.get(url);
      return rs.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  getById: async (id) => {
    try {
      const url = `${BASE_URL}/api/getPostById/${id}`;
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  create: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_URL}/admin/createpost`,
        payload
      );
      console.log("rs: ", rs)
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  update: async (payload) => {
    try {
      const rs = await axiosClient.put(
        `${BASE_URL}/admin/updatepost`,
        payload
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  searchByName: async (search) => {
    try {
      const url = `${BASE_URL}/api/searchbypostname/${search}`;
      const rs = await axiosClient.get(url);
      // console.log("rs test: ", rs)
      return rs.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default postsApi;
