<script>
export default {
  name: "QuizPrint",
  data() {
    return {
      isShowAnswerKey: true,
      isShowAnswerOption: true,
      isShuffleQuestions: false,
      isShuffleAnswers: false,
      currentFont: "text-md",
      fontSizes: {
        "text-sm": "S",
        "text-md": "M",
        "text-lg": "L",
        "text-xl": "XL",
      },
      quiz: {},
    };
  },
  methods: {
    checkTypeIsInput(typeId) {
      return this.questionTypes.find((type) => type.id == typeId).isInput;
    },
    printQuiz() {
      window.print();
    },
  },
  computed: {
    questionTypes() {
      return this.$store.getters["question/getQuestionTypes"];
    },
    questions() {
      const questions = this.$store.getters["question/getQuestions"];

      if (this.isShuffleAnswers) {
        return JSON.parse(JSON.stringify(questions)).map((question) => {
          question.answers = question.answers.sort(() => 0.5 - Math.random());
          return question;
        });
      }

      return questions;
    },
    shuffledQuestions() {
      const allQuestions = [...this.questions];

      return this.isShuffleQuestions
        ? allQuestions.sort(() => 0.5 - Math.random())
        : this.questions;
    },
    answerKeys() {
      return this.shuffledQuestions.map((q) =>
        q.answers
          .map((x) => x.isRightAnswer)
          .map((isRight, i) => {
            return {
              key: String.fromCharCode(65 + i),
              isRight,
            };
          })
          .filter((x) => x.isRight == true)
      );
    },
  },
  created() {
    this.$store
      .dispatch("quiz/fetchQuizById", this.$route.params.id)
      .then((quiz) => (this.quiz = quiz));
  },
};
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-500"
    enter-class="opacity-0 transform translate-y-1/2"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-500"
    leave-class="opacity-100"
    leave-to-class="opacity-0 transform translate-y-1/2"
    appear
  >
    <div class="fixed inset-0 z-30 bg-gray-500 max-h-screen overflow-y-auto">
      <div
        class="font-semibold print:hidden flex justify-between text-sm items-center sticky top-0 left-0 w-full bg-purple-600 text-white px-6 py-6"
      >
        <div class="flex overflow-y-auto">
          <div class="grid grid-rows-2 pr-4 gap-4 border-r b-r-l-20">
            <div class="flex justify-between items-center gap-4 w-56">
              <div class="inline-block">
                <span>{{ $t("Answer key") }}</span>
              </div>
              <div>
                <toggle-button
                  v-model="isShowAnswerKey"
                  color="#00a06a"
                  :sync="true"
                  :labels="false"
                />
              </div>
            </div>
            <div class="flex justify-between items-center gap-4 w-56">
              <div class="inline-block">
                <span>{{ $t("Show answer options") }}</span>
              </div>
              <div>
                <toggle-button
                  v-model="isShowAnswerOption"
                  color="#00a06a"
                  :sync="true"
                  :labels="false"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-rows-2 gap-4 pr-4 mx-4 border-r b-r-l-20">
            <div class="flex justify-between items-center gap-4 w-56">
              <div class="inline-block">
                <span>{{ $t("Shuffle questions") }}</span>
              </div>
              <div>
                <toggle-button
                  v-model="isShuffleQuestions"
                  color="#00a06a"
                  :sync="true"
                  :labels="false"
                />
              </div>
            </div>
            <div class="flex justify-between items-center gap-4 w-56">
              <div class="inline-block">
                <span>{{ $t("Shuffle answers") }}</span>
              </div>
              <div>
                <toggle-button
                  v-model="isShuffleAnswers"
                  color="#00a06a"
                  :sync="true"
                  :labels="false"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-rows-1 gap-4 pr-4 mx-4">
            <div class="flex justify-between items-center gap-4 w-56">
              <div class="inline-block">
                <span>{{ $t("Font") }}</span>
              </div>
              <div
                class="flex flex-row items-center w-fit h-fit shadow-lg overflow-hidden p-0 rounded border border-purple-800"
              >
                <button
                  role="option"
                  v-for="([font, size], index) in Object.entries(fontSizes)"
                  :key="index"
                  @click="currentFont = font"
                  class="focus:outline-none h-10 w-10 text-md"
                  :class="{
                    'bg-purple-700': font != currentFont,
                    'bg-indigo-800': font == currentFont,
                  }"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex space-x-4">
          <button @click="printQuiz" class="print-btn">
            {{ $t("Print") }}
          </button>
          <button @click="$emit('closed')" class="close-btn">
            {{ $t("Close") }}
          </button>
        </div>
      </div>

      <div
        class="m-auto my-16 print:mt-0 bg-white print:w-full print-area"
        :class="[currentFont]"
      >
        <div class="p-12 print-pt-0">
          <div
            class="p-3 border border-gray-300 w-full flex flex-row justify-between h-32"
          >
            <div class="flex flex-col justify-between">
              <span
                class="font-extrabold text-2xl font-quicksand tracking-wider text-purple-500"
              >
                QuizTime
              </span>
              <div>
                <div class="text-4 leading-6 font-normal">
                  {{ quiz.category ? quiz.category.name : null }}
                </div>
                <div class="text-3 leading-4 font-normal text-dark-4">
                  {{ questions.length }} {{ $t("Question.Title") }}
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-around font-normal">
              <div class="flex justify-between">
                <div>
                  <span class="uppercase">{{ $t("Name") }}</span>
                </div>
                <div class="flex">
                  <span>&nbsp;:&nbsp;</span>
                  <div class="h-full border-b border-gray-300 w-64"></div>
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <span class="uppercase">{{ $t("Class") }}</span>
                </div>
                <div class="flex">
                  <span>&nbsp;:&nbsp;</span>
                  <div class="h-full border-b border-gray-300 w-64"></div>
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <span class="uppercase">{{ $t("Date") }}</span>
                </div>
                <div class="flex">
                  <span>&nbsp;:&nbsp;</span>
                  <div class="h-full border-b border-gray-300 w-64"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-b-a-always text-gray-700 p-12 pt-0">
          <div
            class="question-item p-b-i-avoid"
            v-for="(question, index) in shuffledQuestions"
            :key="question.id"
          >
            <div class="flex flex-row w-full my-4 mx-0">
              <span class="mr-6">{{ index + 1 }}.</span>

              <div class="flex flex-col w-full">
                <div class="flex flex-row">
                  <span>{{ question.title }}</span>
                </div>
                <!-- <div v-html="question.content"></div> -->
                <div
                  class="border-b w-full border-gray-300"
                  v-if="
                    !isShowAnswerOption &&
                    checkTypeIsInput(question.questionType)
                  "
                ></div>

                <div
                  v-if="!checkTypeIsInput(question.questionType)"
                  class="flex flex-col space-y-8 mt-8"
                >
                  <div
                    class="border-b w-full border-gray-300"
                    v-for="i in 5"
                    :key="i"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap w-full" v-if="isShowAnswerOption">
              <div
                class="flex py-2 w-6/12 items-center"
                v-for="(answer, i) in question.answers"
                :key="i"
              >
                <span
                  class="flex items-center justify-center border mr-6 text-gray-400 border-gray-300 bg-gray-50 w-6 h-6"
                  >{{ String.fromCharCode(65 + i) }}</span
                >
                <span class="w-option-text">{{ answer.content }}</span>
              </div>
            </div>
          </div>

          <div
            class="border p-b-f-always mt-8 border-gray-300"
            v-if="isShowAnswerKey"
          >
            <div class="m-4 font-bold">{{ $t("Answer key") }}</div>
            <div class="grid grid-cols-4 gap-4 m-4">
              <div
                class="flex items-center gap-1"
                v-for="(answers, i) in answerKeys"
                :key="i"
              >
                <span>{{ i + 1 }}.</span>
                <span>{{ answers.map((x) => x.key).join(", ") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.print-area {
  width: 820px;
}

.print-btn {
  @apply bg-white text-gray-700 shadow-xl rounded px-8 flex items-center py-2 font-semibold uppercase font-quicksand;

  &:focus {
    @apply outline-none shadow-outline-purple;
  }
}

.close-btn {
  @apply bg-purple-light text-white border border-2 border-purple-500 shadow-xl rounded px-8 flex items-center py-2 font-semibold uppercase font-quicksand;

  &:focus {
    @apply outline-none shadow-outline-purple;
  }
}

@media print {
  .print-area {
    width: 100%;
  }
  .p-b-i-avoid {
    break-inside: avoid;
  }
  .scroll-d-print {
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
  }
}

.p-b-a-always {
  page-break-after: always;
}
.p-b-f-always {
  page-break-before: always;
}
</style>
