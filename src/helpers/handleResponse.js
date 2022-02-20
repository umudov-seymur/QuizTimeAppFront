import AuthService from "@/api/auth.service";

export function handleResponse(response) {
  if ([401, 403].indexOf(response.status) !== -1) {
    AuthService.logout();
    location.reload(true);

    const error = response.data && response.data.message;
    return Promise.reject(error);
  }

  return Promise.resolve(response);
}
