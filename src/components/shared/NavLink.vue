<template>
  <a
    v-bind="$attrs"
    @click="$emit('click', $event)"
    class="my-2 py-2 no-underline hover:no-underline text-gray-700 hover:text-white flex items-center justify-center bg-transparent hover:bg-purple-600 transition duration-300 focus:border-teal-900 font-bold px-5 rounded"
  >
    <slot/>
  </a>
</template>

<script>
export default {
  name: "NavLink",
};
</script>

<style lang="scss" scoped></style>
