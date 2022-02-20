<template>
  <div class="wrapper404">
    <div class="header404">404</div>
    <div class="message404">Page not found</div>
    <div class="image404">
      <img
        src="https://static.classtime.com/www/images/not-found.3b8be064f0c0.png"
        role="presentation"
      />
    </div>
    <div style="height: 5.5rem"></div>
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
  min-height: 100%;
  position: relative;
  margin-bottom: -5.5rem;
  margin-top: -5.5rem;
  padding-top: 7rem;
}

.header404 {
  text-align: center;
  font-size: 96px;
  color: #eceff1;
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