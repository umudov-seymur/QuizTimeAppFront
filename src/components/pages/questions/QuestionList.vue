<template>
  <Container class="mb-auto">
    <div class="my-12 w-full">
      <div class="flex flex-col lg:flex-row items-start w-full">
        <div class="question-types lg:w-2/4 w-full">
          <p
            class="md:mb-6 mb-4 text-sm text-dark-2 bg-white py-3 border shadow rounded font-semibold text-center"
          >
            <span>or, Create a new question</span>
          </p>

          <QuestionTypes class="sticky top-0 z-10 shadow-lg" />
        
          <div v-if="!isLoading">
            <QuestionItem
              v-for="(question, index) in questions"
              :question="question"
              :key="question.id"
              :isShowAnswers="isShowAnswer"
            >
              <template #title>
                {{ $t("Question.Title") }} {{ index + 1 }}
              </template>
            </QuestionItem>
          </div>

          <div v-if="!isLoading && questions.length < 1">
            <div
              class="bg-yellow-200 shadow-lg rounded-lg py-4 px-6 mt-8 text-base text-yellow-700"
              role="alert"
            >
              Bu quiz'ə aid heç bir sual tapılmadı.
            </div>
          </div>

          <div v-if="isLoading">
            <QuestionLoader v-for="index in 3" :key="index" :isLoader="true" />
          </div>
        </div>

        <div
          class="ml-auto w-full lg:w-2/5 bg-white rounded-lg mt-8 lg:mt-0 shadow-xl border dark:bg-gray-800 sticky"
          :style="{
            top: '25px',
          }"
        >
          <div class="p-4 bg-gray-200">
            <div class="flex justify-between">
              <p class="text-dark-2 font-semibold text-lg max-w-70">
                Programming Quiz
              </p>
              <button
                class="w-6 h-6 bg-light-3 border border-solid border-dark-6 rounded flex items-center justify-center texst-dark-2 mb-3"
              >
                <i
                  class="flex items-center far fa-pen"
                  style="font-size: 9px"
                ></i>
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <div class="flex items-center space-x-1 text-sm text-purple-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-semibold">30 minutes</span>
              </div>
              <div class="flex items-center space-x-1 text-sm text-purple-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-semibold">30 minutes</span>
              </div>
            </div>
          </div>

          <div class="p-4">
            <p class="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </p>

            <button
              aria-label="Hide answers"
              @click="isShowAnswer = !isShowAnswer"
              class="flex items-center mt-3 justify-center px-3 py-1 text-xs font-semibold h-6 bg-light-3 border border-solid border-dark-6 text-dark-2 hover:bg-light-2 active:bg-light-1 rounded white min-w-max relative transition-colors duration-200 ease-in-out flex"
            >
              <span class="title">
                {{ isShowAnswer ? "Hide Answers" : "Show Answers" }} answers
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddQuestion />
  </Container>
</template>

<script>
import Container from "@/components/shared/Container";
import QuestionItem from "@/components/pages/questions/QuestionItem";
import QuestionTypes from "@/components/pages/questions/QuestionTypes";
import AddQuestion from "@/components/pages/questions/AddQuestion";
import QuestionLoader from "@/components/pages/questions/QuestionLoader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "QuestionList",
  data() {
    return {
      isOpenQuestionModal: false,
      isShowAnswer: true,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("question", ["fetchQuestionsByQuizId"]),
    toggleQuestionModal() {
      this.isOpenQuestionModal = !this.isOpenQuestionModal;
    },
  },
  computed: {
    ...mapGetters("question", {
      questions: "getQuestions",
    }),
  },
  created() {
    const quizId = this.$route.params.id;
    this.fetchQuestionsByQuizId(quizId).finally(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    });
  },
  components: {
    Container,
    QuestionItem,
    QuestionTypes,
    AddQuestion,
    QuestionLoader,
  },
  metaInfo() {
    return {
      title: this.$t("Question.List"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
