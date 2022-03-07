<template>
  <div
    class="flex flex-col mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white question-details-card my-2"
    :class="{
      'cursor-move' : isSortQuestions
    }"
  >
    <div class="p-2 bg-gray-50 flex items-center justify-between">
      <div class="flex items-center">
        <button
          @click="toggleSortQuestions"
          class="focus:shadow-outline-purple cursor-move focus:outline-none w-8 h-8 mr-2 drag-button text-gray-600 hover:bg-gray-200 rounded has-tooltip"
        >
          <font-awesome-icon icon="fa-solid fa-sort" />
        </button>

        <span
          :class="questionType.class"
          class="mr-2 question-type-icon relative flex items-center justify-center w-6 h-6 text-white rounded-sm"
        >
          <font-awesome-icon :icon="questionType.icon" />
        </span>

        <span class="text-sm text-gray-600">
          <slot name="title" />
        </span>
      </div>
      <div class="flex">
        <button
          class="focus:shadow-outline-purple focus:outline-none mr-2 flex items-center justify-center px-4 py-1 text-sm font-semibold h-auto bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
          <span class="ml-1">Edit</span>
        </button>
        <button
          class="focus:shadow-outline-purple focus:outline-none mr-2 flex items-center justify-center w-8 h-8 text-sm font-semibold bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          @click="$emit('removeQuestion', question.id)"
          class="focus:shadow-outline-purple focus:outline-none mr-2 flex items-center justify-center w-8 h-8 text-sm font-semibold bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="p-4 shadow-sm">
      <div
        class="flex space-x-1 items-center text-sm overflow-hidden text-dark-2"
        :class="{
          'mb-4': showAnswers,
        }"
      >
        <span>Q.</span>
        <span>{{ question.title }}</span>
      </div>
      <div class="relative bg-gray-200 mb-4 h-px" v-if="showAnswers">
        <span
          class="absolute px-2 text-sm ml-4 -translate-y-1/2 transform text-gray-500 bg-gray-100"
        >
          {{ $t('Answer choices') }}
        </span>
      </div>
      <div class="flex flex-wrap" v-if="showAnswers">
        <div
          class="mb-2 flex items-center w-1/2"
          v-for="(answer, index) in question.answers"
          :key="index"
        >
          <span
            class="w-4 h-4 rounded-full my-1 mr-2 relative flex-shrink-0"
            :class="{
              'bg-green-500': isShowAnswers && answer.isRightAnswer,
              'bg-red-500': isShowAnswers && !answer.isRightAnswer,
              'bg-gray-300': !isShowAnswers,
            }"
          >
          </span>
          <span class="text-sm text-dark-2">{{ answer.content }}</span>
        </div>
      </div>
    </div>

    <!-- <div class="px-4 py-3 bg-gray-100 flex items-center space-x-1 text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
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

      <span class="text-sm">30 BAL</span>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "QuestionItem",
  props: {
    isShowAnswers: {
      type: Boolean,
      default: true,
    },
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("question", {
      setIsSortQuestions: "setIsSortQuestions",
    }),
    toggleSortQuestions() {
      this.setIsSortQuestions(!this.isSortQuestions);
    }
  },
  computed: {
    ...mapGetters("question", {
      types: "getQuestionTypes",
      isSortQuestions: "getIsSortQuestions",
    }),
    questionType() {
      const typeId = this.question.questionType;
      const currentType = this.types.find((type) => type.id == typeId);

      return {
        icon: currentType.icon,
        class: currentType.class,
      };
    },
    showAnswers() {
      return (this.question.answers.length > 0 && !this.isSortQuestions) || !this.isSortQuestions;
    },
  },
};
</script>
