<template>
  <Layout name="Default">
    <Container class="mb-auto">
      <div class="my-4 lg:my-12 w-full">
        <div class="flex flex-col-reverse lg:flex-row items-start w-full">
          <div class="lg:w-2/4 w-full">
            <div
              class="flex bg-purple-light p-3 shadow-xl border-b-2 border-purple-600 rounded-t-xl items-center justify-between animate__animated animate__fadeInUp animate__faster"
            >
              <div class="flex items-center text-white">
                <font-awesome-icon icon="fas-solid fa-plus" />
                <span class="ml-1">{{ $t("Question.Add") }}</span>
              </div>
              <div class="flex space-x-2">
                <button
                  class="flex items-center space-x-1 justify-center px-3 py-2 text-xs shadow-md border-purple-500 bg-purple-600 focus:shadow-outline-purple focus:outline-none text-white font-semibold h-8 rounded relative transition-colors duration-200 ease-in-out"
                >
                  <span class="uppercase">Sual sayı</span> :
                  {{ questions.length }}
                </button>

                <button
                  aria-label="Hide answers"
                  @click="isShowAnswer = !isShowAnswer"
                  class="flex items-center space-x-1 justify-center px-3 py-2 text-xs shadow-md border-purple-500 bg-purple-600 focus:shadow-outline-purple focus:outline-none text-white font-semibold h-8 rounded relative transition-colors duration-200 ease-in-out"
                >
                  <DynamicIcon
                    class="w-5 h-5"
                    icon="eye"
                    v-if="!isShowAnswer"
                  />
                  <DynamicIcon class="w-5 h-5" icon="eye-off" v-else />

                  <span class="title hidden lg:block uppercase">
                    {{ isShowAnswer ? $t("Hide Answers") : $t("Show Answers") }}
                  </span>
                </button>
              </div>
            </div>

            <QuestionTypes class="sticky top-0 z-10 rounded-t-none shadow-xl" />

            <div v-if="!isLoading">
              <draggable
                v-model="questions"
                v-bind="dragOptions"
                :disabled="!isSortQuestions"
                @start="drag = true"
                @end="drag = false"
              >
                <transition-group
                  enter-active-class="animate__animated animate__fadeInDown animate__fast"
                  leave-active-class="animate__animated animate__fadeOutRight animate__fast"
                >
                  <QuestionItem
                    v-for="(question, index) in questions"
                    :question="question"
                    @duplicateQuestion="duplicateQuestion"
                    @removeQuestion="removeQuestion(question.id)"
                    :key="question.id"
                    :isShowAnswers="isShowAnswer"
                  >
                    <template #title>
                      {{ $t("Question.Title") }} {{ index + 1 }}
                    </template>
                  </QuestionItem>
                </transition-group>
              </draggable>
            </div>

            <div v-if="!isLoading && questions.length < 1">
              <div
                class="bg-yellow-200 shadow-lg rounded-lg py-4 px-6 mt-8 text-base text-yellow-700"
                role="alert"
              >
                {{ $t("No data found for this quiz.") }}
              </div>
            </div>

            <div v-if="isLoading">
              <QuestionLoader
                v-for="index in 3"
                :key="index"
                :isLoader="true"
              />
            </div>
          </div>

          <div
            class="w-full lg:w-2/5 flex flex-col ml-auto mb-12 lg:mb-0 lg:sticky relative"
            :style="{
              top: '25px',
            }"
          >
            <QuizDetail :quiz="quiz" :isLoading="isLoading" @print="isPrint = true" />

            <div
              class="bg-white mt-6 shadow-lg border-2 border-gray-200 rounded-xl py-4"
            >
              <div class="flex flex-col space-y-4">
                <div class="flex justify-between items-center px-4">
                  <div class="inline-block">
                    <span class="font-semibold">
                      {{ $t("Shuffle questions") }}
                    </span>
                  </div>
                  <div>
                    <toggle-button
                      v-model="quizSetting.isShuffleQuestions"
                      @change="updateQuizSetting"
                      color="#00a06a"
                      :sync="true"
                      :labels="false"
                    />
                  </div>
                </div>
                <div
                  class="flex justify-between items-center px-4 pt-2 border-t"
                >
                  <div class="inline-block">
                    <span class="font-semibold">
                      {{ $t("Shuffle answers") }}</span
                    >
                  </div>
                  <div>
                    <toggle-button
                      v-model="quizSetting.isShuffleAnswers"
                      @change="updateQuizSetting"
                      color="#00a06a"
                      :sync="true"
                      :labels="false"
                    />
                  </div>
                </div>
                <div
                  class="flex justify-between items-center px-4 pt-2 border-t"
                >
                  <div class="inline-block">
                    <span class="font-semibold">{{ $t("Status") }}</span>
                  </div>
                  <div>
                    <toggle-button
                      v-model="quizSetting.isActive"
                      @change="updateQuizSetting"
                      color="#00a06a"
                      :sync="true"
                      :labels="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuizPrint v-if="isPrint" :quiz="quiz" @closed="isPrint = false" />
      <AddQuestion />
    </Container>
  </Layout>
