<template>
  <div
    class="border px-4 py-3 my-4 rounded relative"
    :class="classObject"
    role="alert"
    v-if="isShow"
  >
    <strong class="font-bold" v-if="title.length > 0">{{ title }}</strong>
    <span class="block sm:inline">{{ body }}</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3" v-if="isDismiss" @click="$emit('dismiss', true)">
      <svg
        class="fill-current h-6 w-6 text-red-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>{{ $t("Close") }}</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    isShow() {
      return this.body.length > 0;
    },
    classObject() {
      return `
        bg-${this.type}-100
        border-${this.type}-400
        text-${this.type}--700
      `;
    },
  },
  props: {
    type: {
      type: String,
      default: "red",
    },
    title: {
      type: String,
      default: "",
    },
    isDismiss: {
      type: Boolean,
      default: true,
    },
    body: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>