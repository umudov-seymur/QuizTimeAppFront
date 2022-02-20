import Axios from "axios";
import { store } from "@/store/index";

const client = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const user = store.getters["auth/getCurrentUser"];

    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 && error.config) {
//       store.commit("auth/DESTROY_TOKEN", null, { root: true });
//       router.push({ name: "login" });
//     }
//     return Promise.reject(error);
//   }
// );

export default client;
