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
      QuizService.createQuiz(quiz).then((data) => {
        commit("SET_QUIZZES", data);
      });
    },
  },
};
