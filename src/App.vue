<template>
  <div id="app">
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col flex-1 w-full">
        <AppHeader />
        <transition name="fade" mode="out-in">
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
    AppHeader
},
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Quicksand", sans-serif;
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
