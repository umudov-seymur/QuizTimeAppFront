<template>
  <div>
    <div class="hidden relative lg:flex items-center md:mr-0">
      <input
        type="text"
        v-model="password"
        class="block p-2 text-sm form-input dark:text-gray-300 dark:bg-gray-700 focus:outline-none w-full dark:border-gray-600 focus:border-purple-400 focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        :placeholder="$t('Quiz.Password')"
      />
      <button
        @click="joinQuiz"
        class="flex cursor-pointer absolute inset-y-0 focus:outline-none right-0 items-center rounded-tr-sm rounded-br bg-purple-500 hover:bg-purple-400 text-white font-bold p-3"
      >
        {{ $t("Join") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizJoinInput",
  data() {
    return {
      password: "",
    };
  },
  methods: {
    joinQuiz() {
      if (!this.isValidPassword) return;
      window.location.href = `/quiz/join/${this.password}`;
    },
  },
  computed: {
    isValidPassword() {
      return this.password.trim().length > 0; 
    }
  },
};
</script>

<style lang="scss" scoped></style>
