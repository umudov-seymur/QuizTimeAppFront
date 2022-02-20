<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
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
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");


// .v-application {
//   [class*="text-"] {
//     color: #36405a;
//     font-family: $font-family, sans-serif !important;
//   }
//   font-family: $font-family, sans-serif !important;
// }
</style>
