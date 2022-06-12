<template>
  <v-app>
    <v-container>
      <section v-if=" userCart.length > 0" class="mt-16">
        <h3 class="mt-10 mb-5 text-center text-uppercase">Cart</h3>
        <carts :userCart="userCart" @openNoItem="noItem = true"></carts>
        <buyNow></buyNow>
      </section>
      <div>
        <v-progress-linear
          v-if="loadingData"
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="green"
          v-if="loadingData"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="teal"
          v-if="loadingData"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="cyan"
          v-if="loadingData"
        ></v-progress-linear>
      </div>
      <section class="no-item" v-if="!loadingData && userCart.length == 0">
        <v-icon x-large class="mb-2">mdi-alert-circle-outline</v-icon>
        <h2 class="text-capitalize">not item here</h2>
        <h2 class="text-capitalize">please go get more items in the cart</h2>
      </section>
    </v-container>
  </v-app>
</template>

<script>
import carts from "./branch-components/carts.vue";
import buyNow from "./branch-components/buyNowFromCart.vue";
export default {
  components: {
    carts,
    buyNow,
  },
  data() {
    return {
      noItem: false,
    };
  },
  mounted() {
    this.$store.dispatch("getAllCart");
  },
  computed: {
    userCart() {
      return this.$store.getters.allmyCart;
    },
    myorder() {
      return this.$store.getters.myorder;
    },
    loadingData() {
      return this.$store.getters.LoadingData;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-item {
  // display: none;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  h2 {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.54);
  }
}
</style>
