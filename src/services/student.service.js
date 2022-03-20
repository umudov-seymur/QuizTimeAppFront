import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class StudentService {
  static getQuizByPassword(password) {
    return ApiClient.get(`/students/quizzes/${password}`).then(handleResponse);
  }

  static startQuizByPassword(password) {
    return ApiClient.post(`/students/quizzes/${password}/start`).then(handleResponse);
  }
}
