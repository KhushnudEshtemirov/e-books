import axios from "axios";
import CryptoJS from "crypto-js";
import { baseUrl } from "../utils";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(function (config) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  console.log(JSON.parse(config.data));

  config.headers.Key = userData.data.key;
  config.headers.Sign = CryptoJS.MD5(
    `${config.method?.toUpperCase()}${JSON.parse(config.data)}${config.url}${
      userData.data.secret
    }`
  ).toString();
  console.log(config);

  return config;
});

export default axios;
