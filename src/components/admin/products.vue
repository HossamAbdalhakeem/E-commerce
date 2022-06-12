<template>
  <v-app class="pt-16">
    <v-container>
      <section class="mt-16">
        <v-dialog v-model="addEditProducts" width="500" persistent>
          <addEditProduct
            :product="product"
            :showIcons="showIcons"
            @switchIcons="showIcons = true"
            @closeDialog="closeDialogEditAndAddProduct"
          ></addEditProduct>
        </v-dialog>
      </section>
      <v-dialog v-model="openDeleteItem" width="500" persistent>
        <deleteItemConfirmMsg
          @submit="sureDelItem"
          @closeDeleteDilog="openDeleteItem = false"
          content="product"
        ></deleteItemConfirmMsg>
      </v-dialog>
      <div class="d-flex justify-center mb-3">
        <v-btn class="info" @click="openAddEditProduct">add product</v-btn>
      </div>
      <section class="all-products">
        <v-card>
          <template>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="allproducts"
                :search="search"
                :loading="loadingTable"
              >
                <template v-slot:[`item.ProductImage`]="{ item }">
                  <img
                    width="80px"
                    height="80px"
                    :src="item.ProductImage"
                    class="pa-2"
                  />
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon @click="openDeleteProduct(item)"
                    ><v-icon color="error">mdi-delete</v-icon></v-btn
                  >
                  <v-btn icon @click="openAddEditProduct(item)">
                    <v-icon color="success">mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </template>
        </v-card>
      </section>
    </v-container>
  </v-app>
</template>

<script>
import addEditProduct from "./branch-admin-components/addEditProduct.vue";
export default {
  components: {
    addEditProduct,
  },
  data() {
    return {
      namecategory: null,
      addEditProducts: false,
      product: {},
      saveedit: null,
      myproducts: null,
      search: "",
      openDeleteItem: false,
      productDelData: {},
      headers: [
        {
          text: "title",
          align: "center",
          filterable: false,
          value: "ProductTitle",
        },
        {
          text: "priceBeforeDiscount",
          value: "priceBeforeDiscount",
          align: "center",
        },
        {
          text: "priceAftereDiscount",
          value: "priceAftereDiscount",
          align: "center",
        },
        // { text: "selecteCatogery", value: "carbs" },
        { text: "quantity", value: "quantity", align: "center" },
        { text: "ProductImage", value: "ProductImage", align: "center" },
        {
          text: "edit / delete",
          value: "actions",
          align: "center",
          class: ["black--text", "text-capitalize"],
        },
      ],
      showIcons: false,
    };
  },
  methods: {
    closeDialogEditAndAddProduct() {
      this.addEditProducts = false;
      this.showIcons = false;
    },
    openDeleteProduct(product) {
      this.productDelData = product;
      this.openDeleteItem = true;
    },
    sureDelItem() {
      this.$store.dispatch("deleteProduct", this.productDelData).then(() => {
        this.openDeleteItem = false;
        this.ToasteSuccessMsg("The product has been delete successfully");
      })
      this.$store.dispatch("deleteProductInCard", this.productDelData);
      // this.$store.dispatch("deleteCart", this.productDelData);
      // this.$store.dispatch("getAllCart");
      
    },
    openAddEditProduct(product) {
      if (product.productsId) {
        this.product = { ...product };
      } else {
        this.product = {};
      }
      this.addEditProducts = true;
    },
  },
  computed: {
    allproducts() {
      return this.$store.getters.getallproduct;
    },
    loadingTable() {
      return this.$store.getters.LoadingTable;
    },
  },
};
</script>
<style lang="scss" scoped></style>
