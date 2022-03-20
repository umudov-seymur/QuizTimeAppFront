<template>
  <div
    class="overflow-hidden bg-white rounded-xl shadow-lg"
  >
    <div
      class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-purple-600 to-purple-300"
    >
      <h3
        v-if="!isLoading"
        class="font-semibold text-xl text-white font-quicksand dark:text-gray-300"
      >
        {{ quiz.name }}
      </h3>

      <SkeletonLoader v-else class="w-48" :styles="['bg-purple-400']" />

      <div class="flex">
        <button
          @click="$emit('print')"
          class="focus:shadow-outline-indigo focus:outline-none mr-2 flex items-center justify-center w-8 h-8 text-sm font-semibold bg-purple-500 border border-purple-500 text-white hover:bg-purple-600 rounded-full white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <!-- <router-link :to="{ name: 'quizzes.print' }" v-if="!isLoading">
          </router-link> -->
          <DynamicIcon icon="print" v-if="!isLoading" class="w-5 h-5" />

          <SkeletonLoader
            v-else
            class="w-6 h-6"
            :styles="['rounded-full', 'bg-purple-lighten']"
          />
        </button>
        <button
          @click="removeQuiz"
          class="focus:shadow-outline-indigo focus:outline-none mr-2 flex items-center justify-center w-8 h-8 text-sm font-semibold bg-purple-500 border border-purple-500 text-white hover:bg-purple-600 rounded-full white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <DynamicIcon icon="trash" v-if="!isLoading" class="w-5 h-5" />

          <SkeletonLoader
            v-else
            class="w-6 h-6"
            :styles="['rounded-full', 'bg-purple-lighten']"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-col space-y-4 p-4">
      <QuizCard
        v-for="(card, index) in cards"
        :title="card.title"
        :content="card.content.toString()"
        :color="card.color"
        :icon="card.icon"
        :isLoading="isLoading"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import QuizCard from "@/components/pages/quiz/QuizCard";
import DynamicIcon from "@/components/shared/DynamicIcon.vue";

export default {
  name: "QuizDetail",
  props: {
    quiz: {
      type: Object,
      default: () => ({
        title : "",
        content : "",
        timer: ""
      })
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      cards: []
    };
  },
  methods: {
    setCards() {
      this.cards = [
        {
          title: this.$t("Quiz.Password"),
          content: `#${this.quiz.password}`,
          color: "orange",
          icon: "lock",
          loader: {
            class: ["w-6"],
            styles: ["bg-orange-300", "rounded-full"],
          },
        },
        {
          title: this.$t("Quiz.Timer"),
          content: `${this.quiz.timer} ${this.$t("Minute")}`,
          icon: "timer",
          color: "green",
          loader: {
            class: ["w-6"],
            styles: ["bg-green-300", "rounded-full"],
          },
        },
        {
          title: this.$t("Category"),
          content: this.quiz.category ? this.quiz.category.name : "",
          icon: "category",
          color: "indigo",
          loader: {
            class: ["w-6"],
            styles: ["bg-indigo-300", "rounded-full"],
          },
        },
        {
          title: "Total Score",
          content: this.totalScore,
          icon: "score",
          color: "teal",
          loader: {
            class: ["w-6"],
            styles: ["bg-teal-300", "rounded-full"],
          },
        },
      ];
    },
    removeQuiz() {
      this.confirmationDelete(() => {
        this.$store
          .dispatch("quiz/deleteQuiz", this.quiz.id)
          .then(() => {
            this.toastNotify(this.$t("Quiz deleted successfull"), "success");
            this.$router.push({ name: "quizzes" });
          })
          .catch((err) => {
            this.toastNotify(err.message, "error");
          });
      });
    },
  },
  computed: {
    questions() {
      return this.$store.getters["question/getQuestions"];
    },
    totalScore() {
      return this.questions.length > 0
        ? this.questions
            .map((question) => question.weight)
            .reduce((a, b) => a + b)
        : 0;
    },
  },
  watch: {
    totalScore(score) {
      if (this.cards.length > 0) {
        this.cards[this.cards.length - 1].content = score;
      }
    },
    quiz() {
      this.setCards();
    }
  },
  created() {
    this.setCards();
  },
  components: { SkeletonLoader, QuizCard, DynamicIcon },
};
</script>

<style lang="scss" scoped></style>