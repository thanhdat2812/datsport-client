import axiosClient from './axiosClient';
const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const brandApi = {
  getAll: async (status) => {
    const url = `${BASE_URL}/api/getallbrandbystatus/${status}`;
    try {
      const rs = await axiosClient.get(url, status);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  getById: async (id) => {
    try {
      const rs = await axiosClient.get(
        `${BASE_URL}/api/getbrandbyid/${id}`,
      );
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  create: async (payload) => {
    const url = `${BASE_URL}/admin/createbrand`;
    try {
      const rs = await axiosClient.post(url, payload);
      return rs.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  update: async (payload) => {
    const url = `${BASE_URL}/admin/updatebrand`;
    try {
      const rs = await axiosClient.post(url, payload);
      if(rs) {
        try {
          const rs2 = await axiosClient.get(
            `${BASE_URL}/api/getbrandbyid/${rs.data.brand_id}`,
          );
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

export default brandApi;
