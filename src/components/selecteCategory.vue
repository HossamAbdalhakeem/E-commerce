<template>
  <v-app class="mt-16">
    <div v-if="myCategories">
      <img
        v-if="myCategories.categoryImage"
        :src="myCategories.categoryImage"
        height="400"
        width="100%"
        class="mb-16"
      />
    </div>
    <!-- <h2 class="mx-auto">Products</h2> -->
    <products
      :products="ProductsInCategory"
      @openSingleCart="singleCart = true"
      @openSingleProduct="singleProduct = true"
      @singleCart="SingleOneCart = $event"
      @singleproduct="SingleOneProduct = $event"
    ></products>
    <section class="dialogs">
      <v-dialog v-model="singleCart" width="600" height="400" persistent>
        <singleCard
          @close="singleCart = false"
          :SingleOneCart="SingleOneCart"
          @editCartQuantity="SingleOneCart.quantity = $event"
          @editCartNewPrice="SingleOneCart.newPrice = $event"
        ></singleCard>
      </v-dialog>
      <v-dialog v-model="singleProduct" width="800" height="400" persistent>
        <SingleProduct
          @close="singleProduct = false"
          :SingleOneProduct="SingleOneProduct"
        ></SingleProduct>
      </v-dialog>
    </section>
  </v-app>
</template>

<script>
import { db } from "../firebase";
import products from "./branch-components/products.vue";
import singleCard from "./branch-components/single-card.vue"
import SingleProduct from "./branch-components/single-product.vue"
export default {
  props: ["id"],
  components: {
    products,
    singleCard,
    SingleProduct
  },
  data() {
    return {
      overlay: false,
      showSingleProduct: false,
      singleProduct: false,
      singleCart: false,
      ProductsInCategory: [],
      SingleOneProduct: {},
      SingleOneCart: {}
    };
  },
  computed: {
    Singleproduct() {
      return this.$store.getters.Singleproduct;
    },
    mySingleCart() {
      return this.$store.getters.singleCart;
    },
    myFivourite() {
      return this.$store.getters.getFivourite;
    },
    myCategories() {
      return this.$store.getters.getSingleCategory;
    },
    getmycart() {
      return this.$store.getters.allmyCart;
    },
  },
  mounted() {
      this.$store.dispatch("singleCategory", this.id);
    let products = null;
    let productsArray = [];
    db.collection("products")
      .where("selecteCatogery", "==", this.id)
      .get()
      .then((data) => {
        data.docs.forEach((oneOfProduct) => {
          products = oneOfProduct.data();
          console.log(products);
          products.productsId = oneOfProduct.id;
          productsArray.push(products);
        });
        this.ProductsInCategory = productsArray;
      });
  },
};
</script>
<style lang="scss" scoped></style>
