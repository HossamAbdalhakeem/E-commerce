<template>
  <div>
    <v-list v-if="user">
      <v-list-item>
        <v-list-item-avatar class="mx-auto cusrsor" @click="profile">
          <img
            v-if="user.image"
            :src="user.image"
            width="40"
            height="40"
            class="rounded-circle"
          />
          <v-icon v-else large>mdi-account-circle</v-icon>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content @click="profile" class="pa-0">
          <v-list-item-title>
            <h6 class="text-center">{{ user.name }} {{ user.lastname }}</h6>
          </v-list-item-title>
          <v-list-item-subtitle>
            <p class="text-center ma-0">
              {{ user.email }}
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div v-if="user">
      <v-list nav dense v-if="user.email === 'jdlfdmkfdfj@gmail.com'">
        <v-list-item link v-for="(list, i) in listToUrl" :key="i">
          <v-list-item-icon>
            <v-icon>{{ list.icons }}</v-icon>
          </v-list-item-icon>
          <router-link :to="list.to">
            <p class="m-0 text-capitalize">{{ list.title }}</p>
          </router-link>
        </v-list-item>
      </v-list>
    </div>
    <v-list>
      <v-list-item link @click="mainShopping">
        <v-list-item-icon>
          <v-icon>mdi-basket-outline</v-icon>
        </v-list-item-icon>
        <h6 class="ma-0 text-capitalize">go shpping</h6>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item link v-for="(CategoryItem, i) in Categories" :key="i">
        <div class="d-flex" @click="toSingleCategory(CategoryItem)">
          <v-list-item-icon class="mr-3">
            <img
              :src="CategoryItem.categoryImage"
              class="circle"
              height="50"
              width="50"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <p class="ma-0">{{ CategoryItem.categoryTitle }}</p>
          </v-list-item-content>
        </div>
      </v-list-item>
    </v-list>
    <div v-if="user" class="ml-7">
      <v-icon class="mr-4">mdi-lock-open</v-icon>
      <v-btn class="logout" @click="$emit('logout')">Logout</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    Categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    profile() {
      if (this.$router.history.current.name === "profile") {
        this.$router.push({ path: "/" }).then(() => {
          this.$router.push({ path: "profile" });
        });
      } else {
        this.$router.push({ path: "/profile" });
      }
    },
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
    mainShopping() {
      if (this.$router.history.current.name == "shopingMain") {
        this.$router.push({ path: "/" }).then(() => {
          this.$router.push({ path: "/shopingMain" });
        });
      } else {
        this.$router.push({ path: "/shopingMain" });
      }
    },
  },
  data() {
    return {
      listToUrl: [
        { to: "/DashBoard", icons: "mdi-folder", title: "categories" },
        {
          to: "/products",
          icons: "mdi-account-multiple",
          title: "Products",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.cusrsor {
  cursor: pointer;
}
</style>
