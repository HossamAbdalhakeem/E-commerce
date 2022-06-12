<template>
  <div>
    <section class="buy-now">
      <div class="d-flex justify-center">
        <v-btn class="success" @click="buynow" id="buy-btn">buy now</v-btn>
      </div>
      <v-dialog width="700" v-model="openBuy">
        <v-card class="pa-6">
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
          <v-card-title>
            <h2 class="text-center header text-capitalize">
              {{ currentTitle }}
            </h2>
          </v-card-title>
          <v-form v-model="valid">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text class="pb-0 mb-0">
                  <v-text-field
                    v-model="adddataInfo.address"
                    type="text"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="adddataInfo.country"
                    type="text"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="adddataInfo.city"
                    type="text"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="adddataInfo.phoneNum"
                    type="text"
                    outlined
                    dense
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <v-card
                  v-for="(item, index) in userCart"
                  :key="index"
                  class="mb-4 pa-4"
                >
                  <div class="items justify-content-around d-flex w-100">
                    <div class="item">
                      <h2>title</h2>
                      <p>{{ item.ProductTitle }}</p>
                    </div>
                    <div class="item">
                      <h2>Price</h2>
                      <p>{{ item.newPrice }}</p>
                    </div>
                    <div class="item">
                      <h2>quantity</h2>
                      <p>{{ item.quantity }}</p>
                    </div>
                    <div class="item">
                      <h2>Image</h2>
                      <img class="img-item" :src="item.ProductImage" />
                    </div>
                  </div>
                </v-card>
              </v-window-item>
              <v-window-item :value="3">
                <h2 class="text-center" v-if="userCart">{{ totalPriceCart }}</h2>
              </v-window-item>
            </v-window>
          </v-form>
          <v-card-actions class="pb-0 pt-0 d=flex justify-center">
            <v-btn :disabled="step === 1" text @click="step--">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="step === 3"
              color="primary"
              depressed
              v-if="step < 3"
              @click="step++"
            >
              Next
            </v-btn>
            <v-btn v-else class="success" :disabled="!valid" @click="savBuy"
              >buy</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div v-if="userCart">
        {{ totalPriceCart }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      openBuy: false,
      adddataInfo: {},
      valid: false,
      totalPrice: null,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Enter order information";
        case 2:
          return "Confirmation of your orders";
        case 3:
          return "Total Price";
        default:
          return "Enter your Information ";
      }
    },
    currentuser() {
      return this.$store.getters.user;
    },
    userCart() {
      return this.$store.getters.allmyCart;
    },
    totalPriceCart() {
      return this.$store.getters.totalPrice;
      
    }
  },
  mounted() {
    // let newArr = [];
    // this.userCart.forEach((e) => {
    //   newArr.push(e.newPrice);
    // });
    // console.log(newArr);
    // let total = newArr.reduce((one, two) => {
    //   console.log(one, two);
    //   return one + two;
    // });
    // this.totalPrice = total;
    // console.log(total);
  },
  methods: {
    buynow() {
      this.openBuy = true;
      this.adddataInfo = { ...this.currentuser };
      console.log(this.adddataInfo);
    },
    savBuy() {
      this.$store.dispatch("EditInfoUser", this.adddataInfo);
      console.log(this.currentuser);
      console.log(this.getmycart);
      let info = this.getmycart;
      console.log(info);
      let currentUser = this.currentuser;
      info.forEach((e) => {
        let myInfo = e;
        this.$store.dispatch("addOrder", {
          user: currentUser,
          product: myInfo,
          date: new Date(),
        });
        this.$store.dispatch("deleteCart", myInfo);
        this.$store.dispatch("getAllCart");
      });
      this.openBuy = false;
    },
    // totalPriceCart() {
    //   console.log(this.userCart);
    //   let newArr = [];
    //   this.userCart.forEach((e) => {
    //     newArr.push(e.newPrice);
    //   });
    //   console.log(newArr);
    //   let total = newArr.reduce((one, two) => {
    //     console.log(one, two);
    //     return one + two;
    //   });
    //   console.log(total);
    //   // let arr = [2, 5, 6];
    //   //    let total = arr.reduce((one, two) => {
    //   //   console.log(one, two);
    //   //   return one + two
    //   // });
    //   // console.log(total);
    // },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin: 0 auto;
}
.items {
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-item {
      width: 60px;
      height: 60px;
    }
    h2 {
      font-size: 1rem;
    }
  }
}
</style>
