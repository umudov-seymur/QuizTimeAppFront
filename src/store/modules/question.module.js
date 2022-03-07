import QuestionService from "@/services/question.service";
import AnswerService from "@/services/answer.service";

export default {
  namespaced: true,
  state: {
    questions: [],
    questionTypes: [
      {
        id: 1,
        isInput: true,
        inputType: "checkbox",
        text: "Multiple Choice",
        icon: "fa-regular fa-check-square",
        class: ["bg-teal-500"],
      },
      {
        id: 2,
        isInput: true,
        inputType: "radio",
        text: "Single Choice",
        icon: "fa-regular fa-circle-check",
        class: ["bg-blue-500"],
      },
      {
        id: 3,
        isInput: false,
        text: "Open Ended",
        icon: "fa-solid fa-align-left",
        class: ["bg-yellow-400"],
      },
    ],
    isSortQuestions : false,
    selectedQuestionType: {},
  },
  getters: {
    getQuestions(state) {
      return state.questions;
    },
    getQuestionTypes(state) {
      return state.questionTypes;
    },
    getSelectedType(state) {
      return state.selectedQuestionType;
    },
    getIsSortQuestions(state) {
      return state.isSortQuestions;
    }
  },
  mutations: {
    SET_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    SET_QUESTION(state, { question, answers }) {
      question.answers = answers || [];
      state.questions.unshift(question);
    },
    SET_QUESTION_ANSWERS(state, questionId, answers) {
      let questionIndex = state.questions.findIndex(
        (question) => question.id == questionId
      );

      let question = state.questions[questionIndex];
      question.answers = answers;

      state.questions.splice(questionIndex, 1, questionIndex);
    },
    SET_QUESTION_TYPE(state, questionType) {
      state.selectedQuestionType = questionType;
    },
    setIsSortQuestions(state, status) {
      state.isSortQuestions = status;
    },
  },
  actions: {
    fetchQuestionsByQuizId({ commit }, quizId) {
      return QuestionService.getAllQuestionsByQuizId(quizId).then(
        (response) => {
          commit("SET_QUESTIONS", response.data);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    addQuestionByQuizId({ commit }, { quizId, question }) {
      return QuestionService.createQuestionByQuizId(quizId, question).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    updateOrderQuestions({commit}, {quizId, orderedQuestion}) {
      commit("SET_QUESTIONS", orderedQuestion);
      return QuestionService.updateOrderQuestions(quizId, orderedQuestion).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error.response.data);
        }
      );
    },
    async addAnswersByQuestion({ commit }, payload) {
      await AnswerService.addAnswersByQuestionId(payload.question.id, payload.answers);
      commit("SET_QUESTION", payload);
    },
  },
};
