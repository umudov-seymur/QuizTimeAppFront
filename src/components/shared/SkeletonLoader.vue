<template>
  <div class="animate-pulse">
    <div class="h-6 rounded-md" :class="styles"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    styles: {
      type: Array,
      default: () => ['bg-gray-400'],
    },
  },
};
</script>
