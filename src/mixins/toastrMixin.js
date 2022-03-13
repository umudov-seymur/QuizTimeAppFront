import Vue from "vue";

Vue.mixin({
  methods: {
    toastNotify(message, type = "success", timer = 5000) {
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
    confirmationDelete(callback) {
      this.$swal({
        title: this.$t("Are you sure?"),
        text: this.$t("You won't be able to revert this!"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("Yes, delete it!"),
        cancelButtonText: this.$t("Cancel"),
      }).then((result) => {
        if (!result.isConfirmed) return;
        callback();
      });
    },
  },
});
