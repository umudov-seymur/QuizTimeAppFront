<template>
  <li class="flex" @click="$emit('click', $event)">
    <button
      :class="classes"
      class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 focus:outline-none rounded-md hover:bg-purple-500 hover:text-white dark:hover:bg-gray-800 dark:hover:text-gray-200"
    >
      <slot />
    </button>
  </li>
</template>

<script>
export default {
  name: "DropdownItem",
  props: {
    classes: {
      type: Object,
    },
  },
};
</script>
