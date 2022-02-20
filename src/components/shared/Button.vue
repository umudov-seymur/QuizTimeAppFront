<template>
  <button
    class="
      flex
      items-center
      justify-center
      px-4
      py-2
      text-sm
      font-medium
      leading-5
      text-white
      transition-colors
      duration-150
      bg-purple-600
      border border-transparent
      rounded-lg
      active:bg-purple-600
      hover:bg-purple-700
      focus:outline-none focus:shadow-outline-purple
    "
    :class="{
      'cursor-not-allowed': isLoading,
      'opacity-50' : isLoading
    }"
    :disabled="isLoading"
  >
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      v-if="isLoading"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>