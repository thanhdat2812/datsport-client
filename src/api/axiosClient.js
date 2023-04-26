import axios from "axios";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({});

axiosClient.interceptors.request.use(
  async (config) => {
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // return config;

    const token = localStorage.getItem("auth_token");
    const newConfig = config;
    newConfig.headers = {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token ? `Bearer ${token}` : null,
    };
    return newConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
