import Vue from "vue";

Vue.mixin({
  methods: {
    toastrNotify(message, type = "success", timer = 5000) {
      this.$swal({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        icon: type,
        title: message,
        timer: timer,
        timerProgressBar: true,
      });
    },
  },
});
