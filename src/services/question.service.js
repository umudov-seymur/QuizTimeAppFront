import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class QuestionService {
  static getAllQuestionsByQuizId(quizId) {
    return ApiClient.get(`quizzes/${quizId}/questions`).catch(handleResponse);
  }
  
  static createQuestionByQuizId(quizId, question) {
    return ApiClient.post(`quizzes/${quizId}/questions`, question).catch(
      handleResponse
    );
  }
}
