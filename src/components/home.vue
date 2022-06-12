<template>
  <v-app>
    <v-container>
      <IntroductionHome></IntroductionHome>
      <categoryHome></categoryHome>
      <h2 id="testing">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo hic
        perferendis tempore veniam tempora velit dolor ullam fugiat vitae illo
        nam optio qui neque maxime id nostrum, amet at illum. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Explicabo hic perferendis tempore
        veniam tempora velit dolor ullam fugiat vitae illo nam optio qui neque
        maxime id nostrum, amet at illum.
      </h2>
      <ProductHome
        :products="allproducts"
        @openSingleCart="singleCart = true"
        @openSingleProduct="singleProduct = true"
        @singleCart="SingleOneCart = $event"
        @singleproduct="SingleOneProduct = $event"
      ></ProductHome>

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
    </v-container>
  </v-app>
</template>

<script>
import IntroductionHome from "./branch-components/Introduction-home.vue";
import categoryHome from "./branch-components/categories.vue";
import ProductHome from "./branch-components/products.vue";
import singleCard from "./branch-components/single-card.vue";
import SingleProduct from "./branch-components/single-product.vue";

export default {
  components: {
    IntroductionHome,
    categoryHome,
    ProductHome,
    singleCard,
    SingleProduct,
  },
  data() {
    return {
      singleCart: false,
      singleProduct: false,
      totalQuantity: 0,
      totalPrice: 0,
      SingleOneCart: {},
      SingleOneProduct: {},
    };
  },
  computed: {
    allproducts() {
      return this.$store.getters.getallproduct;
    },
  },
  methods: {
    onScroll() {
      let currentElemnt = document.getElementById("testing");
      let offset = currentElemnt.offsetTop;
      let height = currentElemnt.clientHeight;
      let offsetWithHeight = offset + height;
      console.log(offset);
      console.log(height);
      console.log(offsetWithHeight);
      const pageScroll = window.scrollY;
      console.log(pageScroll);
      if (pageScroll > offsetWithHeight) {
        window.alert("sometext");
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    // this.$store.dispatch("getAllCart");
    // this.$store.dispatch("getFivourite");
    // this.$store.dispatch("getAllProducts");
  },
};
</script>
<style lang="scss" scoped></style>
