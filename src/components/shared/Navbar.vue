<template>
  <nav class="bg-white shadow-md overflow-x-auto border-b">
    <Container>
      <ul
        class="w-full list-none flex flex-no-wrap lg:flex-wrap items-center text-base space-x-2 justify-between"
      >
        <li>
          <router-link
            :to="{ name: 'home' }"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <NavLink
              :href="href"
              @click="navigate"
              :class="isActive && 'router-link-active'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("Home") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'quizzes' }"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <NavLink
              :href="href"
              @click="navigate"
              :class="isActive && 'router-link-active'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("Quizzes") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'categories' }"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <NavLink
              :href="href"
              @click="navigate"
              :class="isActive && 'router-link-active'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("Categories") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
          <router-link to="/test" custom v-slot="{ href, navigate, isActive }">
            <NavLink
              :href="href"
              @click="navigate"
              :class="isActive && 'router-link-active'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("Results") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
          <router-link to="/test" custom v-slot="{ href, navigate, isActive }">
            <NavLink
              :href="href"
              @click="navigate"
              :class="isActive && 'router-link-active'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("Settings") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
          <div class="hidden relative lg:flex items-center md:mr-0">
            <input
              type="text"
              class="block p-2 text-sm form-input dark:text-gray-300 dark:bg-gray-700 focus:outline-none w-full dark:border-gray-600 focus:border-purple-400 focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              placeholder="Quiz şifrəsi"
            />
            <button
              class="flex cursor-pointer absolute inset-y-0 focus:outline-none right-0 items-center rounded-tr-sm rounded-br bg-purple-500 hover:bg-purple-400 text-white font-bold p-3"
            >
              {{ $t("Join") }}
            </button>
          </div>
        </li>
      </ul>
    </Container>
  </nav>
</template>

<script>
import Container from "@/components/shared/Container.vue";
import NavLink from "@/components/shared/NavLink.vue";

export default {
  name: "Navbar",
  components: { Container, NavLink },
};
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply text-white bg-purple-500;
}
</style>
