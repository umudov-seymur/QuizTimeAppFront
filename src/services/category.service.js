import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class CategoryService {
  static getAllCategory() {
    return ApiClient.get("/categories").catch(handleResponse);
  }

  static getCategoryById(categoryId) {
    return ApiClient.get(`/categories/${categoryId}`).then(handleResponse);
  }

  static createCategory(category) {
    return ApiClient.post("/categories", category).then(handleResponse);
  }

  static updateCategory(category) {
    return ApiClient.put(`/categories/${category.id}`, category).then(
      handleResponse
    );
  }

  static deleteCategory(categoryId) {
    return ApiClient.delete(`/categories/${categoryId}`).then(handleResponse);
  }
}
