import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class QuizService {
  static getAllQuiz() {
    return ApiClient.get("/quizzes").catch(handleResponse);
  }

  static getQuizById(quizId) {
    return ApiClient.get(`/quizzes/${quizId}`).then(handleResponse);
  }

  static createQuiz(quiz) {
    return ApiClient.post("/quizzes", quiz).then(handleResponse);
  }

  static updateQuiz(quizId, quiz) {
    return ApiClient.put(`/quizzes/${quizId}`, quiz).then(handleResponse);
  }

  static deleteQuiz(quizId) {
    return ApiClient.delete(`/quizzes/${quizId}`).then(handleResponse);
  }
}
