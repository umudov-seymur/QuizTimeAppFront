<template>
  <div id="app">
    <div class="main flex h-screen bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col flex-1 w-full z-10">
        <AppHeader />

        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >
          <router-view />
        </transition>

        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script>
// import LanguageSwitcher from "./components/LanguageSwitcher.vue";
import AppFooter from "./components/shared/AppFooter.vue";
import AppHeader from "./components/shared/AppHeader.vue";

export default {
  name: "App",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | Quiz Time",
  },
  components: {
    // LanguageSwitcher,
    AppFooter,
    AppHeader,
  },
};
</script>

<style lang="scss">
/* @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Quicksand", sans-serif;
} */

#app {
  .main {
    &::before {
      position: relative;
      z-index: 10;

      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("assets/images/background.png");
      opacity: 0.1;
    }
  }
}
</style>
