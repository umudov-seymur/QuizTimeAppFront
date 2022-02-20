<template>
  <div>{{ $("questions") }}</div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("questions"),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>