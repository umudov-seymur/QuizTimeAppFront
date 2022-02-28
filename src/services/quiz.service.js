import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class QuizService {
  static createQuiz(quiz) {
    return ApiClient.post("/quizzes", quiz).then(handleResponse);
  }
}
