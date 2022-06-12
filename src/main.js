import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
import { auth } from "./firebase";
import { db } from "./firebase";
import closeDialog from "./components/branch-components/closeDialog.vue";
import Mixins from "./plugins/mixins";
import deleteItemConfirmMsg from "./components/branch-components/deleteItemConfirmMsg.vue";

// import VueResource from "vue-resource";u870
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import firebase from "firebase";
import VueGeoLocation from "vue-browser-geolocation";
Vue.mixin(Mixins);

import vuetify from "./plugins/vuetify";
import navbar from "@/components/navbar";
// import footer from "@/components/footer";
// import db from "./firebase";
Vue.use(VueGeoLocation);
Vue.component("navbar", navbar);
Vue.component("closeDialog", closeDialog);
Vue.component("deleteItemConfirmMsg", deleteItemConfirmMsg);
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});
// Vue.component("footer", footer);

// Vue.prototype.firebase = firebase
Vue.use(VueChatScroll);
// Vue.use(VueResource);
// Vue.http.options.root = "https://httprequest-test-44076.firebaseio.com/";
// Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,

  mounted() {
    auth.onAuthStateChanged((user) => {
      let datauser = null;
      if (user) {
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((e) => {
            console.log(e.data());
            datauser = e.data();
            console.log(datauser);
            this.$store.commit("setuser", datauser);
            this.$store.dispatch("autosigin", datauser);
            this.$store.dispatch("getAllCart");
            this.$store.dispatch("getFivourite");
            this.$store.dispatch("getOrder");
          });
      } else {
        console.log("there is no user");
      }
      this.$store.dispatch("getAllCategories");
      this.$store.dispatch("getAllProducts");
    });
  },
}).$mount("#app");
// let app = "";
// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {

//   }
// });
