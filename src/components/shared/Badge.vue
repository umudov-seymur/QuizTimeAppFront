<template>
  <span
    class="px-6 py-1 font-semibold shadow-sm leading-tight text-center rounded-full"
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
      return `text-${this.color}-700 bg-${this.color}-100 border border-${this.color}-200 dark:bg-${this.color}-700 dark:text-${this.color}-100`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
