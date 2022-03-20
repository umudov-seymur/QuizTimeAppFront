<template>
  <Layout name="Default">
    <Container class="mb-auto">
      <div
        class="w-full mt-16 px-4 py-3 mb-8 border-t-8 border-purple-700 bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div class="mb-6 flex items-center">
          <svg
            data-v-1141183a=""
            data-v-65bd1efa=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              data-v-1141183a=""
              data-v-65bd1efa=""
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>

          <div class="ml-3">
            <h2
              class="text-xl capitalize font-semibold text-gray-700 dark:text-gray-200"
            >
              {{ $t("Edit Category") }}
            </h2>
          </div>
        </div>

        <CategoryForm
          @saved="updateCategory"
          :isLoading="isLoading"
          :category="category"
        />
      </div>
    </Container>
  </Layout>
</template>

<script>
import Layout from "@/components/shared/Layout";
import Container from "@/components/shared/Container";
import CategoryForm from "@/components/pages/categories/CategoryForm";
import { mapActions } from "vuex";

export default {
  name: "EditCategory",
  data() {
    return {
      isLoading: false,
      category: {},
    };
  },
  created() {
    this.fetchCategoryById(this.$route.params.id).then((category) => {
      this.category = category;
    });
  },
  methods: {
    ...mapActions("category", ["fetchCategoryById"]),

    updateCategory(data) {
      this.isLoading = true;

      this.$store
        .dispatch("category/updateCategory", data)
        .then((res) => {
          this.toastNotify(res.message, "success");
          this.$router.push({ name: "categories" });
        })
        .catch((err) => {
          this.toastNotify(err.message, "error");
        })
        .finally(() => (this.isLoading = false));
    },
  },
  metaInfo() {
    return {
      title: this.$t("Edit Category"),
    };
  },
  components: { Layout, Container, CategoryForm },
};
</script>
