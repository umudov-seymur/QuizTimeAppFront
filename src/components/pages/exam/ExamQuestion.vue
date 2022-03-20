<template>
  <div>
    <div class="flex justify-between items-center w-full">
      <div class="arrow-left">
        <button
          class="arrow-btn"
          :class="{
            disabled: question.questionIndex == 0,
          }"
          @click="prevQuestion"
        >
          <DynamicIcon class="w-5 h-5" icon="arrow-left" />
        </button>
      </div>
      <div class="flex flex-col justify-center items-center text-center">
        <span class="text-lg">
          {{ $t("Question.Title") }} {{ question.questionIndex + 1 }}
        </span>
        <div
          class="flex items-center mt-2 text-base text-indigo-900 font-semibold lowercase"
        >
          <span class="w-3 h-3 bg-indigo-900 rounded-full"></span>
          <div class="ml-2">Not answered</div>
        </div>
      </div>
      <div class="arrow-right">
        <button
          class="arrow-btn"
          :class="{
            disabled: question.questionIndex == quiz.questions.length - 1,
          }"
          @click="nextQuestion"
        >
          <DynamicIcon class="w-5 h-5" icon="arrow-right" />
        </button>
      </div>
    </div>
    <div class="mt-12 px-20 select-none">
      <div class="flex justify-between items-center">
        <h2 class="text-lg">
          {{ $t("Question.Title") }}: {{ question.title }}
        </h2>
        <div class="text-right text-md font-semibold text-gray-600">
          {{ question.weight }} pts
        </div>
      </div>

      <div class="pt-2" v-html="question.content"></div>

      <div class="mt-20">
        <div
          class="question-answers flex flex-col divide-y"
          v-if="questionType.isInput"
        >
          <label
            class="flex space-x-4 items-center cursor-pointer py-3"
            v-for="(answer, i) in question.answers"
            :key="i"
          >
            <input
              :type="questionType.inputType"
              v-model="answer.isRightAnswer"
              @change="setRightAnswer(i)"
              :value="true"
              name="answer"
              :class="{
                'form-checkbox': questionType.inputType == 'checkbox',
                'form-radio': questionType.inputType == 'radio',
              }"
              class="text-purple-600 cursor-pointer w-6 h-6 transition-all duration-100 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            />
            <span>{{ answer.content }}</span>
          </label>
        </div>

        <textarea
          v-else
          v-model="answerContent"
          class="block w-full mt-1 text-lg p-10 dark:text-gray-300 rounded-md shadow-md dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
          placeholder="Type your answer here..."
        ></textarea>
      </div>

      <Button
        class="mt-12 py-5 rounded-r-md rounded-l-md block shadow-sm transition-all duration-200 text-lg w-full focus:outline-none"
        :class="{
          'animate__animated animate__fadeIn bg-purple-500 text-white':
            isActiveSubmitBtn,
          'border border-gray-200 text-gray-400 pointer-events-none select-none':
            !isActiveSubmitBtn,
        }"
        :colors="['bg-white']"
        @click="submitAnswer"
      >
        {{ $t("Submit") }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/shared/Button";
import { mapGetters } from "vuex";
import DynamicIcon from "@/components//shared/DynamicIcon";

export default {
  name: "ExamQuestion",
  data() {
    return {
      question: {},
      answerContent: "",
      choicedAnswers: [],
    };
  },
  watch: {
    "$route.params.questionId"(questionId) {
      this.loadQuestionById(questionId);
    },
  },
  computed: {
    ...mapGetters("student", {
      quiz: "getQuiz",
    }),
    ...mapGetters("question", {
      types: "getQuestionTypes",
    }),
    questionType() {
      const typeId = this.question.questionType;
      return this.types.find((type) => type.id == typeId);
    },
    isActiveSubmitBtn() {
      return this.question.answers.length > 0
        ? this.question.answers.some((answer) => answer.isRightAnswer == true)
        : this.answerContent.trim().length > 0;
    },
  },
  methods: {
    submitAnswer() {
      const { answers } = this.question;
      console.log(answers.filter((answer) => answer.isRightAnswer == true));
    },
    setRightAnswer(index) {
      
      if (this.questionType.inputType == "radio") {
        this.question.answers.map((answer) => (answer.isRightAnswer = false));
        this.question.answers[index].isRightAnswer = true;
      }
    },
    nextQuestion() {
      this.goQuestionByIndex(this.question.questionIndex + 1);
    },
    prevQuestion() {
      this.goQuestionByIndex(this.question.questionIndex - 1);
    },
    goQuestionByIndex(index) {
      const questionId = this.quiz.questions[index].id;

      this.$router.push({
        name: "exam.question",
        params: { questionId },
      });
    },
    loadQuestionById(questionId) {
      const questionIndex = this.quiz.questions.findIndex(
        (question) => question.id == questionId
      );
      var question = this.quiz.questions[questionIndex];
      question.isVisited = true;

      this.question = {
        ...this.quiz.questions[questionIndex],
        questionIndex: questionIndex,
      };
    },
  },
  created() {
    this.loadQuestionById(this.$route.params.questionId);
  },
  metaInfo() {
    return {
      title: this.quiz.password,
    };
  },
  components: {
    Button,
    DynamicIcon,
  },
};
</script>

<style lang="scss" scoped>
.arrow-btn {
  @apply p-2 transition-all duration-300 rounded-md text-purple-700;

  &.disabled {
    @apply text-gray-400 cursor-not-allowed pointer-events-none;
  }

  &:hover {
    @apply bg-gray-200;
  }

  &:focus {
    @apply outline-none;
  }
}
</style>
