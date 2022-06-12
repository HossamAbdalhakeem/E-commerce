<template>
  <div>
    <v-card class="pa-4">
      <div class="mb-3 d-flex justify-content-end">
        <v-btn icon>
          <v-icon @click="$emit('closeDialog')">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="pa-0">
        <h3 class="mx-auto">Add Products</h3>
      </v-card-title>
      <v-form v-model="valid" @submit.prevent="SaveAddProduct">
        <v-card-text>
          <v-text-field
            dense
            outlined
            v-model="product.ProductTitle"
           :rules="[allRules.required, allRules.minNameLen(4)]"
            label="Product Tittle"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            type="number"
            :rules="[allRules.required, allRules.length(2)]"
            v-model="product.priceBeforeDiscount"
            label="Price Before Discount"
          ></v-text-field>
          <v-text-field
            dense
            type="number"
            outlined
            :rules="[allRules.required]"
            v-model.number="product.priceAftereDiscount"
            label="Price After Discount"
          ></v-text-field>
          <v-textarea
            dense
            outlined
            v-model="product.discription"
            label="discription"
            :rules="[allRules.required, allRules.minNameLen(8)]"
          ></v-textarea>

          <v-autocomplete
            rounded
            solo
            dense
            :rules="[allRules.required]"
            :items="categories"
            item-text="categoryName"
            item-value="CategoriesId"
            v-model="product.selecteCatogery"
            label="Select Category"
          >
          </v-autocomplete>

          <div class="d-flex align-center">
            <input
              type="file"
              style="display: none"
              ref="fileimgProduct"
              accept="image"
              @change="uploadImgProduct"
            />
            <v-btn icon :loading="imgloading">
              <v-icon
                v-if="!showIcons"
                class="white iconCover pa-2"
                @click="onpicfileimg"
                >mdi-camera</v-icon
              >
              <v-icon v-else color="success">mdi-check</v-icon>
            </v-btn>
            <div>
              <p class="ma-0" v-if="!showIcons">Add PoroductImg</p>
              <p class="ma-0 success--text" v-else color="info">
                Photo Uploaded
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            :disabled="!valid || !product.ProductImage"
            type="submit"
            :loading="loading"
            class="success white--text mx-auto"
            >add product</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { storge } from "../../../firebase";
export default {
  props: ["product", "showIcons"],
  data() {
    return {
      valid: false,
      // closeDialogProduct: null,
      imgloading: false,
    };
  },
  methods: {
    async SaveAddProduct() {
      console.log(this.categories);
      if (this.product.ProductImage) {
        if (this.product.productsId) {
          console.log(this.product);
          this.$store.dispatch("editProduct", this.product).then(() => {
            this.$emit("closeDialog");
            this.ToasteSuccessMsg("product has been successfully modified");
          });
        } else {
          console.log(this.product);
          this.$store.dispatch("addProducts", this.product).then(() => {
            this.$emit("closeDialog");
            this.ToasteSuccessMsg(
              "A new product has been successfully added in the products list"
            );
          });
        }
      }
    },
    uploadImgProduct(e) {
      this.product.picProduct = e.target.files[0];
      this.product.namepicProduct = this.product.picProduct.name;
      let storgeref = storge.ref("coverPic/" + this.product.namepicProduct);
      let uploaad = storgeref.put(this.product.picProduct);
      // uploaad.on("state_changed", (FIRST) => {},(SECOND) => {})
      uploaad.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          this.imgloading = true;
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          console.log("here yrk");
          uploaad.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.imgloading = false;
            this.$emit("switchIcons");
            this.product.ProductImage = downloadURL;
          });
        }
      );
    },
    onpicfileimg() {
      this.$refs.fileimgProduct.click();
    },
  },
  computed: {
    loading() {
      return this.$store.getters.Loading;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
<style lang="scss" scoped></style>
