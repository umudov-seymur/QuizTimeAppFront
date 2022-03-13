<template>
  <div class="quiz-form">
    <FormInput
      rules="required|min:5|max:30"
      placeholder="ex: Programming Quiz "
      v-model.trim="quiz.name"
      :name="$t('Quiz.Name')"
    />

    <FormInput
      class="mt-4"
      type="text"
      rules="required|alpha_num|min:6|max:16"
      placeholder="***************"
      @input="filterQuizPassword"
      @keydown.space.prevent
      v-model.trim="quiz.password"
      :name="$t('Quiz.Password')"
    >
      <template #append>
        <button
          type="button"
          @click="setQuizPassword"
          class="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="transform transition-transform duration-500 ease-in-out"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
        </button>
      </template>
    </FormInput>

    <FormSelect
      class="mt-4"
      :name="$t('Category')"
      v-model="quiz.categoryId"
      rules="required"
      :items="categories"
    />

    <FormInput
      type="number"
      class="mt-4"
      rules="numeric|between:1,1440"
      :helperText="$t('If you do not want to set a time, leave it blank')"
      :placeholder="`ex: 60 ${$t('Minute')}`"
      min="1"
      v-model.number="quiz.timer"
      @input="($value) => (quiz.timer = parseInt($value) || null)"
      :name="$t('Quiz.Timer')"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormInput from "@/components/shared/FormInput";
import FormSelect from "@/components/shared/FormSelect";
import { genPassword } from "@/helpers/utils";

export default {
  name: "QuizForm",
  data() {
    return {
      quiz: {
        name: "",
        password: "",
        timer: null,
        categoryId: "",
      },
    };
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    setQuizPassword() {
      this.quiz.password = genPassword(6);
    },
    filterQuizPassword(value) {
      this.quiz.password = value.toString().replace(/\s/, "").toUpperCase();
    },
    saveQuiz() {
      this.$emit("saved", this.quiz);
    },
  },
  watch: {
    quiz : {
      handler(data) {
        this.$emit("input", data);
      },
      deep: true
    }
  },
  computed: {
    categories() {
      const categories = this.$store.getters["category/getCategories"];
      return categories.map((category) => {
        return {
          id: category.id,
          text: category.name,
        };
      });
    },
  },
  created() {
    this.setQuizPassword();
    this.fetchCategories();
  },
  components: { FormInput, FormSelect },
};
</script>

<style lang="scss" scoped></style>
