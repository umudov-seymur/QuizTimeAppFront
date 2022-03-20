<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      layout: "div",
    };
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | Quiz Time",
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
