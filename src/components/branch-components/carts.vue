<template>
  <div>
    <section class="cart">
      <v-card v-for="(item, index) in userCart" :key="index" class="pa-6 mb-5">
        <div class="d-flex justify-content-end pa-2 d-block">
          <v-btn icon @click="openDilogDeleteItem(item)">
            <v-icon class="black--text">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="cart-container">
          <div class="imgCart" v-if="item">
            <div class="img-container">
              <img
                v-if="item.ProductImage"
                :src="item.ProductImage"
                class="rounded-lg"
              />
            </div>
          </div>
          <div class="informationCart text-center">
            <v-card-title>
              <h2 class="mx-auto text-capitalize titleProducts mb-5">
                {{ item.ProductTitle }}
              </h2>
            </v-card-title>
            <v-row>
              <v-col cols="6" class="ContentCarts pa-0">
                <p class="ma-0">oldPrice:</p>
                <p class="ma-0" v-if="item.newPrice">totalPrice:</p>
                <p class="ma-0" v-else>priceAftereDiscount:</p>
                <div>discription:</div>
              </v-col>
              <v-col cols="6" class="pa-0 pr-2">
                <div class="PricesProducts">
                  <h6 class="text-decoration-line-through">
                    $ {{ item.priceBeforeDiscount }}
                  </h6>
                  <h3 v-if="item.newPrice">$ {{ item.newPrice }}</h3>
                  <h6 v-else>$ {{ item.priceAftereDiscount }}</h6>
                </div>
                <div>{{ item.discription }}</div>
              </v-col>
            </v-row>
            <div class="mt-10">
              <v-icon large @click="minusQuantity(item)" class="mr-10"
                >mdi-minus-box-outline</v-icon
              >
              <span class="quantity">{{ item.quantity }}</span>
              <v-icon large @click="plusQuantity(item)" class="ml-10"
                >mdi-plus-box-outline</v-icon
              >
            </div>
          </div>
        </div>
      </v-card>
      <v-dialog v-model="DialogDelete" width="500" persistent>
        <deleteItemConfirmMsg
          @submit="sureDeleteItem"
          @closeDeleteDilog="DialogDelete = false"
          content="this product from Cart"
        ></deleteItemConfirmMsg>
      </v-dialog>
    </section>
  </div>
</template>

<script>
export default {
  props: ["userCart"],
  data() {
    return {
      DialogDelete: false,
      ItemDataDelete: null,
    };
  },
  methods: {
    plusQuantity(item) {
      console.log(item);
      let Quantity = item.quantity;
      Quantity = Quantity + 1;
      let total = item.priceAftereDiscount;
      let newPrice = total * Quantity;
      console.log(item.priceAftereDiscount);
      this.$store.dispatch("editCartQuantity", {
        newQuantity: Quantity,
        totalPrice: newPrice,
        id: item.cartId,
      });
      this.$store.dispatch("getAllCart");
    },
    minusQuantity(item) {
      if (item.quantity > 1) {
        let Quantity = item.quantity;
        Quantity = Quantity - 1;
        let total = item.priceAftereDiscount;
        let newPrice = item.newPrice - total;
        this.$store.dispatch("editCartQuantity", {
          newQuantity: Quantity,
          totalPrice: newPrice,
          id: item.cartId,
        });
        this.$store.dispatch("getAllCart");
      }
    },
    openDilogDeleteItem(item) {
      this.ItemDataDelete = item;
      this.DialogDelete = true;
    },
    sureDeleteItem() {
      this.$store.dispatch("deleteCart", this.ItemDataDelete).then(() => {
        this.DialogDelete = false;
        this.$store.dispatch("getAllCart");
           this.ToasteSuccessMsg("The product has been removed from your cart")
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.quantity {
  font-size: 20px;
}
* {
  font-size: 18px;
}
.PricesProducts {
  color: rgb(91, 91, 91);
}
.titleProducts {
  font-weight: bold;
  font-family: "Gill Sans", sans-serif;
}
.ContentCarts {
  font-family: cursive;
  font-size: 10px;
}
.cart-container {
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .imgCart {
    width: 50%;
    @media (max-width: 992px) {
      width: 100%;
    }
    .img-container {
      height: 20rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .informationCart {
    @media (max-width: 992px) {
      width: 100%;
    }
    width: 50%;
  }
}
</style>
