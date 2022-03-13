<template>
  <div v-if="isOpen">
    <transition
      enter-active-class="transition ease-out duration-500"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-500"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      >
        <transition
          enter-active-class="transition ease-out duration-500"
          enter-class="opacity-0 transform translate-y-1/2"
          enter-to-class="opacity-100"
          leave-active-class="transition ease-in duration-500"
          leave-class="opacity-100"
          leave-to-class="opacity-0 transform translate-y-1/2"
          appear
        >
          <div
            class="w-full overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
            id="modal"
          >
            <div
              class="flex justify-between items-center shadow-2xl bg-gray-50 px-6 py-4"
            >
              <div
                class="flex items-center space-x-2 text-lg font-semibold text-purple-600 dark:text-gray-300"
              >
                <slot name="header" />
              </div>

              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 ml-auto inline-flex items-center focus:outline-none dark:hover:bg-gray-600 dark:hover:text-white"
                @click="close"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Modal body -->
            <div class="my-4 py-4 px-6">
              <slot name="content" />
            </div>

            <div
              class="flex flex-col items-center justify-end px-6 py-4 space-y-4 sm:space-y-0 sm:space-x-3 sm:flex-row bg-gray-50 dark:bg-gray-800"
            >
              <button
                @click="close"
                class="w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              >
                {{ $t("Close") }}
              </button>

              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    close() {
      this.$emit("dismiss");
    },
  },
};
</script>

<style lang="scss" scoped></style>
