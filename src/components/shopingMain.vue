<template>
  <v-app>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in Categories"
        :key="i"
        :src="item.categoryImage"
        @click="singleCategory(item)"
        class="imgCategories"
      ></v-carousel-item>
    </v-carousel>
    <div class="mt-5 mb-10">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-center">
            <h5 class="text-uppercase">explore all sections</h5>
          </v-expansion-panel-header>
          <div class="d-flex justify-content-around">
            <v-expansion-panel-content
              class="cusrsorContent"
              v-for="(item, i) in Categories.slice(0, 5)"
              :key="i"
            >
              <div @click="singleCategory(item)">
                <img :src="item.categoryImage" width="100" height="100" />
                <h5 class="text-center mt-3">
                  {{ item.categoryName }}
                </h5>
              </div>
            </v-expansion-panel-content>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="main-container mx-auto ">
      <v-row>
        <v-col cols="12" md="3" class="pa-0 mt-16">
          <v-radio-group v-model="radioGroup" class="ml-5 radio">
            <v-radio
              v-for="(item, index) in Categories"
              :key="index"
              :label="item.categoryName"
              :value="item.CategoriesId"
            ></v-radio>
            <v-radio label="All"></v-radio>
          </v-radio-group>
          <v-autocomplete
            class="autocomplete"
            rounded
            solo
            dense
            :items="Categories"
            item-text="categoryName"
            item-value="CategoriesId"
            v-model="radioGroup"
            label="Select Category"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="9">
          <products
            :products="FilteredProducts"
            @openSingleCart="singleCart = true"
            @openSingleProduct="singleProduct = true"
            @singleCart="SingleOneCart = $event"
            @singleproduct="SingleOneProduct = $event"
          ></products>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="singleCart" width="700" height="400" persistent>
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
  </v-app>
</template>

<script>
import { db } from "../firebase";
import products from "./branch-components/products.vue";
import singleCard from "./branch-components/single-card.vue";
import SingleProduct from "./branch-components/single-product.vue";
export default {
  components: {
    products,
    singleCard,
    SingleProduct,
  },
  data() {
    return {
      panel: [0, 1],
      radioGroup: null,
      singleCart: false,
      SingleOneCart: {},
      SingleOneProduct: {},
      allproducts: [],
      FilteredProducts: [],
      singleProduct: false,
      selecteAllProduct: null,
    };
  },
  computed: {
    Categories() {
      return this.$store.getters.categories;
    },
  },
  watch: {
    radioGroup(newvalue) {
      // console.log(newvalue);
      // this.FilteredProducts = this.allproducts.filter((data) => {
      //   console.log(newvalue);
      //   console.log(typeof newvalue);
      //   return data.selecteCatogery === newvalue;
      // });
      // if (typeof newvalue === "number" || "object") {
      //   this.FilteredProducts = this.allproducts;
      //   return this.FilteredProducts;
      // }
      if (newvalue) {
        this.FilteredProducts = this.allproducts.filter((data) => {
          return data.selecteCatogery === newvalue;
        });
      } else {
        this.FilteredProducts = this.allproducts;
        return this.FilteredProducts;
      }
    },
  },
  methods: {
    singleCategory(category) {
      this.$router.push({ path: "/selecteCategory/" + category.CategoriesId });
    },
  },

  mounted() {
    let products = null;
    db.collection("products")
      .get()
      .then((data) => {
        data.docs.forEach((res) => {
          products = res.data();
          products.productsId = res.id;
          this.allproducts.push(products);
          this.FilteredProducts.push(products);
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 90%;
}
.cusrsorContent {
  cursor: pointer;
}
.imgCategories {
  object-fit: contain;
  width: 70%;
  margin: 0 auto;
  cursor: pointer;
}
.radio {
  @media (max-width: 768px) {
    display: none;
  }
}
.autocomplete {
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}
.theme--light.v-expansion-panels .v-expansion-panel {
  @media (max-width: 500px) {
    display: none;
  }
}
</style>
