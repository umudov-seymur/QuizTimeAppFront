<template>
  <div id="app">
    <div class="main flex h-screen bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col flex-1 w-full z-10">
        <AppHeader />
        <transition
          enter-active-class="transition ease-out duration-150"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-100"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
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
