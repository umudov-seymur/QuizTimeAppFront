<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="w-full" tag="div">
    <form @submit.prevent="handleSubmit(login)" autocomplete="off">
      <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        {{ $t("Login") }}
      </h1>

      <Alert
        :type="authErrors.type"
        :body="authErrors.message"
        @dismiss="authErrors.message = ''"
      />

      <FormInput
        rules="required|email|min:3"
        placeholder="example@quiztime.az"
        v-model.trim="credentials.email"
        :name="$t('Email')"
      />

      <FormInput
        class="mt-4"
        type="password"
        rules="required|min:6|max:100"
        placeholder="***************"
        v-model.trim="credentials.password"
        :name="$t('Password')"
      />

      <Button class="mt-4 block w-full" :isLoading="isLoading">
        {{ $t("Login") }}
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
        :to="{ name: 'register' }"
        >{{ $t("Create Account") }}</router-link
      >
    </p>
  </ValidationObserver>
</template>

<script>
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import Alert from "@/components/shared/Alert.vue";

export default {
  name: "Login",
  data() {
    return {
      authErrors: {
        type: "red",
        message: "",
      },
      credentials: {
        email: "",
        password: "",
      },
      returnUrl: "/dashboard",
      isLoading: false,
    };
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    login() {
      this.isLoading = true;

      this.$store
        .dispatch("auth/login", this.$data.credentials)
        .then(() => {
          this.authErrors.message = "";
          this.$router.push(this.returnUrl);
        })
        .catch((errorResponse) => {
          this.authErrors.message = errorResponse.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  metaInfo() {
    return {
      title: this.$t("Login"),
    };
  },
  components: { FormInput, Button, Alert },
};
</script>