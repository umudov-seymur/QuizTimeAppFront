import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class QuizService {
  static getAllCategory() {
    return ApiClient.get("/quizzes").catch(handleResponse);
  }

  static getCategoryById(categoryId) {
    return ApiClient.get(`/quizzes/${categoryId}`).then(handleResponse);
  }

  static createCategory(category) {
    return ApiClient.post("/quizzes", category).then(handleResponse);
  }

  static updateCategory(category) {
    return ApiClient.put(`/quizzes/${category.id}`, category).then(handleResponse);
  }

  static deleteCategory(categoryId) {
    return ApiClient.delete(`/quizzes/${categoryId}`).then(handleResponse);
  }
}
