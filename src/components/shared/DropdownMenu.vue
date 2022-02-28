<template>
  <div class="relative z-10" @click="toggle" v-on-clickaway="away">
    <button class="flex focus:outline-none ml-3 items-center space-x-2">
      <slot name="toggler" />
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul
        class="absolute right-0 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
        v-if="isActive"
        aria-label="submenu"
      >
        <slot name="items" />
      </ul>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "DropdownMenu",
  mixins: [clickaway],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggle: function () {
      this.isActive = !this.isActive;
    },
    away: function () {
      this.isActive = false;
    },
  },
};
</script>
