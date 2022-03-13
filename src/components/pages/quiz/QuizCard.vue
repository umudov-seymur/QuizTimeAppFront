<template>
  <div
    class="flex items-center p-3 rounded-md z-0 shadow dark:bg-gray-800"
    :class="[`bg-${color}-50`, `border border-${color}-200`]"
  >
    <div
      class="p-3 mr-4 rounded-full"
      :class="[`bg-${color}-200`, `text-${color}-500`]"
    >
      <span v-if="!isLoading">
        <DynamicIcon :icon="icon" class="w-6 h-6" />
      </span>

      <SkeletonLoader
        class="w-6"
        :styles="[`bg-${color}-400`, 'rounded-full']"
        v-else
      />
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        <span v-if="!isLoading">
          {{ title }}
        </span>
        <SkeletonLoader class="w-48" :styles="[`bg-${color}-300`]" v-else />
      </p>
      <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">
        <span v-if="!isLoading">
          {{ content }}
        </span>
        <SkeletonLoader class="w-40" :styles="[`bg-${color}-300`]" v-else />
      </p>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import DynamicIcon from "@/components/shared/DynamicIcon";

export default {
  name: "QuizCard",
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "orange",
    },
  },
  components: { SkeletonLoader, DynamicIcon },
};
</script>

<style lang="scss" scoped></style>
