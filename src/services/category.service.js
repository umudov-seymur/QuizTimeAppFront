import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class CategoryService {
  static getAllCategory() {
    return ApiClient.get("/categories").then(handleResponse);
  }
}
