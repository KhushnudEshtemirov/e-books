import axios from "axios";
import CryptoJS from "crypto-js";
import { baseUrl } from "../utils";
import { log } from "console";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(function (config) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const keys = Object.keys(config.data);
  const values = Object.values(config.data);
  console.log(Object.keys(userData));
  console.log(Object.values(userData));

  config.headers.Key =
    Object.keys(userData).length > 0 ? userData.data.key : "";
  config.headers.Sign =
    Object.keys(userData).length > 0
      ? CryptoJS.MD5(
          `${config.method?.toUpperCase()}${config.url}${
            keys.length > 0 ? config.data : ""
          }${userData.data.secret}`
        ).toString()
      : "";

  return config;
});

export default axios;
