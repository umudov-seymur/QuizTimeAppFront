<template>
  <div>
    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        class="
          flex-1
          h-full
          max-w-4xl
          mx-auto
          overflow-hidden
          bg-white
          rounded-lg
          shadow-xl
          dark:bg-gray-800
        "
      >
        <div class="flex flex-col overflow-y-auto md:flex-row" :style="{
          height: '70vh'
        }">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              class="object-cover w-full h-full pointer-events-none"
              :src="require('@/assets/images/hero-bg.png')"
              alt="hero"
            />
          </div>

          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
</style>