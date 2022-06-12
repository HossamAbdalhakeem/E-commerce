<template>
  <div>
    <v-app-bar color="white" class="nav" absolute>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-navigation-drawer
        temporary
        class="black pt-5 pb-5"
        dark
        v-model="drawer"
        height="100vh"
        absolute
        bottom
      >
        <drawer @logout="logout"></drawer>
      </v-navigation-drawer>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
          class="font-weight-bold titleProject"
        >
          KOOVS
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="toolbar-item">
        <categoriesInNvbar @seeMore="seeMore"></categoriesInNvbar>
        <productsInNavbar @seeMore="seeMore"></productsInNavbar>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-if="userisregister"
        class="d-flex justify-center align-center mr-3 "
      >
        <v-btn to="/profile" icon class="hiddenFromNav">
          <img
            v-if="userisregister.image"
            :src="userisregister.image"
            width="40"
            height="40"
            class="rounded-circle"
          />
          <v-icon v-else large>mdi-account-circle</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="!userisregister">
        <v-btn
          text
          small
          outlined
          class="white text-capitalize"
          v-for="item in menuitems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="icons">{{ item.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn class=" mr-2" icon x-large to="fivourite">
          <v-icon class="red--text">mdi-heart</v-icon>
          <p class="orange rounded-circle contentCart">
            {{ myFivourite.length }}
          </p>
        </v-btn>
        <v-btn class=" mr-2" icon x-large to="allCart">
          <v-icon>mdi-cart</v-icon>
          <p class="orange  rounded-circle contentCart">
            {{ cardQuantity }}
          </p>
        </v-btn>
        <v-btn @click="logout" text small outlined v-if="userisregister">
          <v-icon class="icons">exit_to_app</v-icon>
          <v-list-item-title class="titls">Logout</v-list-item-title>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import categoriesInNvbar from "./branch-components/CategoreisInNavbar.vue";
import productsInNavbar from "./branch-components/productsInNavbar.vue";
import drawer from "./branch-components/drawer.vue";
export default {
  components: {
    categoriesInNvbar,
    productsInNavbar,
    drawer,
  },
  data() {
    return {
      drawer: false,
      lastPrice: null,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    },

    ToAllCart() {
      this.$router.push({ path: "/allCart" });
    },
    seeMore() {
      if (this.$router.history.current.name === "shopingMain") {
        this.$router.push({ path: "/" }).then(() => {
          this.$router.push({ path: "shopingMain" });
        });
      } else {
        this.$router.push({ path: "/shopingMain" });
      }
    },
  },
  computed: {
    cardQuantity() {
      return this.$store.getters.sendQuantity;
    },
    userisregister() {
      return this.$store.getters.user;
    },
    myFivourite() {
      return this.$store.getters.getFivourite;
    },
    menuitems() {
      let menuitem = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Login", link: "/login" },
      ];

      return menuitem;
    },

    menuitemsDrawer() {
      let menuitem = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Login", link: "/login" },
        { icon: "mdi-account-circle", title: "Profile", link: "/profile" },
      ];

      return menuitem;
    },
    getmycart() {
      return this.$store.getters.allmyCart;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 15px;
}
.nav .v-toolbar__content {
  width: 100% !important;
}

.icons {
  font-size: 25px;
}

.titls {
  font-size: 13px;
}
.nav {
  height: 100px;
}
.toolbar-item {
  width: 33.3%;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
}
.toolbar-item div {
  cursor: pointer;
}

.titleProject {
  letter-spacing: 3px;
  font-size: 1.2rem;
}
.contentCart {
  position: absolute;
  left: 30px;
  width: 25px;
  height: 25px;
  text-align: center;
  padding-top: 3px;
}
.logout {
  border: none;
}
.hiddenFromNav {
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
