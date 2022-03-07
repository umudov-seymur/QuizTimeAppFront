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

  static updateOrderQuestions(quizId, questions) {
    const sortedQuestions = questions.map(({id}, order) => {
      return {
        id,
        order : ++order,
      };
    });

    return ApiClient.patch(`quizzes/${quizId}/questions/UpdateOrder`, sortedQuestions).catch(handleResponse);
  }

  static deleteQuestionByQuizId(quizId, questionId) {
    return ApiClient.delete(`quizzes/${quizId}/questions/${questionId}`).catch(handleResponse);
  }
}
