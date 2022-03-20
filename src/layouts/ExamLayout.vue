<template>
  <div class="flex h-screen bg-gray-100" v-if="!isLoading">
    <aside
      class="z-20 flex-shrink-0 hidden overflow-y-auto bg-white shadow border-r md:block"
      style="width: 360px"
    >
      <div class="text-gray-700 dark:text-gray-400">
        <div class="flex justify-between items-center py-4 px-4 bg-purple-500">
          <div class="logo">
            <a
              class="font-extrabold text-2xl font-quicksand text-purple-600 tracking-wider"
              href="#"
            >
              <img src="/favicon.png" alt="" />
            </a>
          </div>
          <div
            class="timer bg-purple-light text-white shadow-sm font-semibold rounded-full py-2 px-6"
          >
            <div class="flex space-x-2">
              <div class="icon mr-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <countdown :time="time" @end="endQuiz">
                <template slot-scope="props">
                  <div class="flex items-center lowercase space-x-2">
                    <span v-if="props.hours != 0"
                      >{{ props.hours }} {{ $t("Timer.Hours") }}</span
                    >
                    <span>{{ props.minutes }} {{ $t("Timer.Minutes") }}</span>
                    <span v-if="props.hours == 0"
                      >{{ props.seconds }} {{ $t("Timer.Seconds") }}</span
                    >
                  </div>
                </template>
              </countdown>
            </div>
          </div>
          <avatar :username="getFullName" class="cursor-pointer" :size="35" />
        </div>
        <div class="flex font-semibold px-4 mt-6">
          <div class="flex flex-col space-y-2 w-full">
            <div class="flex justify-between">
              <span>{{ quiz.name }}</span>
            </div>
            <div class="text-gray-500">
              0/{{ quiz.questions.length }} answered
            </div>
          </div>
          <div class="text-gray-500 ml-auto w-64 text-right mt-auto">
            3/{{ quiz.totalPoint }} points
          </div>
        </div>
        <ul class="mt-3 select-none">
          <router-link
            :to="{
              name: 'exam.question',
              params: { questionId: question.id },
            }"
            ref="questionLink"
            custom
            v-for="(question, i) in quiz.questions"
            :key="question.id"
            v-slot="{ href, navigate, isActive }"
          >
            <li
              class="relative px-2 pr-4 py-3"
              :class="{
                'bg-indigo-100 font-semibold': isActive,
                'font-semibold': question.isVisited,
                'font-bold': !isActive && !question.isVisited,
              }"
            >
              <a
                class="flex items-center w-full text-base transition-colors duration-150 hover:text-gray-800"
                :href="href"
                @click="navigate"
              >
                <div class="flex items-center space-x-2">
                  <div class="w-8 flex items-center justify-center">
                    <span
                      class="w-2 h-2 bg-indigo-900 rounded-full"
                      v-if="i != 3 && i != 5"
                    ></span>
                    <svg
                      v-if="i == 3"
                      class="w-5"
                      focusable="false"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <title>correct</title>
                      <g fill="none" fill-rule="evenodd">
                        <path d="M-2-2h24v24H-2z"></path>
                        <path
                          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0z"
                          fill="#6DDC72"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M8 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6z"
                        ></path>
                      </g>
                    </svg>
                    <svg
                      v-if="i == 5"
                      class="w-5"
                      focusable="false"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <title>wrong</title>
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M10 0C4.47 0 0 4.47 0 10s4.47 10 10 10 10-4.47 10-10S15.53 0 10 0z"
                          fill="#FF5252"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M15 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <span>{{ i + 1 }}.</span>
                </div>
                <div class="ml-2">
                  <span>{{ $t("Question.Title") }}: {{ question.title }}</span>
                </div>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </aside>

    <div class="flex flex-col flex-1">
      <main class="h-full pb-16 overflow-y-auto">
        <Container>
          <div class="w-full mt-12">
            <router-view></router-view>
          </div>
        </Container>
      </main>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import Container from "@/components/shared/Container";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExamLayout",
  data() {
    return {
      quizPassword: "",
      isLoading: true,
      time: null,
    };
  },
  computed: {
    ...mapGetters("student", {
      quiz: "getQuiz",
    }),
    getFullName() {
      const currentUser = this.$store.getters["auth/getCurrentUser"];
      return `${currentUser.firstName} ${currentUser.lastName}`;
    },
  },
  methods: {
    ...mapActions("student", ["startQuiz"]),
    fetchQuizByPassword() {
      return this.$store
        .dispatch("student/fetchQuizByPassword", this.quizPassword)
        .then((quiz) => {
          const quizStartedAt = this.$moment(new Date(quiz.startedAt))
            .add(quiz.timer, "m")
            .toDate();

          this.time = quizStartedAt - new Date();
          this.isLoading = false;
          this.$store.state.student.isStarted = true;

          if (!this.$route.params.questionId) {
            this.$router.push({
              name: "exam.question",
              params: { questionId: quiz.questions[0].id },
            });
          }
        })
        .catch(() => {
          window.location.href = `/quiz/join/${this.quizPassword}`;
        });
    },
    endQuiz() {
      console.log("ended");
    },
  },
  created() {
    this.quizPassword = this.$route.params.quizPassword.toUpperCase();

    if (this.$store.state.student.isStarted) {
      this.startQuiz(this.quizPassword).finally(() => {
        this.fetchQuizByPassword();
      });
    } else {
      this.fetchQuizByPassword();
    }
  },
  components: {
    Avatar,
    Container,
  },
};
</script>
