import axios, {
    InternalAxiosRequestConfig,
    AxiosResponse,
  } from "axios";
  
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err) => {
      // if (err.response?.status === 401) {
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("user");
      // }
      return Promise.reject(err);
    }
  );
  
  export default api;