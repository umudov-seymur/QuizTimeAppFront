<template>
  <div class="main flex h-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col flex-1 w-full z-10">
      <AppHeader />
      <main class="h-full overflow-y-auto">
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
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppFooter from "@/components/shared/AppFooter";
import AppHeader from "@/components/shared/AppHeader";

export default {
  name: "HomeLayout",
  components: {
    AppFooter,
    AppHeader,
  },
};
</script>

<style lang="scss" scoped></style>
