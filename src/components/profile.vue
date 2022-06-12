<template>
  <v-app class="mt-16">
    <v-container>
      <v-card v-if="currentuser" class="w-75 pa-5 mx-auto mt-4 mb-10">
        <div>
          <profileInformation :currentUser="currentuser"></profileInformation>
          <v-btn class="success mx-auto d-block" @click="openDialogInfo"
            >update information</v-btn
          >
          <v-dialog
            v-model="dialogInfo"
            width="500"
            v-if="mycurrentUser"
            persistent
          >
            <editProfile
              :updateUser="mycurrentUser"
              @closeDialogInfo="dialogInfo = false"
            ></editProfile>
          </v-dialog>
        </div>
      </v-card>
      <!-- <hr> -->
      <orders></orders>
      <fivourite v-if="currentuser"></fivourite>
      <allCart v-if="currentuser"></allCart>
    </v-container>
  </v-app>
</template>

<script>
import allCart from "../components/allCart.vue";
import fivourite from "../components/fivourite.vue";
import editProfile from "./branch-components/editProfile.vue";
import profileInformation from "./branch-components/profileInfo.vue";
import orders from "./branch-components/orders.vue";
export default {
  components: {
    allCart,
    fivourite,
    editProfile,
    profileInformation,
    orders,
  },
  data() {
    return {
      piceProfile: null,
      namePiceProfile: null,
      image: null,
      dialogInfo: false,
      mycurrentUser: null,
      userInfo: null,
    };
  },
  computed: {
    currentuser() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    // this.userInfo = { ...this.currentuser };
  },
  watch: {
    currentuser(newValue) {
      console.log("watching", newValue);
      this.mycurrentUser = { ...newValue };
      // this.userInfo = { ...newValue };
    },
  },
  methods: {
    openDialogInfo() {
      this.dialogInfo = true;
      this.mycurrentUser = { ...this.currentuser };
    },
  },
};
</script>

<style lang="scss">
.profile {
  flex-direction: column;
}
.v-application--wrap {
  min-height: auto;
}
button {
  border: none !important;
}
button:active {
  border: none !important;
}
</style>
