import axiosClient from "./axiosClient";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

const revenueApi = {
    fetchRevenueData : async function(year) {
    try {
      const response = await axiosClient.get(`${BASE_URL}/admin/getstatistical/${year}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

 
};

export default revenueApi;