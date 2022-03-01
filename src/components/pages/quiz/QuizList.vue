<template>
  <Container class="mb-auto">
    <div class="w-full py-16">
      <div class="animate-pulse flex space-x-4" v-if="isLoading">
        <div class="flex-1 space-y-4 py-1">
          <div class="space-y-8">
            <div
              class="h-8 relative bg-gray-400 rounded"
              v-for="i in 9"
              :key="i"
            ></div>
          </div>
        </div>
      </div>

      <div class="w-full overflow-hidden rounded-lg shadow-xl">
        <div
          class="flex justify-between pl-4 text-sm font-semibold tracking-wide text-white uppercase border-b dark:border-gray-700 bg-purple-500 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
        >
          <span class="flex items-center col-span-3 font-quicksand">
            {{ $t("Quizzes") }}
          </span>

          <router-link
            :to="{ name: 'quizzes.create' }"
            custom
            v-slot="{ navigate }"
          >
            <Button
              @click="navigate"
              class="uppercase"
              :colors="[
                'text-white',
                'bg-green-600',
                'hover:bg-green-700',
                'active:bg-green-600',
                'focus:shadow-outline-green',
                'py-3',
                'rounded-t-none rounded-b-none',
              ]"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
              <span class="ml-2 font-quicksand">{{ $t("Create") }}</span>
            </Button>
          </router-link>
        </div>

        <div class="w-full overflow-x-auto">
          <TableLoader :rowCount="10" :size="5" />
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/shared/Container.vue";
import Button from "@/components/shared/Button";
import TableLoader from "@/components/shared/TableLoader.vue";
import Badge from "@/components/shared/Badge.vue";

export default {
  name: "QuizList",
  data() {
    return {
      isLoading: false,
    };
  },
  metaInfo() {
    return {
      title: this.$t("Quizzes"),
    };
  },
  components: { Container, Button, TableLoader, Badge },
};
</script>

<style lang="scss" scoped></style>
