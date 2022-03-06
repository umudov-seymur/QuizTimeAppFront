<template>
  <div
    class="flex flex-col mt-8 border border-gray-300 select-none rounded-lg overflow-hidden shadow-md bg-white question-details-card my-2"
  >
    <div class="p-2 bg-gray-50 flex items-center justify-between">
      <div class="flex items-center">
        <button
          class="focus:shadow-outline-purple focus:outline-none drag-button text-gray-600 hover:bg-gray-200 rounded has-tooltip"
        >
          <SkeletonLoader class="w-5" />
        </button>

        <span
          class="mx-2 question-type-icon relative flex items-center justify-center w-6 h-6 rounded-sm"
        >
          <SkeletonLoader class="w-6" :styles="['bg-green-400']" />
        </span>

        <SkeletonLoader class="w-20 mr-3" :styles="['bg-gray-500']" />
      </div>
      <div class="flex">
        <button
          class="focus:shadow-outline-purple focus:outline-none mr-2 flex items-center justify-center px-4 py-1 text-sm font-semibold h-auto bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <SkeletonLoader class="w-6" :styles="['bg-gray-300']" />
          <SkeletonLoader class="w-20 ml-1" :styles="['bg-gray-300']" />
        </button>
        <button
          class="focus:shadow-outline-purple hidden focus:outline-none mr-2 lg:flex items-center justify-center px-4 py-1 text-sm font-semibold bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <SkeletonLoader class="w-6" :styles="['bg-gray-300']" />
        </button>
        <button
          class="focus:shadow-outline-purple hidden focus:outline-none mr-2 lg:flex items-center justify-center px-4 py-1 text-sm font-semibold bg-white border border-solid border-gray-300 text-gray-600 hover:bg-gray-200 rounded white min-w-max relative transition-colors duration-200 ease-in-out has-tooltip"
        >
          <SkeletonLoader class="w-6" :styles="['bg-gray-300']" />
        </button>
      </div>
    </div>
    <div class="p-4 shadow-sm">
      <div
        class="flex space-x-1 items-center text-sm overflow-hidden text-dark-2 mb-6"
      >
        <SkeletonLoader
          :class="[`w-${size}`]"
          v-for="size in [12, 24, 10, 20, 4]"
          :key="size"
          :styles="['bg-gray-300']"
        />
      </div>
      <div class="relative bg-gray-200 mb-8 h-px">
        <span
          class="absolute px-2 text-xs ml-4 -translate-y-1/2 transform text-gray-500"
        >
          <SkeletonLoader class="w-32" :styles="['bg-gray-300']" />
        </span>
      </div>
      <div class="flex flex-wrap">
        <div
          class="mb-2 flex items-center w-1/2 animate-pulse"
          v-for="color in 4"
          :key="color"
        >
          <span
            class="w-4 h-4 rounded-full my-1 mr-1 relative flex-shrink-0"
            :class="{
              'bg-green-300': color == 1,
              'bg-red-300': color > 1,
            }"
          >
          </span>
          <div class="flex space-x-2">
            <SkeletonLoader
              class="w-8"
              :class="`sm:w-${size}`"
              v-for="size in [10, 16, 20]"
              :key="size"
              :styles="['bg-gray-300']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from "@/components/shared/SkeletonLoader";
export default {
  name: "QuestionLoader",
  props: {
    isLoader: {
      type: Boolean,
      default: true,
    },
  },
  components: { SkeletonLoader },
};
</script>
