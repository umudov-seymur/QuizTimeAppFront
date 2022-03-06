<template>
  <Container class="mb-auto">
    <div
      class="w-full mt-16 px-4 py-3 mb-8 border-t-8 border-purple-700 bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div class="mb-6 flex">
        <img
          class="w-12 h-12"
          :src="require('@/assets/images/quiz-icon.png')"
          alt=""
        />

        <div class="ml-3">
          <h2
            class="text-xl capitalize font-semibold text-gray-700 dark:text-gray-200"
          >
            {{ $t("Add New Quiz") }}
          </h2>
          <small class="text-gray-600">Formu doldurun ....</small>
        </div>
      </div>

      <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
        <form @submit.prevent="handleSubmit(saveQuiz)" autocomplete="off">
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
            helperText="Əgər vaxtın təyin olunmasını istəmirsinizsə boş buraxın"
            placeholder="ex: 60 dəqiqə"
            min="1"
            v-model.number="quiz.timer"
            @input="($value) => (quiz.timer = parseInt($value) || null)"
            :name="$t('Quiz.Timer')"
          >
          </FormInput>

          <div class="flex space-x-2 mt-2">
            <router-link :to="{ name: 'quizzes' }" custom v-slot="{ navigate }">
              <Button
                type="button"
                @click="navigate"
                class="mt-4 space-x-1"
                :colors="[
                  'text-dark',
                  'bg-gray-300',
                  'hover:bg-gray-400',
                  'active:bg-gray-500',
                  'focus:shadow-outline-gray',
                ]"
              >
                <font-awesome-icon icon="fa-solid fa-close" />
                <span>{{ $t("Close") }}</span>
              </Button>
            </router-link>

            <Button
              class="mt-4"
              :class="{ 'space-x-1': !isLoading }"
              :isLoading="isLoading"
            >
              <font-awesome-icon icon="fa-solid fa-save" v-if="!isLoading" />
              <span>{{ $t("Save") }}</span>
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/shared/Container.vue";
import FormInput from "@/components/shared/FormInput";
import FormSelect from "@/components/shared/FormSelect.vue";
import Button from "@/components/shared/Button";
import { genPassword } from "@/helpers/utils";
import { mapActions } from "vuex";

export default {
  name: "AddQuiz",
  data() {
    return {
      isLoading: false,
      quiz: {
        name: "",
        password: "",
        timer: null,
        categoryId: "",
      },
    };
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
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    setQuizPassword() {
      this.quiz.password = genPassword(6);
    },
    filterQuizPassword(value) {
      this.quiz.password = value.toString().replace(/\s/, "").toUpperCase();
    },
    saveQuiz() {
      this.isLoading = true;

      this.$store
        .dispatch("quiz/addQuiz", this.quiz)
        .then((res) => {
          this.toastNotify(res.message, "success");
          this.$router.push({ name: "quizzes.questions", params : {id : res.id} });
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.setQuizPassword();
    this.fetchCategories();
  },
  metaInfo() {
    return {
      title: this.$t("Add New Quiz"),
    };
  },
  components: { Container, Button, FormInput, FormSelect },
};
</script>
