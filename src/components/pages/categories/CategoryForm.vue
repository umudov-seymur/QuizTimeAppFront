<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
    <form @submit.prevent="handleSubmit(saveCategory)" autocomplete="off">
      <FormInput
        rules="required|min:5|max:30"
        placeholder="ex: Programming "
        v-model.trim="category.name"
        :name="$t('Category Name')"
      />

      <div class="flex space-x-2 mt-2">
        <router-link :to="{ name: 'categories' }" custom v-slot="{ navigate }">
          <Button
            type="button"
            @click="navigate"
            class="mt-4 space-x-1"
            :colors="[
              'text-dark',
              'bg-gray-300',
              'hover:bg-gray-400',
              'active:bg-gray-500',
              'focus:shadow-outline-gray',
            ]"
          >
            <font-awesome-icon icon="fa-solid fa-close" />
            <span>{{ $t("Close") }}</span>
          </Button>
        </router-link>

        <Button
          class="mt-4"
          :class="{ 'space-x-1': !isLoading }"
          :isLoading="isLoading"
        >
          <font-awesome-icon icon="fa-solid fa-save" v-if="!isLoading" />
          <span>{{ $t("Save") }}</span>
        </Button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";

export default {
  name: "CategoryForm",
  props: {
    category: {
      type: Object,
      default: () => {
        return {
          name: "",
        };
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    saveCategory() {
      console.log("emit it worked :)");
      this.$emit("saved", this.category);
    },
  },
  components: { Button, FormInput },
};
</script>
