<template>
  <Container class="mb-auto">
    <div
      class="w-full mt-16 px-4 py-3 mb-8 border-t-8 border-purple-700 bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <h2>Categories list</h2>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/shared/Container.vue";

export default {
  name: "CategoryList",
  components: {
    Container,
  },
};
</script>

<style lang="scss" scoped></style>
