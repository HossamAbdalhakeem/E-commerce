<template>
  <div>
    <div>
      <v-menu
        open-on-hover
        offset-y
        transition="scale-transition"
        origin="center center"
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="mr-10 mt-3 content text-center" v-bind="attrs" v-on="on">
            <h4 class="mb-0">Shop by</h4>
            <p class="text-uppercase">Categories</p>
          </div>
        </template>
        <div open-on-hover class="line"></div>
        <v-list class="d-flex pionter">
          <v-list-item
            v-for="(item, index) in categories.slice(0, 4)"
            :key="index"
          >
            <v-list-item-content @click="toSingleCategory(item)">
              <img :src="item.categoryImage" height="100" width="50" />
              <v-list-item-title class="text-center content">
                <h2 class="mb-0">{{ item.categoryTitle }}</h2>
              </v-list-item-title>
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
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    toSingleCategory(item) {
      if (this.$router.history.current.name == "selecteCategory") {
        this.$router.push({ path: "/" }).then(() => {
          console.log(this.$router.history.current.name);
          this.$router.push({ path: "/selecteCategory/" + item.CategoriesId });
          console.log(this.$router.history.current.name);
        });
      } else {
        this.$router.push({ path: "/selecteCategory/" + item.CategoriesId });
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
