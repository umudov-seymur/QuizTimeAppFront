<template>
  <div
    class="question-types-list grid grid-cols-3 divide-x font-mono text-sm text-center font-bold leading-6 bg-white rounded-lg overflow-hidden dark:divide-slate-700"
  >
    <div
      class="w-26 md:w-28 cursor-pointer relative py-6 px-4 focus:outline-none"
      v-for="(type, index) in types"
      :class="{
        'bg-purple-500': isActiveChoice(type.id),
        'hover:bg-gray-100' : !isActiveChoice(type.id)
      }"
      :key="index"
      @click="setQuestionType(index)"
    >
      <div class="flex flex-col items-center">
        <span
          class="w-12 h-12 mb-2 rounded-lg question-type-icon text-white flex items-center justify-center"
          :class="type.class"
        >
          <font-awesome-icon :icon="type.icon" />
        </span>
        <span
          class="text-sm font-quicksand font-semibold capitalize"
          :class="{
            'text-white': isActiveChoice(type.id),
            'text-gray-800': !isActiveChoice(type.id),
          }"
        >
          {{ $t(type.text) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "QuestionTypes",
  props: {
    showActiveChoice: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("question", {
      selectedQuestionType: "getSelectedType",
      types: "getQuestionTypes",
    }),
  },
  methods: {
    setQuestionType(index) {
      const type = this.types[index];
      this.$emit("input", type.id);
      this.$store.commit("question/SET_QUESTION_TYPE", type);
    },
    isActiveChoice(typeId) {
      return this.showActiveChoice && this.selectedQuestionType
        ? this.selectedQuestionType.id == typeId
        : false;
    },
  },
};
</script>
