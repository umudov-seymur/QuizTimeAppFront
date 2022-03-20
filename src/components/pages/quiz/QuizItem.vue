<script>
import Badge from "@/components/shared/Badge.vue";

export default {
  name: "QuizItem",
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
  methods: {
    quizTimer(timer) {
      return timer ? `${timer} ${this.$t("Minute")}` : this.$t("Indefinitely");
    },
  },
  components: { Badge },
};
</script>

<template>
  <tr class="text-gray-700 dark:text-gray-400">
    <td class="px-4 py-3 text-sm font-bold text-purple-600">
      {{ quiz.name }}
    </td>
    <td class="px-4 py-3 text-sm font-semibold">
      {{ quiz.category.name }}
    </td>
    <td class="px-4 py-3 text-sm">
      <Badge :text="quizTimer(quiz.timer)" color="orange">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3"
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
      </Badge>
    </td>
    <td class="px-4 py-3 text-sm">
      <Badge :text="`#${quiz.password}`" color="indigo" />
    </td>
    <td class="px-4 py-3 text-sm">
      <Badge :text="quiz.createdAt | moment('DD/MM/YYYY')" color="teal" />
    </td>
    <td class="px-4 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <router-link
          :to="{
            name: 'quizzes.questions',
            params: { id: quiz.id },
          }"
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Show"
        >
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </router-link>

        <button
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          @click="$emit('updated', quiz)"
          aria-label="Edit"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </button>

        <button
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          @click="$emit('removed', quiz.id)"
          aria-label="Delete"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>
