import StudentService from "@/services/student.service";

export default {
  namespaced: true,
  state: {
    isStarted: false,
    quiz: {},
  },
  getters: {
    getQuiz(state) {
      return state.quiz;
    },
  },
  mutations: {
    SET_QUIZ(state, quiz) {
      state.quiz = quiz;
    },
  },
  actions: {
    fetchQuizByPassword({ commit }, password) {
      return StudentService.getQuizByPassword(password).then(
        (response) => {
          commit("SET_QUIZ", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },

    startQuiz({ commit }, password) {
      return StudentService.startQuizByPassword(password).then(
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
