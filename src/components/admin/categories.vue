<template>
  <v-app class="pt-16">
    <v-container>
      <section class="mt-16">
        <v-dialog width="500" v-model="dialogAddEditCategory" persistent>
          <addEditCategory
            :category="category"
            :showIcons="showIcons"
            @switchIcons="showIcons = true"
            @closeDialog="closeDialogEditAndAddCategory"
          ></addEditCategory>
        </v-dialog>
        <v-dialog v-model="openDeleteItem" width="500" persistent>
          <deleteItemConfirmMsg
            @submit="sureDelItem"
            @closeDeleteDilog="openDeleteItem = false"
            content="category"
          ></deleteItemConfirmMsg>
        </v-dialog>
        <div class="d-flex justify-center mb-3">
          <v-btn @click="openDialogAddEditCategory" class="mx-0 primary text-capitalize"
            >add Category</v-btn
          >
        </div>
      </section>
      <section>
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
              :items="getCategories"
              :search="search"
              :loading="loadingTable"
            >
              <template v-slot:[`item.categoryImage`]="{ item }">
                <img
                  width="100px"
                  height="100px"
                  :src="item.categoryImage"
                  class="pa-2"
                />
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon @click="openDeleteCategory(item)"
                  ><v-icon color="error">mdi-delete</v-icon></v-btn
                >
                <v-btn icon @click="openDialogAddEditCategory(item)">
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </section>
    </v-container>
  </v-app>
</template>

<script>
import addEditCategory from "./branch-admin-components/addEditCategory.vue";
export default {
  components: {
    addEditCategory,
  },
  data() {
    return {
      openDeleteItem: false,
      dialogAddEditCategory: false,
      categoryData: null,
      category: {},
      showIcons: false,
      search: "",
      headers: [
        {
          text: "Type",
          align: "center",
          filterable: false,
          value: "categoryName",
        },
        {
          text: "categoryTitle",
          value: "categoryTitle",
          align: "center",
        },

        { text: "categoryImage", value: "categoryImage", align: "center" },
        {
          text: "edit / delete",
          value: "actions",
          align: "center",
          class: ["black--text", "text-capitalize"],
        },
      ],
    };
  },
  methods: {
    closeDialogEditAndAddCategory() {
      this.dialogAddEditCategory = false;
      this.showIcons = false;
    },
    openDeleteCategory(item) {
      this.categoryData = item;
      this.openDeleteItem = true;
    },
    sureDelItem() {
      this.$store.dispatch("deleteProductsFromCategory", this.categoryData);
      this.$store.dispatch("deleteCategory", this.categoryData).then(() => {
        this.openDeleteItem = false;
        this.ToasteSuccessMsg("The category has been delete successfully");
      });
    },
    openDialogAddEditCategory(category) {
      if (category.CategoriesId) {
        this.category = { ...category };
      } else {
        this.category = {};
      }
      this.dialogAddEditCategory = true;
    },
  },
  computed: {
    getCategories() {
      return this.$store.getters.categories;
    },
    loadingTable() {
      return this.$store.getters.LoadingTable;
    },
  },
};
</script>
<style lang="scss" scoped></style>
