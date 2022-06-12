<template>
  <v-app>
    <v-card class="pa-5">
      <v-row>
        <v-col cols="4" v-if="mySingleProduct">
          <img
            v-if="mySingleProduct.ProductImage"
            :src="mySingleProduct.ProductImage"
            width="280"
            height="250"
            class="rounded-lg mt-4"
          />
        </v-col>
        <v-col cols="8" class="text-center" v-if="mySingleProduct">
          <v-card-title>
            <h5 class="mx-auto text-uppercase">
              {{ mySingleProduct.ProductTitle }}
            </h5>
          </v-card-title>
          <h6 class="text-decoration-line-through">
            $ {{ mySingleProduct.priceBeforeDiscount }}
          </h6>
          <h6>$ {{ mySingleProduct.priceAftereDiscount }}</h6>
          {{ mySingleProduct.discription }}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            doloremque suscipit repellat alias, natus cumque. Modi ipsa numquam,
            minus eius veritatis eaque, dolorem delectus voluptatem itaque
            similique ullam doloribus reprehenderit?
          </p>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
import { db } from "../firebase";

export default {
  props: ["id"],
  data() {
    return {
      mySingleProduct: {},
    };
  },
  mounted() {
    let products = null;
    let productsArray = [];
    db.collection("products")
      .get()
      .then((data) => {
        data.docs.forEach((oneOfProducts) => {
          products = oneOfProducts.data();
          products.productsId = oneOfProducts.id;
          productsArray.push(products);
          productsArray.find((item) => {
             if (item.productsId == this.id) {
                 this.mySingleProduct = item            
             }
          });
        });
      });
  },
};
</script>

<style lang="scss" scoped></style>
