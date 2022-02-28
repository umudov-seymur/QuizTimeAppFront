import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class AuthService {
  static login(credentials) {
    return ApiClient.post("/authenticate/login", credentials)
      .then(handleResponse)
      .then((response) => {
        if (response.data.token) {
          const userData = {
            ...response.data.user,
            accessToken: response.data.token,
          };

          localStorage.setItem("user", JSON.stringify(userData));

          return userData;
        }

        return response.data;
      });
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static register(user) {
    return ApiClient.post("/authenticate/register", user);
  }
}
