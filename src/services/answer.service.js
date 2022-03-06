import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class AnswerService {
  static async addAnswersByQuestionId(questionId, answers) {
    return await ApiClient.post(`questions/${questionId}/answers`, answers).catch(handleResponse);
  }
}
