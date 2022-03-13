<template>
  <Modal :isOpen="isOpenQuizModal" @dismiss="toggleQuizModal">
    <template #header>
      <img
        class="w-10 h-10"
        :src="require('@/assets/images/quiz-icon.png')"
        alt=""
      />
      <span>{{ title }}</span>
    </template>

    <template #content>
      <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
        <form @submit.prevent="handleSubmit(saveQuiz)" autocomplete="off">
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
              :val="quiz.category ? quiz.category.id : null"
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

          <button type="submit" ref="submitQuiz" class="hidden"></button>
        </form>
      </ValidationObserver>
    </template>

    <template #footer>
      <Button
        @click="$refs.submitQuiz.click()"
        class="w-full lg:w-auto"
        :isLoading="isLoading"
      >
        <font-awesome-icon icon="fa-solid fa-save" v-if="!isLoading" />
        <span class="ml-2">{{ $t("Save") }}</span>
      </Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/shared/Modal";
import Button from "@/components/shared/Button";
import FormInput from "@/components/shared/FormInput";
import FormSelect from "@/components/shared/FormSelect";
import { genPassword } from "@/helpers/utils";
import { mapActions } from "vuex";

export default {
  name: "QuizModal",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    quiz: {
      type: Object,
      required: true
    },
  },
  computed: {
    isOpenQuizModal() {
      return this.$store.state.quiz.isOpenModal;
    },
    categories() {
      return this.$store.getters["category/getCategories"];
    },
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    setQuizPassword() {
      this.quiz.password = genPassword(6);
    },
    filterQuizPassword(value) {
      this.quiz.password = value.toString().replace(/\s/, "").toUpperCase();
    },
    toggleQuizModal() {
      this.$store.commit("quiz/TOGGLE_QUIZ_MODAL");
    },
    saveQuiz() {
      this.$emit('saved');
    },
  },
  created () {
    if(this.quiz.password == null) {
      this.setQuizPassword();
    }
    this.fetchCategories();
  },
  components: { FormInput, FormSelect, Button, Modal },
};
</script>
