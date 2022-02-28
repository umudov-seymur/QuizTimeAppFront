<template>
  <div class="flex items-center p-6 my-auto">
    <div
      class="flex-1 h-full max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
    >
      <div
        class="flex flex-col overflow-y-auto md:flex-row overflow-hidden"
        :style="{
          height: isMobile() ? 'auto' : '590px',
        }"
      >
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full pointer-events-none"
            loading="lazy"
            :src="require('@/assets/images/hero-bg.png')"
            alt="hero"
          />
        </div>

        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <transition
            enter-active-class="animate__animated animate__fadeInRight animate__faster"
            leave-active-class="animate__animated animate__fadeOutRight animate__faster"
            mode="out-in"
          >
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  methods: {
    isMobile() {
      return screen.width <= 760;
    },
  },
};
</script>

<style lang="scss" scoped></style>
