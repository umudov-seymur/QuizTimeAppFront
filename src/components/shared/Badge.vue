<template>
  <span
    class="px-3 py-1 font-semibold shadow-sm leading-tight rounded-full"
    :class="badgeColor"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "Badge",
  props: {
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    badgeColor() {
      return `text-${this.color}-700 bg-${this.color}-100 dark:bg-${this.color}-700 dark:text-${this.color}-100`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
