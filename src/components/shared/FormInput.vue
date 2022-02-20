<template>
  <ValidationProvider
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    v-slot="{ errors, required, ariaInput, ariaMsg }"
  >
    <label class="block text-sm" @click="$refs.input.focus()" :for="name">
      <span class="text-gray-700 dark:text-gray-400">{{ label || name }}</span>
      <span class="text-red-600">{{ required ? " *" : "" }}</span>

      <input
        class="
          block
          w-full
          mt-1
          text-sm
          form-input
          dark:text-gray-300 dark:bg-gray-700
          focus:outline-none
        "
        :class="{
          'dark:border-gray-600 focus:border-purple-400 focus:shadow-outline-purple dark:focus:shadow-outline-gray':
            !errors[0],
          'border-red-600 focus:border-red-400 focus:shadow-outline-red':
            errors[0],
          'has-value': hasValue,
        }"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        ref="input"
        v-model="innerValue"
        v-bind="ariaInput"
      />
    </label>

    <ValidationErrorBox v-if="errors[0]" v-bind="ariaMsg">
      {{ errors[0] }}
    </ValidationErrorBox>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import ValidationErrorBox from "./ValidationErrorBox";

export default {
  name: "TextInput",
  components: {
    ValidationProvider,
    ValidationErrorBox,
  },
  props: {
    vid: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return [
          "url",
          "text",
          "password",
          "tel",
          "search",
          "number",
          "email",
        ].includes(value);
      },
    },
    value: {
      type: null,
      default: "",
    },
  },
  data: () => ({
    innerValue: "",
  }),
  computed: {
    hasValue() {
      return !!this.innerValue;
    },
  },
  watch: {
    innerValue(value) {
      this.$emit("input", value);
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val;
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>
