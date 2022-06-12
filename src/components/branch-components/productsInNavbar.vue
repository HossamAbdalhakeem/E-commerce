<template>
  <div>
    <div class="text-center">
      <v-menu
        open-on-hover
        offset-y
        transition="scale-transition"
        origin="center center"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="mr-10 mt-3 content" v-bind="attrs" v-on="on">
            <h4 class="mb-0">Shop by</h4>
            <p>PRODUCTS</p>
          </div>
        </template>
        <div open-on-hover class="line"></div>

        <v-list class="d-flex pionter">
          <v-list-item
            v-for="(item, index) in allproducts.slice(0, 4)"
            :key="index"
          >
            <v-list-item-content @click="toSingleproduct(item)">
              <img :src="item.ProductImage" height="100" width="30" />
              <v-list-item-title class="text-center content">{{
                item.ProductTitle
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <a @click="$emit('seeMore')" class="see-all">
            <v-icon>mdi-arrow-right-top</v-icon>
            see more</a
          >
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allproducts() {
      return this.$store.getters.getallproduct;
    },
  },
  methods: {
    toSingleproduct(item) {
      console.log(item.productsId);
      if (this.$router.history.current.name == "singleProduct") {
        this.$router.push({ path: "/" }).then(() => {
          console.log(this.$router.history.current.name);
          this.$router.push({ path: "/singleProduct/" + item.productsId });
          console.log(this.$router.history.current.name);
        });
      } else {
        this.$router.push({ path: "/singleProduct/" + item.productsId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content:hover {
  color: rgb(120, 120, 120);
}
.pionter {
  cursor: pointer;
}
.see-all {
  display: flex;
  align-items: center;
  padding-right: 20px;
  text-transform: capitalize;
  text-decoration: none;
}
.line {
  height: 10px;
  background: black;
  width: 90px;
}
* {
  font-size: 0.9375rem;
}
</style>
