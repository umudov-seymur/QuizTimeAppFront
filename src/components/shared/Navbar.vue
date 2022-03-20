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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
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
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
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
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="pl-2 hidden lg:block">{{ $t("My Profile") }}</span>
            </NavLink>
          </router-link>
        </li>
        <li>
         <QuizJoinInput/>
        </li>
      </ul>
    </Container>
  </nav>
</template>

<script>
import Container from "@/components/shared/Container";
import NavLink from "@/components/shared/NavLink";
import QuizJoinInput from "@/components/pages/quiz/QuizJoinInput";

export default {
  name: "Navbar",
  components: { Container, NavLink, QuizJoinInput },
};
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply text-white bg-purple-500;
}
</style>
