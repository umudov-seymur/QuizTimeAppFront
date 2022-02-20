<template>
  <label class="inline-flex items-center text-gray-600 dark:text-gray-400">
    <input
      type="radio"
      class="
        text-purple-600
        form-radio
        focus:border-purple-400 focus:outline-none focus:shadow-outline-purple
        dark:focus:shadow-outline-gray
      "
      :checked="checked"
      :value="radioValue"
      @change="test"
      v-bind="$attrs"
    />
    <span class="ml-2">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    radioValue: {
      type: String,
    },
  },
  methods: {
    test(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>