import QuizService from "@/services/quiz.service";

export default {
  namespaced: true,
  state: {
    quizzes: [],
    quiz: {
      name: "",
      password: "",
      timer: null,
      categoryId: "",
    },
    isOpenModal: false,
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
    TOGGLE_QUIZ_MODAL(state) {
      state.isOpenModal = !state.isOpenModal;
    },
  },
  actions: {
    fetchQuizzes({ commit }) {
      return QuizService.getAllQuiz().then(
        (response) => {
          commit("SET_QUIZZES", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    fetchQuizById({ commit }, quizId) {
      return QuizService.getQuizById(quizId).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    fetchQuizByPassword({ commit }, password) {
      return QuizService.getQuizByPassword(password).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    addQuiz({ commit }, quiz) {
      return QuizService.createQuiz(quiz).then(
        ({ data }) => {
          // commit("SET_QUIZ", data);
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    updateQuizById({ commit }, { quizId, quiz }) {
      return QuizService.updateQuiz(quizId, quiz).then(
        ({ data }) => {
          commit("UPDATE_QUIZ", data);
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    updateSettingsByQuizId({ commit }, { quizId, settings }) {
      return QuizService.updateSettingsByQuizId(quizId, settings).then(
        ({ data }) => {
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    deleteQuiz({ commit }, quizId) {
      return QuizService.deleteQuiz(quizId).then(
        (response) => {
          commit("DELETE_QUIZ", quizId);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
  },
};
