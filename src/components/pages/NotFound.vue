<template>
  <div class="flex items-center mx-auto justify-center my-auto h-full">
    <div class="wrapper404">
      <div class="header404">404</div>
      <div class="message404">Sorry, we can't find the page you're looking for.</div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("Not Found"),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper404 {
  position: relative;
}

.header404 {
  text-align: center;
  font-size: 96px;
  @apply text-purple-500;
  text-shadow: 2px 2px #8ba1ab;
  font-weight: 900;
  width: 100%;
}

.message404 {
  color: #334148;
  font-size: 24px;
  text-align: center;
  width: 100%;
}

.image404 {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 350px;
}

.image404 img {
  height: 100%;
}
</style>
