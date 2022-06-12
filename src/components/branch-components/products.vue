<template>
  <div>
    <section>
      <h3 class="text-center mt-16">OUR PRODUCTS</h3>
      <p class="pa-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque neque
        fugiat praesentium ipsum perspiciatis, ea dolores temporibus quasi eos.
        Quod aspernatur cupiditate blanditiis dolore quaerat animi aperiam quam
        voluptate sapiente.
      </p>
    </section>
    <section>
      <div class="products">
        <div v-for="(item, index) in products" :key="index">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="ma-4 pb-3"
                width="300"
                @click.stop="toSingleProduct(item)"
              >
                <div class="text-center">
                  <v-card-text class="pa-0">
                    <img
                      :src="item.ProductImage"
                      width="100%"
                      height="215"
                      class="mb-3 rounded-t-lg"
                    />
                    <v-card-title>
                      <h5 class="mx-auto">{{ item.ProductTitle }}</h5>
                    </v-card-title>
                    <h6 class="text-decoration-line-through">
                      $ {{ item.priceBeforeDiscount }}
                    </h6>
                    <h6>$ {{ item.priceAftereDiscount }}</h6>
                    {{ item.productsId }}
                    <v-rating
                      :value="3"
                      dense
                      color="orange"
                      background-color="orange"
                      hover
                      class="mr-2"
                    ></v-rating>
                  </v-card-text>
                  <v-expand-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      class="
                        transition-fast-in-fast-out
                        darken-2
                        v-card--reveal
                      "
                      style="height: 53%"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-btn
                            @click.stop="addToCart(item)"
                            large
                            class="black white--text text-capitalize ml-6 cartBtn"
                            :id="'ts' + item.productsId"
                          >
                            <v-icon small>mdi-cart</v-icon>
                            {{ checkCart(item) ? "in cart" : "add to cart" }}
                          </v-btn></v-col
                        >
                        <v-col cols="4" offset="2">
                          <div class="information">
                            <v-icon
                              class="d-block mb-2"
                              @click.stop="addToFavourtie(item)"
                              :class="{
                                'red--text': fivouritecolor(item) == true,
                              }"
                              >mdi-heart</v-icon
                            >
                            <v-icon @click.stop="showSingleProduct(item)"
                              >mdi-eye</v-icon
                            >
                          </div>
                        </v-col>
                      </v-row>
                    </v-overlay>
                  </v-expand-transition>
                </div>
              </v-card>
            </template>
          </v-hover>
        </div>
        <!-- <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="page * limit"
              circle
            >
            </v-pagination>
          </div>
        </template> -->
      </div>
    </section>
  </div>
</template>

<script>
// import { limit } from "../../firebase";
export default {
  data() {
    return {
      page: 1,
      pageSize: 1,
    };
  },
  props: ["products"],
  computed: {
    myFivourite() {
      return this.$store.getters.getFivourite;
    },
    getmycart() {
      return this.$store.getters.allmyCart;
    },
    currentUser() {
      return this.$store.getters.user;
    },
      successReq() {
      return this.$store.getters.SuccessReq;
    },
  },
  methods: {
    toSingleProduct(item) {
      this.$router.push({ path: "/singleProduct/" + item.productsId });
    },
    showSingleProduct(item) {
      let singleProduct = { ...item };
      this.$emit("singleproduct", singleProduct);
      this.$emit("openSingleProduct");
    },
    addToFavourtie(item) {
      if (this.currentUser) {
        if (this.fivouritecolor(item)) {
          this.disabled = true;
          console.log("this on Fivourite");
        } else {
          this.$store.dispatch("addFivourite", item).then(() => {
             this.ToasteSuccessMsg("added to your favourites")
          })
         
          console.log("avalible");
        }
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    fivouritecolor(item) {
      let s = this.myFivourite.some((i) => {
        return i.productsId == item.productsId;
      });
      return s;
    },
    checkCart(item) {
      let findMyCart = this.getmycart.some((e) => {
        return e.productsId == item.productsId;
      });
      return findMyCart;
    },
    addToCart(item) {
      if (this.currentUser) {
        if (this.checkCart(item)) {
          let button = document.getElementById("cartBtn");
          button.disabled = true;
        } else {
          this.$emit("openSingleCart");
          let singlecart = { ...item };
          this.$emit("singleCart", singlecart);
          this.$store.dispatch("addToCart", item).then(() => {
            this.ToasteSuccessMsg("added to your cart")
          })
          this.$store.dispatch("getAllCart");
        }
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.information {
  position: absolute;
  bottom: 50px;
  left: 75px;
}
</style>
