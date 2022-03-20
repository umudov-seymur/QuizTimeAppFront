import ApiClient from "@/helpers/httpClient";
import { handleResponse } from "@/helpers/handleResponse";

export default class ResultService {
  static createResultByQuizId(quizId) {
    return ApiClient.post("/results", {
      quizId,
    }).then(handleResponse);
  }
}
