<template>
  <ValidationProvider
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    v-slot="{ errors, required, ariaMsg }"
  >
    <label class="block text-sm" @click="focusInput" :for="name">
      <span class="text-gray-700 dark:text-gray-400">{{ label || name }}</span>
      <span class="text-red-600" v-if="label || name">{{
        required ? " *" : ""
      }}</span>

      <div class="relative">
        <input
          class="block w-full text-sm form-input dark:text-gray-300 dark:bg-gray-700 focus:outline-none"
          :class="{
            'dark:border-gray-600 focus:border-purple-400 focus:shadow-outline-purple dark:focus:shadow-outline-gray':
              !errors[0],
            'border-red-600 focus:border-red-400 focus:shadow-outline-red':
              errors[0],
            'mt-1': label || name,
            'has-value': hasValue,
          }"
          :id="name"
          :type="type"
          :placeholder="placeholder"
          ref="input"
          v-on="$listeners"
          v-bind="$attrs"
          v-model="innerValue"
        />

        <slot name="append" />
      </div>

      <span
        class="text-xs text-gray-600 dark:text-gray-400"
        v-if="!errors[0] && helperText.length > 0"
      >
        {{ helperText }}
      </span>
    </label>

    <ValidationErrorBox v-if="errors[0] && (label || name)" v-bind="ariaMsg">
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
    helperText: {
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
  methods: {
    focusInput() {
      if (this.name || this.label) {
        return this.$refs.input.focus();
      }
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
