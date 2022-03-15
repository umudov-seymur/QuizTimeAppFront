import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class AnswerService {
  static addAnswersByQuestionId(questionId, answers) {
    return ApiClient.post(`questions/${questionId}/answers`, answers).catch(handleResponse);
  }
}
