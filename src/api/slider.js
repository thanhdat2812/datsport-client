import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;
const sliderApi = {
  getAll: async (status) => {
    try {
      const url = `${BASE_URL}/api/getallslider/${status}`;
      const rs = await axiosClient.get(url);
      // console.log("rs test: ", rs)
      return rs.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  getById: async (id) => {
    try {
      const url = `${BASE_URL}/api/slider/${id}`;
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  create: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_URL}/admin/createslider`,
        payload
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  update: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_URL}/admin/updateslider`,
        payload
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default sliderApi;
