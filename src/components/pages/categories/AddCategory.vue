<template>
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
            {{ $t("Add New Category") }}
          </h2>
        </div>
      </div>

      <CategoryForm @saved="saveCategory" :isLoading="isLoading" />
    </div>
  </Container>
</template>

<script>
import Container from "@/components/shared/Container";
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import CategoryForm from "@/components/pages/categories/CategoryForm";

export default {
  name: "AddCategory",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    saveCategory(category) {
      this.isLoading = true;

      this.$store
        .dispatch("category/addCategory", category)
        .then((res) => {
          this.toastrNotify(res.message, "success");
          this.$router.push({ name: "categories" });
        })
        .catch((err) => {
          this.toastrNotify(err.message, "error");
        })
        .finally(() => (this.isLoading = false));
    },
  },
  metaInfo() {
    return {
      title: this.$t("Add New Category"),
    };
  },
  components: { Container, Button, FormInput, CategoryForm },
};
</script>
