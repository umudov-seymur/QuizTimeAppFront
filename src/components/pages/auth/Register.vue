<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
    <form @submit.prevent="handleSubmit(register)" autocomplete="off">
      <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        {{ $t("Register") }}
      </h1>

      <Alert
        :type="registerErrors.type"
        :body="registerErrors.message"
        @dismiss="registerErrors.message = ''"
      />

      <div
        class="flex flex-col md:flex-row justify-between md:space-x-4 lg:mb-4"
      >
        <FormInput
          rules="required|min:3|max:30"
          :placeholder="$t('FirstName')"
          v-model.trim="user.firstName"
          :name="$t('FirstName')"
        />

        <FormInput
          rules="required|max:30"
          :placeholder="$t('LastName')"
          v-model.trim="user.lastName"
          :name="$t('LastName')"
        />
      </div>

      <FormInput
        rules="required|email|min:3|max:30"
        placeholder="example@quiztime.az"
        v-model.trim="user.email"
        :name="$t('Email')"
      />

      <FormInput
        class="mt-4"
        type="password"
        rules="required|min:6|max:100"
        placeholder="***************"
        v-model.trim="user.password"
        :name="$t('Password')"
      />

      <div class="mt-4">
        <FormRadioButton
          v-model.number="user.role"
          name="role"
          checked
          radioValue="1"
          :label="$t('Role.Teacher')"
        />

        <FormRadioButton
          v-model.number="user.role"
          class="ml-6"
          name="role"
          radioValue="2"
          :label="$t('Role.Student')"
        />
      </div>

      <Button class="mt-4 block w-full" :isLoading="isLoading">
        {{ $t("Register") }}
      </Button>
    </form>

    <hr class="my-8" />

    <p class="mt-4">
      <router-link
        class="
          text-sm
          font-medium
          text-purple-600
          dark:text-purple-400
          hover:underline
        "
        :to="{ name: 'login' }"
      >
        {{ $t("Already have an account? Login") }}
      </router-link>
    </p>
  </ValidationObserver>
</template>

<script>
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import Alert from "@/components/shared/Alert";
import FormRadioButton from "@/components/shared/FormRadioButton.vue";

export default {
  name: "Register",
  data() {
    return {
      registerErrors: {
        type: "red",
        message: "",
      },
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: 1,
      },
      isLoading: false,
    };
  },
  methods: {
    register() {
      this.isLoading = true;

      this.$store
        .dispatch("auth/register", this.$data.user)
        .then((res) => {
          this.$router.push({ name: "login" });
          this.$swal(this.$t("Thank you"), res.message, "success");
        })
        .catch((registerErrors) => {
          this.registerErrors.message = registerErrors.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  metaInfo() {
    return {
      title: this.$t("Register"),
    };
  },
  components: { FormInput, Button, Alert, FormRadioButton },
};
</script>