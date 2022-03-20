import ResultService from "@/services/result.service";

export default {
  namespaced: true,
  state: {
    results: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addResultByQuizId({ commit }, quizId) {
      return ResultService.createResultByQuizId(quizId).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
  },
};
