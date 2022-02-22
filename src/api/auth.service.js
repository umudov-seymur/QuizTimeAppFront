import client from "@/api/client";
import { handleResponse } from "@/helpers/handleResponse";

class AuthService {
  login(credentials) {
    return client
      .post("/authenticate/login", credentials)
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

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return client.post("/authenticate/register", user);
  }
}

export default new AuthService();