</template>

<script>
import Layout from "@/components/shared/Layout";
import Container from "@/components/shared/Container";
import QuestionItem from "@/components/pages/questions/QuestionItem";
import QuestionTypes from "@/components/pages/questions/QuestionTypes";
import AddQuestion from "@/components/pages/questions/AddQuestion";
import QuestionLoader from "@/components/pages/questions/QuestionLoader";
import Draggable from "vuedraggable";
import QuizDetail from "@/components/pages/quiz/QuizDetail";
import DynamicIcon from "@/components/shared/DynamicIcon";
import QuizPrint from "@/components/pages/quiz/QuizPrint.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuestionList",
  order: 1,
  data() {
    return {
      isShowAnswer: true,
      quizSetting: {
        isActive: true,
        isShuffleQuestions: false,
        isShuffleAnswers: false,
      },
      isLoading: true,
      drag: false,
      isPrint: false,
      quizId: "",
      quiz: {},
    };
  },
  methods: {
    ...mapActions("question", [
      "addQuestionByQuizId",
      "fetchQuestionsByQuizId",
      "updateOrderQuestions",
      "deleteQuestionByQuizId",
    ]),
    duplicateQuestion(question) {
      this.addQuestionByQuizId({
        quizId: this.quizId,
        question: question,
        answers: question.answers,
      })
        .then(() => {
          this.toastNotify(this.$t("A copy has been successfully created"),  "success");
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        });
    },
    removeQuestion(questionId) {
      this.confirmationDelete(() => {
        this.deleteQuestionByQuizId({ quizId: this.quizId, questionId })
          .then(() => {
            this.toastNotify(this.$t("Question deleted successfull"), "success");
          })
          .catch((err) => {
            this.toastNotify(err.message, "error");
          });
      });
    },
    updateQuizSetting() {
      this.$store.dispatch("quiz/updateSettingsByQuizId", {
        quizId: this.quizId,
        settings : this.quizSetting,
      })
    },
  },
  computed: {
    ...mapGetters("question", {
      isSortQuestions: "getIsSortQuestions",
    }),
    questions: {
      get() {
        return this.$store.getters["question/getQuestions"];
      },
      set(orderedQuestion) {
        this.updateOrderQuestions({
          quizId: this.quizId,
          orderedQuestion,
        });
      },
    },
    dragOptions() {
      return {
        animation: 200,
        group: "questions",
        dragClass: "cursor-move",
        forceFallback: true,
        ghostClass: "ghost",
      };
    },
  },
  async created() {
    this.quizId = this.$route.params.id;

    this.quiz = await this.$store.dispatch("quiz/fetchQuizById", this.quizId);
    this.quizSetting = this.quiz.setting;

    this.fetchQuestionsByQuizId(this.quizId).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    });
  },
  components: {
    Layout,
    Container,
    QuestionItem,
    QuestionTypes,
    AddQuestion,
    QuestionLoader,
    Draggable,
    QuizDetail,
    DynamicIcon,
    QuizPrint,
  },
  metaInfo() {
    return {
      title: this.$t("Question.List"),
    };
  },
};
</script>

<style lang="scss" scoped></style>
