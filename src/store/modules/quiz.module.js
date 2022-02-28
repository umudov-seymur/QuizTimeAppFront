import QuizService from "@/services/quiz.service";

export default {
  namespaced: true,
  state: {
    quizzes: [],
  },
  getters: {
    getQuizzes(state) {
      return state.quizzes;
    },
  },
  mutations: {
    SET_QUIZZES(state, quizzes) {
      state.quizzes = quizzes;
    },
    SET_QUIZ(state, quiz) {
      state.quizzes.unshift(quiz);
    },
    UPDATE_QUIZ(state, data) {
      const index = state.quizzes.findIndex((quiz) => quiz.id === data.id);
      state.quizzes.splice(index, 1, data);
    },
    DELETE_QUIZ(state, id) {
      const index = state.quizzes.findIndex((quiz) => quiz.id === id);
      state.quizzes.splice(index, 1);
    },
  },
  actions: {
    addQuiz({ commit }, quiz) {
      return QuizService.createQuiz(quiz).then(
        (response) => {
          commit("SET_QUIZZES", quiz);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
  },
};
