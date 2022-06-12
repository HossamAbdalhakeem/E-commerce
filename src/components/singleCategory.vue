<template>
  <v-app>
    <div v-if="myCategories">
      <img
        v-if="myCategories.categoryImage"
        :src="myCategories.categoryImage"
        height="400"
        width="100%"
        class="mb-16"
      />
    </div>
    <v-container>
      <div class="d-flex justify-content-between">
        <v-card
          width="300"
          v-for="(item, index) in myproductsInThisCategory"
          :key="index"
        >
          <img
            v-if="item.ProductImage"
            :src="item.ProductImage"
            width="100%"
            height="200"
          />
          <div class="text-center">
            <v-card-title>
              <h5 class="mx-auto">{{ item.ProductTitle }}</h5>
            </v-card-title>
            <h6 class="text-decoration-line-through">
              $ {{ item.priceBeforeDiscount }}
            </h6>
            <h6>$ {{ item.priceAftereDiscount }}</h6>
            <p>{{ item.discription }}</p>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.$router);
    this.$store.dispatch("singleCategory", this.id);
    this.$store.dispatch("getSingleProduct", this.id);
  },
  computed: {
    myCategories() {
      return this.$store.getters.getSingleCategory;
    },
    myproductsInThisCategory() {
      return this.$store.getters.products;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>