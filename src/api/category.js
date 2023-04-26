import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;
const categoryApi = {
  getAll: async (status) => {
    try {
      const url = `${BASE_URL}/api/findallcategorybystatus/${status}`;
      const rs = await axiosClient.get(url);
      // console.log("rs test: ", rs)
      return rs.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  getById: async (id) => {
    try {
      const url = `${BASE_URL}/api/getcategorybyid/${id}`;
      const rs = await axiosClient.get(url, id);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  create: async (payload) => {
    try {
      const rs = await axiosClient.post(
        `${BASE_URL}/admin/createcategory`,
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
        `${BASE_URL}/admin/updatecategory`,
        payload
      );
      if (rs) {
        try {
          const url = `${BASE_URL}/api/getcategorybyid/${rs.data.categoryId}`;
          const rs2 = await axiosClient.get(url);
          return rs2.data;
        } catch (error) {
          console.log("error", error);
        }
      }

      // return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default categoryApi;
