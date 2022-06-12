<template>
  <v-app class="white--text">
    <template class="testing">
      <v-footer dark padless>
        <v-card flat tile class="indigo lighten-1 white--text text-center pt-5">
          <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
            Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
            accumsan id ultrices nunc. Sed at orci sed massa consectetur
            dignissim a sit amet dui. Duis commodo vitae velit et faucibus.
            Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum
            ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel
            diam elementum tempor vel ut orci. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </v-card-text>
          <v-row class="d-none">
            <v-col cols="3">
              <h3 class="text-uppercase font-bold">Categories</h3>
              <h5 class="content" @click="toAllCategories">all Categories</h5>
              <div v-for="(item, index) in Categories" :key="index">
                <h5 class="content" @click="toSingleCategories(item)">
                  {{ item.categoryName }}
                </h5>
              </div>
            </v-col>
            <v-col cols="3">
              <h3 class="text-uppercase font-bold">products</h3>
              <h5 class="content" @click="toAllCategories">all products</h5>
              <div v-for="(item, index) in allProducts" :key="index">
                <h5 class="content" @click="TosingleProduct(item)">
                  {{ item.ProductTitle }}
                </h5>
              </div>
            </v-col>
          </v-row>
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-text class="white--text">
            <strong>
              copyright {{ new Date().getFullYear() }} — KOOVS. all right
              reserve</strong
            >
          </v-card-text>
        </v-card>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  computed: {
    Categories() {
      return this.$store.getters.categories;
    },
    allProducts() {
      return this.$store.getters.getallproduct;
    },
  },
  methods: {
    toAllCategories() {
      this.$router.push({ path: "/shopingMain" });
    },
    toSingleCategories(category) {
      this.$router.push({ path: "/selecteCategory/" + category.CategoriesId });
    },
    TosingleProduct(item) {
      this.$router.push({ path: "/singleProduct/" + item.productsId });
    },
  },
};
</script>

<style lang="scss" >
.content {
  cursor: pointer;
}
</style>