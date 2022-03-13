<template>
  <ValidationProvider
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    v-slot="{ errors, required, ariaMsg }"
  >
    <label
      class="select block text-sm"
      @click="$refs.select.focus()"
      :for="name"
    >
      <span class="text-gray-700 dark:text-gray-400">{{ label || name }}</span>
      <span class="text-red-600">{{ required ? " *" : "" }}</span>

      <select
        :class="{
          'dark:border-gray-600 focus:border-purple-400 focus:shadow-outline-purple dark:focus:shadow-outline-gray':
            !errors[0],
          'border-red-600 focus:border-red-400 focus:shadow-outline-red':
            errors[0],
          'has-value': hasValue,
        }"
        ref="select"
        v-on="$listeners"
        v-model="innerValue"
        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
      >
        <option disabled selected value="">
          {{ $t("Please Select", { name: $t("Category") }) }}
        </option>
        <option v-for="item in items" :key="item.id" :value="item.id">
          {{ item.text || item.name }}
        </option>
      </select>
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
  name: "FormSelect",
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
    items: {
      type: Array,
      required: true,
    },
    val: {
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
    if (this.val) {
      this.innerValue = this.val;
    }
  },
};
</script>
