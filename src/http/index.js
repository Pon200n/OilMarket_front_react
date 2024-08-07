import axios from "axios";

const $host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL_SERVER,
});
const $authHost = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL_SERVER,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("tokenLARA")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
