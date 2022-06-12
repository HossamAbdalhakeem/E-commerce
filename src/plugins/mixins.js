import FormRules from "./form-ruls.js";

export default {
  data() {
    return {
      allRules: FormRules,
    };
  },
  methods: {
    ToasteSuccessMsg(msg) {
      this.$dialog.notify.success(msg, {
        position: "bottom-right",
        timeout: 3000,
      });
    },
    toastErrorMsg(msg) {
      this.$dialog.notify.error(msg, {
        position: "bottom-right",
        timeout: 3000,
      });
    },
  },
};
