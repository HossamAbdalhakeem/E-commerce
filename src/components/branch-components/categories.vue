<template>
  <div>
    <section>
      <div>
        <h3 class="text-center mt-16">OUR CATEGORIES</h3>
        <p class="pa-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque neque
          fugiat praesentium ipsum perspiciatis, ea dolores temporibus quasi
          eos. Quod aspernatur cupiditate blanditiis dolore quaerat animi
          aperiam quam voluptate sapiente.
        </p>
      </div>
    </section>
    <section>
      <div class="categories">
        <div v-for="(item, index) in Categories" :key="index">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="mb-3 mt-3 categoriesContent"
                width="300"
                height="200"
                @click="toProductsInCategory(item)"
              >
                <!-- <v-card-title>{{ item.categoryTitle }}</v-card-title> -->
                <img :src="item.categoryImage" height="200" width="300" />
                <v-card-text>
                  <!-- <h5>{{ item.categoryName }}</h5> -->
                </v-card-text>

                <v-expand-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    class="transition-fast-in-fast-out black v-card--reveal"
                  >
                    <h3>{{ item.categoryTitle }}</h3>
                  </v-overlay>
                </v-expand-transition>
              </v-card>
            </template>
          </v-hover>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    Categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    toProductsInCategory(category) {
      this.$router.push({ path: "/selecteCategory/" + category.CategoriesId });
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.categoriesContent {
  cursor: pointer;
}
</style>
