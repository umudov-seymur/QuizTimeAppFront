<template>
  <div
    class="flex items-center min-h-screen bg-purple-700 animate__animated animate__fadeIn"
  >
    <div class="countdown-timer-wrapper">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut hidden"
        v-for="([key, timer], index) in Object.entries(timerData)"
        :key="index"
      >
        <div class="countdown-timer uppercase" v-if="key == counter">
          {{ timer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountDownTimer",
  props: {
    isStart: {
      type: Boolean,
      default: false,
    },
    countDown: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      timerData: {
        0: `${this.$t("Start")}!`,
      },
      counter: this.countDown,
    };
  },
  methods: {
    countDownTimer() {
      if (this.counter > 0) {
        setTimeout(() => {
          this.counter -= 1;
          this.countDownTimer();
        }, 1000);

        return;
      }

      return this.$emit("end");
    },
  },
  created() {
    for (let index = this.countDown; index > 0; index--) {
      this.timerData[index] = index;
    }

    if (this.isStart) this.countDownTimer();
  },
};
</script>

<style lang="scss" scoped>
.countdown-timer {
  @apply font-quicksand text-white;
  font-weight: 700;
  font-size: 150px;

  &-wrapper {
    @apply flex w-full justify-center items-center h-full bg-purple-800 mx-auto;
    height: 200px;
  }
}
</style>
