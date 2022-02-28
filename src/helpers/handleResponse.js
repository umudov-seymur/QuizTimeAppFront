import AuthService from "@/services/auth.service";

export function handleResponse(response) {
  if ([401].indexOf(response.status) !== -1) {
    AuthService.logout();
    location.reload(true);

    const error = response.data && response.data.message;
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}
