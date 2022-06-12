<template>
  <v-app class="pt-16">
    <v-container>
      <v-dialog v-model="DialogDeleteFivourite" width="500" persistent>
        <deleteItemConfirmMsg
          @submit="sureDeleteItemFivourite"
          @closeDeleteDilog="DialogDeleteFivourite = false"
          content="this product from fivourite"
        ></deleteItemConfirmMsg>
      </v-dialog>
      <section class="fivourite" v-if="myFivourite.length > 0">
        <h2 class="text-center mt-10 mb-5 text-capitalize">fivourite</h2>
        <v-card
          class="mb-10 pa-3"
          v-for="(item, index) in myFivourite"
          :key="index"
        >
          <div class="d-flex justify-content-end pa-2 d-block">
            <v-btn icon @click="openDilogDeleteFivourite(item)">
              <v-icon class="black--text">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="fivourite-container">
            <div class="imgfivourite" v-if="item">
              <div class="img-container">
                <img
                  v-if="item.ProductImage"
                  :src="item.ProductImage"
                  class="rounded-lg"
                />
              </div>
            </div>
            <div class="informationfivourite text-center">
              <v-card-title>
                <h2 class="mx-auto text-capitalize titleProducts mb-5">
                  {{ item.ProductTitle }}
                </h2>
              </v-card-title>
              <v-row>
                <v-col cols="6" class="pa-0">
                  <p class="ma-0">priceBeforeDiscount:</p>
                  <p class="ma-0">priceAftereDiscount:</p>
                  <p class="ma-0" v-if="item.newPrice">newPrice:</p>
                  <div>discription:</div>
                </v-col>
                <v-col cols="6" class="pa-0 pr-2">
                  <div class="PricesProducts">
                    <h6 class="text-decoration-line-through">
                      $ {{ item.priceBeforeDiscount }}
                    </h6>
                    <h6>$ {{ item.priceAftereDiscount }}</h6>
                    <h3 v-if="item.newPrice">$ {{ item.newPrice }}</h3>
                  </div>
                  <div>{{ item.discription }}</div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="addCart d-flex mt-5">
            <v-btn
              class="success"
              :id="'ts' + item.productsId"
              @click="addToCart(item)"
              :loading="loading"
              >add to cart</v-btn
            >
            <p :id="'as' + item.productsId" class="text-capitalize"></p>
            <!-- <v-alert
                outlined
                type="error"
                prominent
                v-if="showAlert"
                :id="'as' + item.productsId"
              >
              </v-alert> -->
          </div>
        </v-card>
      </section>
      <div>
        <v-progress-linear
          v-if="loadingData"
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="green"
          v-if="loadingData"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="teal"
          v-if="loadingData"
        ></v-progress-linear>
        <br />
        <v-progress-linear
          indeterminate
          color="cyan"
          v-if="loadingData"
        ></v-progress-linear>
      </div>
      <section class="no-item" v-if="!loadingData && myFivourite.length == 0">
        <v-icon x-large class="mb-2">mdi-alert-circle-outline</v-icon>
        <h2 class="text-capitalize">not item here</h2>
        <h2 class="text-capitalize">
          please go get more items in the Fivourite
        </h2>
      </section>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false,
      DialogDeleteFivourite: false,
      singleDataFivourite: null,
    };
  },
  computed: {
    myFivourite() {
      return this.$store.getters.getFivourite;
    },
    loadingData() {
      return this.$store.getters.LoadingData;
    },
    allproducts() {
      return this.$store.getters.getallproduct;
    },
    userCart() {
      return this.$store.getters.allmyCart;
    },
    currentuser() {
      return this.$store.getters.user;
    },
    loading() {
       return this.$store.getters.Loading;
    }
  },
  mounted() {
    this.$store.dispatch("getFivourite");
  },
  methods: {
    openDilogDeleteFivourite(item) {
      this.singleDataFivourite = item;
      this.DialogDeleteFivourite = true;
    },
    sureDeleteItemFivourite() {
      this.$store
        .dispatch("deleteFivourite", this.singleDataFivourite)
        .then(() => {
          this.DialogDeleteFivourite = false;
          this.ToasteSuccessMsg("The product has been removed from your favourites")
        });
    },
    addToCart(item) {
      console.log(item);
      let getBtn = document.getElementById("ts" + item.productsId);
      let getFeedBack = document.getElementById("as" + item.productsId);
      let checkAllProduct = this.allproducts.some((e) => {
        return e.productsId == item.productsId;
      });
      let checkCart = this.userCart.some((e) => {
        return e.productsId == item.productsId;
      });
      if (checkAllProduct && !checkCart) {
        this.$store.dispatch("addToCart", item).then(() => {
          this.ToasteSuccessMsg("added to your cart")
        })
        this.$store.dispatch("getAllCart");
        this.$store.dispatch("deleteFivourite", item);
      } else {
        getBtn.innerText = "can't added it !";
        getBtn.style.backgroundColor = "black";
        // this.showAlert = true;
        getFeedBack.classList.add("showErorr");
      }
      if (!checkAllProduct) {
        getFeedBack.innerText =
          "Because This product has been completely sold out Find more products !";
      } else if (checkCart) {
        getFeedBack.innerText =
          "Because this product is already in your cart !";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addCart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.showErorr {
  color: red;
  border: 1px solid red;
  padding: 10px 7px;
  border-radius: 10px;
}

.fivourite-container {
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .imgfivourite {
    width: 50%;
    @media (max-width: 992px) {
      width: 100%;
    }
    .img-container {
      height: 20rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .informationfivourite {
    @media (max-width: 992px) {
      width: 100%;
    }
    width: 50%;
  }
}
.no-item {
  // display: none;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  h2 {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.54);
  }
}
</style>
