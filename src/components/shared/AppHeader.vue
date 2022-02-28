<template>
  <header class="sticky top-0 w-full z-10 shadow bg-purple-500">
    <Container class="py-3">
      <div class="flex w-full items-center flex-shrink-0 text-white mr-6">
        <div class="logo flex items-center">
          <!-- <img  class="w-8" :src="require('@/assets/images/logo-placeholder.png')" /> -->
          <router-link
            to="/"
            class="font-extrabold text-2xl font-quicksand tracking-wider"
          >
            QuizTime
          </router-link>
        </div>

        <div class="w-full flex justify-end items-center">
          <LanguageSwitcher />

          <span class="mx-2">|</span>

          <div class="flex items-center space-x-4" v-if="!isLoggedIn">
            <router-link
              class="block mt-0 lg:inline-block font-semibold text-white hover:text-white"
              :to="{ name: 'login' }"
            >
              {{ $t("Log in") }}
            </router-link>

            <span class="font-bold">/</span>

            <span class="relative inline-flex rounded-md shadow-sm">
              <router-link
                class="flex items-center justify-between px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-dark-200 border border-transparent rounded-sm focus:outline-none hover:bg-purple-600 shadow-outline-purple"
                :to="{ name: 'register' }"
              >
                {{ $t("Sign Up") }}
              </router-link>

              <span
                class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1 pointer-events-none"
              >
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-200 opacity-75"
                >
                </span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3 bg-purple-300"
                >
                </span>
              </span>
            </span>
          </div>

          <DropdownMenu v-if="isLoggedIn" class="userMenu">
            <template #toggler>
              <avatar
                :username="getFullName"
                class="cursor-pointer"
                :size="40"
              />
            </template>

            <template #items>
              <DropdownItem>
                <svg
                  class="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem>
                <svg
                  class="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem @click="logOut">
                <svg
                  class="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  ></path>
                </svg>
                <span>{{ $t("Log out") }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </div>
      </div>
    </Container>
    <Navbar />
  </header>
</template>

<script>
import Container from "@/components/shared/Container.vue";
import Navbar from "@/components/shared/Navbar.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import DropdownMenu from "@/components/shared/DropdownMenu.vue";
import DropdownItem from "@/components/shared/DropdownItem.vue";
import Avatar from "vue-avatar";
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  components: {
    Container,
    Avatar,
    Navbar,
    LanguageSwitcher,
    DropdownItem,
    DropdownMenu,
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "auth/getCurrentUser",
      isLoggedIn: "auth/isLoggedIn",
    }),
    getFullName() {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    },
  },
};
</script>

<style lang="scss">
.userMenu {
  ul {
    @apply w-32;
  }
}
</style>
