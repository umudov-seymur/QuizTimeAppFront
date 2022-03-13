<template>
  <Container class="mb-auto">
    <div class="w-full py-16">
      <div class="w-full overflow-hidden rounded-lg shadow-xl">
        <div
          class="flex justify-between pl-4 text-sm font-semibold tracking-wide text-white uppercase border-b dark:border-gray-700 bg-purple-500 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
        >
          <span class="flex items-center col-span-3 font-quicksand">
            {{ $t("Categories") }}
          </span>

          <router-link
            :to="{ name: 'categories.create' }"
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
          <TableLoader :rowCount="5" :size="5" v-if="isLoading" />

          <table class="w-full whitespace-no-wrap" v-else>
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">{{ $t("Category Name") }}</th>
                <th class="px-4 py-3">{{ $t("Quizzes Count") }}</th>
                <th class="px-4 py-3">{{ $t("Created At") }}</th>
                <th class="px-4 py-3">{{ $t("Actions") }}</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <tr>
                <td
                  colspan="4"
                  class="text-center py-4"
                  v-if="categories.length <= 0"
                >
                  {{ $t("Not Found Result") }}
                </td>
              </tr>

              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="category in categories"
                :key="category.id"
              >
                <td class="px-4 py-3 text-sm font-semibold">
                  {{ category.name }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <Badge :text="`${category.quizCount} Quiz`" color="orange" />
                </td>
                <td class="px-4 py-3 text-sm">
                  <Badge
                    :text="category.createdAt | moment('DD/MM/YYYY')"
                    color="indigo"
                  />
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-4 text-sm">
                    <router-link
                      :to="{
                        name: 'categories.update',
                        params: { id: category.id },
                      }"
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Edit"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        ></path>
                      </svg>
                    </router-link>

                    <button
                      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Delete"
                      @click="removeCategory(category.id)"
                    >
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from "@/components/shared/Container.vue";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import TableLoader from "@/components/shared/TableLoader.vue";

export default {
  name: "CategoryList",
  metaInfo() {
    return {
      title: this.$t("Categories"),
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions("category", ["fetchCategories", "deleteCategory"]),
    removeCategory(categoryId) {
      this.deleteCategory(categoryId).then((res) =>
        this.toastNotify(this.$t(res.message), "success")
      );
    },
  },
  computed: {
    ...mapGetters("category", {
      categories: "getCategories",
    }),
    ...mapState("category", {
      isLoading: "isLoading",
    }),
  },
  components: { Container, Button, Badge, TableLoader },
};
</script>

<style lang="scss" scoped>
tr:nth-child(even) {
  @apply bg-cool-gray-100;
}
</style>
