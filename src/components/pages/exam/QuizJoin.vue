<template>
  <CountDownTimer v-if="isStart" :isStart="isStart" @end="startQuiz" />

  <div class="join-section bg-purple-600 h-screen" v-else>
    <header
      class="py-6 mb-16 text-white relative z-50 bg-purple-600"
      style="box-shadow: 0 2px 4px 0 rgb(0 0 0 / 40%)"
    >
      <Container>
        <div class="flex justify-between items-center w-full">
          <div class="logo flex items-center">
            <router-link
              to="/"
              class="font-extrabold text-2xl text-white font-quicksand tracking-wider"
            >
              QuizTime
            </router-link>
          </div>

          <SkeletonLoader
            class="w-32 ml-1"
            v-if="isLoading"
            :styles="['bg-gray-200']"
          />

          <LanguageSwitcher v-else />
        </div>
      </Container>
    </header>

    <main class="relative z-50">
      <div
        class="mx-auto px-6 lg:px-0 shadow-2xl"
        style="width: 465px; max-width: 100%"
      >
        <div class="p-8 lg:p-16 bg-white rounded-xl shadow-2xl">
          <Alert
            type="yellow"
            :body="$t('This quiz does not exist or not active.')"
            v-if="Object.keys(error).length > 0 || !isActive"
            :isDismiss="false"
          />

          <div class="quiz-details" v-else>
            <div class="flex items-center justify-between mb-8">
              <h3 class="font-semibold text-lg" v-if="!isLoading">
                {{ quiz.name }}
              </h3>

              <SkeletonLoader
                class="w-32 ml-1"
                v-if="isLoading"
                :styles="['bg-gray-400']"
              />

              <Badge
                v-if="!isLoading"
                :text="`#${quiz.password}`"
                class="pl-4 pr-4 text-sm"
                color="indigo"
              />

              <SkeletonLoader
                class="w-24 ml-1"
                v-if="isLoading"
                :styles="['bg-indigo-500 rounded-full']"
              />
            </div>

            <div class="grid grid-rows-3 grid-flow-col gap-4" v-if="isLoading">
              <div
                class="row-span-1"
                v-for="i in 4"
                :key="i"
                :class="{
                  'col-span-2': i <= 2,
                  'col-span-1': i > 2,
                }"
              >
                <SkeletonLoader
                  class="w-full"
                  :styles="['bg-gray-400', 'h-8 py-4']"
                />
              </div>
            </div>

            <div class="flex flex-col space-y-3" v-if="!isLoading">
              <FormInput
                disabled="disabled"
                :value="getFullName"
                :name="$t('Fullname')"
              />

              <FormInput
                disabled="disabled"
                :value="quiz.category ? quiz.category.name : ' '"
                :name="$t('Category')"
              />

              <div class="flex space-x-4">
                <FormInput
                  disabled="disabled"
                  :value="`${quiz.questionsCount}`"
                  :name="$t('Questions Count')"
                />

                <FormInput
                  disabled="disabled"
                  :value="quizTimer"
                  :name="$t('Quiz.Timer')"
                />
              </div>
            </div>

            <hr class="my-6 border border-gray-100" />

            <Button
              :is-loading="isLoading || isStart"
              @click="isStart = true"
              class="rounded-t-md py-2 rounded-b-md w-full uppercase border-b-4 border-purple-700"
            >
              <svg
                v-if="!isLoading"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="ml-1">{{ $t("Start") }}</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import Alert from "@/components/shared/Alert";
import CountDownTimer from "./CountDownTimer";

export default {
  name: "QuizJoin",
  data() {
    return {
      quiz: {},
      error: {},
      isStart: false,
      isLoading: true,
      quizPassword: "",
    };
  },
  computed: {
    getFullName() {
      const currentUser = this.$store.getters["auth/getCurrentUser"];
      return `${currentUser.firstName} ${currentUser.lastName}`;
    },
    isActive() {
      return this.quiz.setting ? this.quiz.setting.isActive : true;
    },
    quizTimer() {
      return this.quiz.timer
        ? `${this.quiz.timer} ${this.$t("Minute")}`
        : this.$t("Indefinitely");
    },
  },
  methods: {
    startQuiz() {
      setTimeout(() => {
        this.$store.state.student.isStarted = true;
        this.goToExamPage();
      }, 1200);
    },
    getQuizByPassword() {
      this.$store
        .dispatch("quiz/fetchQuizByPassword", this.quizPassword)
        .then((quiz) => {
          this.quiz = quiz;
          if (quiz.startedAt != null) this.goToExamPage();
        })
        .catch((error) => (this.error = error))
        .finally(() => setTimeout(() => (this.isLoading = false), 1000));
    },
    goToExamPage() {
      this.$router.push({
        name: "exam",
        params: { quizPassword: this.quizPassword },
      });
    },
  },
  created() {
    this.quizPassword = this.$route.params.quizPassword.toUpperCase();
    this.getQuizByPassword();
  },
  metaInfo() {
    return {
      title: "Quiz Join",
    };
  },
  components: {
    Container,
    LanguageSwitcher,
    FormInput,
    Button,
    Badge,
    SkeletonLoader,
    Alert,
    CountDownTimer,
  },
};
</script>

<style lang="scss">
.join-section {
  &::before {
    content: "";
    z-index: 10;
    position: absolute;
    font-weight: 700;
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/images/background.png");
    opacity: 0.15;
  }
}
</style>
