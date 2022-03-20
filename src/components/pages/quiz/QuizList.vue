<template>
  <Layout name="Default">
    <Container class="mb-auto">
      <div class="w-full pb-16 pt-8">
        <div class="w-full overflow-hidden rounded-lg shadow-xl">
          <div
            class="flex justify-between pl-4 text-sm font-semibold tracking-wide text-white uppercase border-b dark:border-gray-700 bg-purple-500 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
          >
            <span class="flex items-center col-span-3 font-quicksand">
              {{ $t("Quizzes") }}
            </span>

            <Button
              @click="createModal"
              class="uppercase"
              :colors="[
                'text-white',
                'bg-green-600',
                'hover:bg-green-700',
                'active:bg-green-600',
                'focus:shadow-outline-green',
                'py-3',
                'rounded-t-none rounded-b-none',
              ]"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
              <span class="ml-2 font-quicksand">{{ $t("Create") }}</span>
            </Button>
          </div>

          <div class="w-full overflow-x-auto">
            <TableLoader :rowCount="8" :size="5" v-if="isLoading" />

            <table class="w-full whitespace-no-wrap" v-else>
              <thead>
                <tr
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">{{ $t("Quiz.Name") }}</th>
                  <th class="px-4 py-3">{{ $t("Category") }}</th>
                  <th class="px-4 py-3">{{ $t("Quiz.Timer") }}</th>
                  <th class="px-4 py-3">{{ $t("Quiz.Password") }}</th>
                  <th class="px-4 py-3">{{ $t("Created At") }}</th>
                  <th class="px-4 py-3">{{ $t("Actions") }}</th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr v-if="quizzes.length <= 0">
                  <td colspan="6" class="text-center py-4">
                    {{ $t("Not Found Result") }}
                  </td>
                </tr>

                <QuizItem
                  v-for="quiz in quizzes"
                  :key="quiz.id"
                  :quiz="quiz"
                  @updated="updateModal"
                  @removed="removeQuiz"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <QuizModal
        v-if="$store.state.quiz.isOpenModal"
        :quiz="quiz"
        :title="modalTitle"
        :isLoading="isModalLoading"
        @saved="saveQuiz"
      />
    </Container>
  </Layout>
</template>

<script>
import Layout from "@/components/shared/Layout";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import TableLoader from "@/components/shared/TableLoader";
import QuizItem from "@/components/pages/quiz/QuizItem";
import QuizModal from "./QuizModal.vue";
import { deepCopy } from "@/helpers/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuizList",
  data() {
    return {
      isLoading: true,
      isModalLoading: false,
      mode: "",
      quiz: {},
    };
  },
  methods: {
    ...mapActions("quiz", ["fetchQuizzes", "deleteQuiz"]),
    createModal() {
      this.resetModal();
      this.mode = "Add";
      this.toggleModal();
    },
    updateModal(quiz) {
      this.mode = "Edit";
      this.quiz = deepCopy(quiz);
      this.toggleModal();
    },
    addQuiz() {
      this.$store
        .dispatch("quiz/addQuiz", this.quiz)
        .then((res) => {
          this.toastNotify(this.$t("Quiz saved successfull"), "success");
          this.toggleModal();
          this.$router.push({
            name: "quizzes.questions",
            params: { id: res.id },
          });
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        })
        .finally(() => (this.isModalLoading = false));
    },
    updateQuiz() {
      const { id: quizId, ...quiz } = this.quiz;

      delete quiz.category;

      this.$store
        .dispatch("quiz/updateQuizById", { quizId, quiz })
        .then(() => {
          this.toastNotify(this.$t("Quiz updated successfull"), "success");
          this.toggleModal();
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        })
        .finally(() => (this.isModalLoading = false));
    },
    saveQuiz() {
      this.isModalLoading = true;
      switch (this.mode) {
        case "Add":
          this.addQuiz();
          break;
        case "Edit":
          this.updateQuiz();
          break;
      }
    },
    removeQuiz(quizId) {
      this.confirmationDelete(() => {
        this.deleteQuiz(quizId)
          .then(() => {
            this.toastNotify(this.$t("Quiz deleted successfull"), "success");
          })
          .catch((err) => {
            this.toastNotify(err.message, "error");
          });
      });
    },
    resetModal() {
      this.isModalLoading = false;
      this.quiz = {
        name: "",
        password: null,
        timer: null,
        categoryId: "",
      };
    },
    toggleModal() {
      this.$store.commit("quiz/TOGGLE_QUIZ_MODAL");
    },
  },
  computed: {
    ...mapGetters("quiz", {
      quizzes: "getQuizzes",
    }),
    modalTitle() {
      return this.mode == "Add"
        ? this.$t("Add New Quiz")
        : this.$t("Edit Quiz");
    },
  },
  created() {
    this.resetModal();
    this.fetchQuizzes().then(() => {
      setTimeout(() => (this.isLoading = false), 1000);
    });
  },
  metaInfo() {
    return {
      title: this.$t("Quizzes"),
    };
  },
  components: {
    Layout,
    Container,
    Button,
    TableLoader,
    QuizItem,
    QuizModal,
  },
};
</script>

<style lang="scss" scoped>
tr:nth-child(even) {
  @apply bg-cool-gray-100;
}
</style>
