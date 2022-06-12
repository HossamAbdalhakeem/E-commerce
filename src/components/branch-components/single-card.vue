<template>
  <div>
    <v-card v-if="SingleOneCart" class="mx-auto pa-5">
      <closeDialog @closeDialog="$emit('close')"></closeDialog>
      <v-row>
        <v-col cols="7" class="pa-0">
          <div class="img-container">
            <img
              :src="SingleOneCart.ProductImage"
              width="280"
              height="250"
              class="rounded-lg"
            />
          </div>
        </v-col>

        <v-col cols="5" class="text-center pa-0">
          <v-card-title>
            <h5 class="mx-auto">{{ SingleOneCart.ProductTitle }}</h5>
          </v-card-title>
          <h6 class="text-decoration-line-through">
            $ {{ SingleOneCart.priceBeforeDiscount }}
          </h6>
          <h3 v-if="SingleOneCart.newPrice">$ {{ SingleOneCart.newPrice }}</h3>
          <h6 v-else>$ {{ SingleOneCart.priceAftereDiscount }}</h6>
          {{ SingleOneCart.discription }}
          <div>
            <v-icon @click="minusQuantity(SingleOneCart)"
              >mdi-minus-box-outline</v-icon
            >
            {{ SingleOneCart.quantity }}

            <v-icon @click="plusQuantity(SingleOneCart)"
              >mdi-plus-box-outline</v-icon
            >
          </div>
        </v-col>
      </v-row>
      <v-card-actions class="mt-5">
        <div class="mx-auto btns">
          <v-btn
            @click="$emit('close')"
            class="black white--text text-capitalize"
            >continue shopping</v-btn
          >
          <v-btn
            @click="toAllCart"
            class="black white--text text-capitalize px-16"
            >view cart</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["SingleOneCart"],
  computed: {
    getmycart() {
      return this.$store.getters.allmyCart;
    },
  },
  methods: {
    toAllCart() {
      this.$router.push({ path: "/allCart" });
    },
    plusQuantity(item) {
      let filterIdCart = this.getmycart.find((e) => {
        return (e.productsId = item.productsId);
      });
      let Quantity = item.quantity;
      Quantity = Quantity + 1;
      console.log(Quantity);
      let total = item.priceAftereDiscount;
      let newPrice = total * Quantity;
      console.log(newPrice);
      this.$emit("editCartQuantity", Quantity);
      this.$emit("editCartNewPrice", newPrice);
      this.$store.dispatch("editCartQuantity", {
        newQuantity: Quantity,
        totalPrice: newPrice,
        id: filterIdCart.cartId,
      });
      this.$store.dispatch("getAllCart");
    },
    minusQuantity(item) {
      let filterIdCart = this.getmycart.find((e) => {
        return (e.productsId = item.productsId);
      });
      console.log(item);
      if (item.quantity > 1) {
        let Quantity = item.quantity;
        Quantity = Quantity - 1;
        let total = item.priceAftereDiscount;
        let newPrice = item.newPrice - total;
        this.$emit("editCartQuantity", Quantity);
        this.$emit("editCartNewPrice", newPrice);
        this.$store.dispatch("editCartQuantity", {
          newQuantity: Quantity,
          totalPrice: newPrice,
          id: filterIdCart.cartId,
        });
        this.$store.dispatch("getAllCart");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  gap: 1rem;
  button {
    width: 9.5rem;
  }
}
.img-container {
  // width: 18rem;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
