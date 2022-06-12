<template>
  <div>
    <v-card width="500" class="mx-auto pa-4">
      <div class="mb-3 d-flex justify-content-end">
        <v-btn icon>
          <v-icon @click="$emit('closeDialog')">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="pa-0">
        <h3 class="mx-auto mb-3">Add categories</h3>
      </v-card-title>
      <v-form v-model="valid" @submit.prevent="SaveAddCategory">
        <v-card-text>
          <v-text-field
            dense
            outlined
            v-model="category.categoryTitle"
            label="Category Tittle"
            :rules="[allRules.required, allRules.minNameLen(4)]"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            v-model="category.categoryName"
            label="Category name"
            :rules="[allRules.required, allRules.minNameLen(8)]"
          ></v-text-field>
          <div class="d-flex align-center">
            <div>
              <input
                type="file"
                style="display: none"
                ref="fileimgcategory"
                accept="image"
                @change="uploadImgCategory"
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
            </div>
            <div>
              <p class="ma-0" v-if="!showIcons">Add CategoryImg</p>
              <p class="ma-0 success--text" v-else color="info">
                Photo Uploaded
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            :disabled="!valid || !category.categoryImage"
            large
            class="success white--text mx-auto"
            :loading="loading"
            >save Category</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { storge } from "../../../firebase";

export default {
  props: ["category", "showIcons"],
  data() {
    return {
      valid: false,
      picCategory: null,
      namepicCategory: null,
      imgloading: false,
    };
  },
  methods: {
    onpicfileimg() {
      this.$refs.fileimgcategory.click();
    },
    uploadImgCategory(e) {
      this.picCategory = e.target.files[0];
      this.namepicCategory = this.picCategory.name;
      let storgeref = storge.ref("coverPic/" + this.namepicCategory);
      let uploaad = storgeref.put(this.picCategory);
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
            this.category.categoryImage = downloadURL;
          });
        }
      );
    },
    SaveAddCategory() {
      if (this.category.categoryImage) {
        if (this.category.CategoriesId) {
          console.log(this.category.CategoriesId);
          this.$store.dispatch("editCategory", this.category).then(() => {
            this.$emit("closeDialog");
            this.ToasteSuccessMsg(
              "category has been successfully modified"
            );
          });
        } else {
          const AddCategory = {
            categoryTitle: this.category.categoryTitle,
            categoryName: this.category.categoryName,
            categoryImage: this.category.categoryImage,
          };
          console.log();
          this.$store.dispatch("addCategory", AddCategory).then(() => {
            this.$emit("closeDialog");
            this.ToasteSuccessMsg(
              "A new category has been successfully placed in the categories list"
            );
          });
        }
      }
    },
  },
  computed: {
    loading() {
      return this.$store.getters.Loading;
    },
  },
};
</script>
<style lang="scss" scoped></style>
