<template>
  <Modal :isOpen="questionType.id ? true : false" @dismiss="closeModal">
    <template #header>
      <font-awesome-icon icon="fa-solid fa-plus" />
      <span>{{ $t("Question.Add") }}</span>
    </template>

    <template #content>
      <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
        <form @submit.prevent="handleSubmit(saveQuestion)" autocomplete="off">
          <QuestionTypes
            class="border mb-4 shadow"
            :show-active-choice="true"
          />

          <div class="flex justify-between">
            <FormInput
              class="mb-4 w-full"
              rules="required|min:10|max:200"
              placeholder="ex: What Is C#? "
              v-model.trim="question.title"
              :name="$t('Question.Title')"
            />

            <FormInput
              class="ml-4"
              type="number"
              rules="required|between:0,100"
              step="0.1"
              placeholder="ex: 10"
              v-model.number="question.weight"
              :name="$t('Question.Weight')"
            />
          </div>

          <vue-editor
            class="quiz-content-editor"
            v-model="question.content"
            :editorToolbar="questionEditorToolbar"
          />

          <div class="relative bg-gray-200 mt-8 mb-5 h-px">
            <span
              class="absolute px-2 text-sm uppercase ml-4 -translate-y-1/2 transform text-gray-600 shadow py-1 bg-gray-100"
            >
              {{ $t("Answers") }}
            </span>
          </div>

          <div v-if="questionType.isInput">
            <transition-group
              enter-active-class="animate__animated animate__fadeInUp animate__fast"
              leave-active-class="animate__animated animate__fadeOutUp animate__fast"
              mode="out-in"
            >
              <div
                class="flex flex-col space-y-3 text-sm pl-1"
                v-for="(answer, k) in answers"
                :key="k + 1"
              >
                <div class="flex w-full items-center space-x-3 mt-2">
                  <input
                    :type="questionType.inputType"
                    name="answer"
                    :value="true"
                    @change="setRightAnswer(k)"
                    v-model="answer.isRightAnswer"
                    :class="{
                      'form-checkbox': questionType.inputType == 'checkbox',
                      'form-radio': questionType.inputType == 'radio',
                    }"
                    class="text-purple-600 cursor-pointer w-8 h-8 transition-all duration-100 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  />

                  <FormInput
                    class="w-full"
                    :placeholder="`ex: ${$t('Answer')} ${k + 1} .....`"
                    rules="required"
                    v-model.trim="answer.content"
                  />

                  <button
                    type="button"
                    @click="removeAnswer(k)"
                    class="rounded-full focus:outline-none"
                    v-if="k || (!k && answerCount > 1)"
                  >
                    <font-awesome-icon
                      icon="`fa-solid fa-circle-minus"
                      class="w-10 h-10 text-red-500"
                    />
                  </button>

                  <button
                    type="button"
                    @click="addAnswer"
                    class="rounded-full focus:outline-none"
                    v-if="k == answerCount - 1"
                  >
                    <font-awesome-icon
                      icon="`fa-solid fa-circle-plus"
                      class="w-10 h-10 text-green-500"
                    />
                  </button>
                </div>
              </div>
            </transition-group>
          </div>

          <div v-else>
            <div
              class="bg-yellow-200 shadow-lg rounded-lg py-4 px-6 mt-8 text-base text-yellow-700"
              role="alert"
            >
              {{
                $t(
                  "Students will be able to freely enter text to answer this question."
                )
              }}
            </div>
          </div>

          <button type="submit" ref="submitQuestion" class="hidden"></button>
        </form>
      </ValidationObserver>
    </template>

    <template #footer>
      <Button
        @click="$refs.submitQuestion.click()"
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
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import QuestionTypes from "./QuestionTypes";
import { VueEditor } from "vue2-editor";
import { mapActions } from "vuex";

export default {
  name: "AddQuestion",
  data() {
    return {
      questionEditorToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["color", "code-block"],
      ],
      question: {},
      answers: [],
      isShowAnswer: true,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("question", ["addQuestionByQuizId", "addAnswersByQuestion"]),
    addAnswer() {
      this.answers.push({
        content: "",
      });
    },
    setRightAnswer(index) {
      const currentType = this.questionType.inputType;

      if (currentType == "radio") {
        this.answers.map((answer) => (answer.isRightAnswer = false));
        this.answers[index].isRightAnswer = true;
      }
    },
    removeAnswer(index) {
      if (this.answers.length > 2) {
        this.answers.splice(index, 1);
      }
    },
    saveQuestion() {
      const quizId = this.$route.params.id;

      if (this.isNotExistRightAnswer()) {
        return this.toastNotify(
          this.$t("At least one correct answer must be chosen"),
          "warning"
        );
      }

      this.isLoading = true;

      this.addQuestionByQuizId({ quizId, question: this.question })
        .then(async (response) => {
          await this.saveAnswers(response);
          this.toastNotify($t("Question added successfull"), "success");
          this.closeModal();
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        })
        .finally(() => (this.isLoading = false));
    },
    isNotExistRightAnswer() {
      return (
        this.answers.findIndex((answer) => answer.isRightAnswer == true) == -1 &&
        this.questionType.isInput == true
      );
    },
    async saveAnswers(question) {
      if (!this.questionType.isInput) return;

      await this.addAnswersByQuestion({
        question,
        answers: this.answers,
      });
    },
    getInitialAnswers() {
     return [
        {
          content: "",
          isRightAnswer: false,
        },
        {
          content: "",
          isRightAnswer: false,
        },
     ];
    },
    getInitialQuestion() {
      return {
        title: "",
        content: "",
        weight: 0.5,
        questionType: 1,
      };
    },
    setInitialValues() {
      this.question = this.getInitialQuestion();
      this.answers = this.getInitialAnswers();
    },
    closeModal() {
      this.$store.commit("question/SET_QUESTION_TYPE", {});
      this.setInitialValues();
    },
  },
  watch: {
    questionType(type) {
      if(!type) return;
      this.question.questionType = type.id;
    }
  },
  computed: {
    questionType() {
      return this.$store.getters["question/getSelectedType"];
    },
    answerCount() {
      return this.answers.length;
    },
  },
  created() {
    this.setInitialValues();
  },
  components: {
    Modal,
    VueEditor,
    FormInput,
    Button,
    QuestionTypes,
  },
  metaInfo() {
    return {
      title: this.$t("Question.List"),
    };
  },
};
</script>

<style lang="scss">
.quiz-content-editor,
.ql-editor {
  $size: 60px;
  min-height: $size !important;
  max-height: $size * 4;
}
</style>
