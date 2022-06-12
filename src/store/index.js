import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../firebase";
import { db } from "../firebase";
// import mixins from "../plugins/mixins"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingData: false,
    loadingTable: false,
    loading: false,
    error: null,
    user: null,
    categories: [],
    products: [],
    cart: [],
    fivourite: [],
    // Singleproduct: null,
    sinleCart: null,
    allProducts: [],
    singleCategory: null,
    Quantity: 0,
    order: [],
    filterProducts: [],
    totalPrice: null,
    successReq: null,
    errorReq: null,
  },
  getters: {
    LoadingData(state) {
      return state.loadingData;
    },
    SuccessReq(state) {
      return state.successReq;
    },
    Loading(state) {
      return state.loading;
    },
    LoadingTable(state) {
      return state.loadingTable;
    },
    sendQuantity(state) {
      return state.Quantity;
    },
    error(state) {
      return state.error;
    },
    user(state) {
      return state.user;
    },
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
    FilterProducts(state) {
      return state.filterProducts;
    },
    // Singleproduct(state) {
    //   return state.Singleproduct;
    // },
    allmyCart(state) {
      return state.cart;
    },
    singleCart(state) {
      return state.sinleCart;
    },
    getFivourite(state) {
      return state.fivourite;
    },
    getallproduct(state) {
      return state.allProducts;
    },
    getSingleCategory(state) {
      return state.singleCategory;
    },
    myorder(state) {
      return state.order;
    },
    totalPrice(state) {
      return state.totalPrice;
    },
    // selecteMyCategory(state) {
    //   return (id) => {
    //     console.log(id);
    //     return state.products.filter((product) => {
    //       return product.selecteCatogery === id;
    //     });
    //   };
    // },
  },
  mutations: {
    seterr(state, payload) {
      state.error = payload;
    },
    setuser(state, payload) {
      state.user = payload;
      // localStorage.setItem("token", `Bearer ${payload.token}`);
      localStorage.setItem("user", JSON.stringify(payload));
    },
    setCategories(state, payload) {
      state.categories.unshift(payload);
    },
    Allcategories(state, payload) {
      state.categories = payload;
    },

    ProductInCategory(state, payload) {
      state.products = payload;
    },
    // singleProduct(state, payload) {
    //   state.Singleproduct = payload;
    // },
    setCart(state, payload) {
      state.cart.push(payload);
    },
    allCart(state, payload) {
      state.cart = payload;
    },
    totalPriceCart(state, payload) {
      if (state.cart.length > 0) {
        let newArr = [];
        payload.forEach((e) => {
          console.log(e);
          newArr.push(e.newPrice);
        });
        console.log(newArr);
        let total = newArr.reduce((one, two) => {
          console.log(one, two);
          return one + two;
        });
        state.totalPrice = total;
      }
    },
    quantity(state, payload) {
      state.Quantity = payload;
    },
    singleCart(state, payload) {
      state.sinleCart = payload;
    },
    toFivourite(state, payload) {
      state.fivourite.push(payload);
    },
    myFivourite(state, payload) {
      state.fivourite = payload;
    },
    setproducts(state, payload) {
      state.allProducts.unshift(payload);
    },
    setAllProducts(state, payload) {
      state.allProducts = payload;
    },
    setFilterProducts(state, payload) {
      state.filterProducts = payload;
    },
    setSingleCategory(state, payload) {
      state.singleCategory = payload;
    },
    deleteProducts(state, payload) {
      state.allProducts = state.allProducts.filter((product) => {
        return product.productsId !== payload.productsId;
      });
    },
    editpost(state, payload) {
      console.log(payload);
      let index = state.allProducts.findIndex((i) => {
        return i.productsId === payload.productsId;
      });

      console.log(index);
      state.allProducts.splice(index, 1, payload);
    },
    setDeleteCategory(state, payload) {
      state.categories = state.categories.filter((product) => {
        return product.CategoriesId !== payload.CategoriesId;
      });
    },
    deleteMyFivourite(state, payload) {
      state.fivourite = state.fivourite.filter((fivourite) => {
        return fivourite.fivouriteId !== payload.fivouriteId;
      });
    },
    deleteMyCart(state, payload) {
      state.cart = state.cart.filter((e) => {
        return e.cartId !== payload.cartId;
      });
    },
    editcategory(state, payload) {
      console.log(payload);
      let index = state.categories.findIndex((i) => {
        return i.CategoriesId === payload.CategoriesId;
      });

      console.log(index);
      state.categories.splice(index, 1, payload);
    },
    setimage(state, payload) {
      state.user.image = payload;
    },
    editInfo(state, payload) {
      state.user.address = payload.address;
      state.user.city = payload.city;
      state.user.companyName = payload.companyName;
      state.user.country = payload.country;
      state.user.email = payload.email;
      state.user.lastname = payload.lastname;
      state.user.name = payload.name;
      state.user.phoneNum = payload.phoneNum;
      state.user.postcode = payload.postcode;
    },
    setOrder(state, payload) {
      state.order.push(payload);
    },
    AllMyOrder(state, payload) {
      state.order = payload;
    },
  },
  actions: {
    signUp({ commit, state }, payload) {
      state.loading = true;
      return auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          console.log(user);
          const DataObj = {
            id: user.user.uid,
            email: payload.email,
            name: payload.name,
            lastname: payload.lastname,
            image: null,
            companyName: payload.companyName,
            phoneNum: payload.phoneNum,
            postcode: payload.postcode,
            country: payload.country,
            city: payload.city,
            address: null,
          };
          db.collection("users")
            .doc(user.user.uid)
            .set({
              ...DataObj,
            })
            .then(() => {
              commit("setuser", DataObj);
              state.loading = false;
            });
        })
        .catch((err) => {
          console.log(err);
          commit("seterr", err);
        });
    },
    autosigin({ state }, payload) {
      // commit("setuser", {
      //   email: payload.email,
      //   id: payload.id,
      //   name: payload.name,
      //   lastname: payload.lastname,
      //   image: payload.image,
      //   companyName: payload.companyName,
      //   phoneNum: payload.phoneNum,
      //   postcode: payload.postcode,
      //   country: payload.country,
      //   city: payload.city,
      //   address: payload.address,
      // });
      state.user = payload;
    },
    logout({ commit }) {
      auth.signOut();
      commit("setuser", null);
    },
    login({ commit, state }, payload) {
      state.loading = true;
      return auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          state.loading = false;
          commit("setuser", {
            id: user.user.uid,
            email: payload.email,
          });
        })
        .catch((err) => {
          state.loading = false;
          commit("seterr", err);
        });
    },
    addCategory({ commit, state }, payload) {
      state.loading = true;
      const DataObj = {
        categoryTitle: payload.categoryTitle,
        categoryName: payload.categoryName,
        categoryImage: payload.categoryImage,
      };
      return db
        .collection("categories")
        .add({
          ...DataObj,
        })
        .then((data) => {
          DataObj.CategoriesId = data.id;
          commit("setCategories", DataObj);
          state.loading = false;
        });
    },
    getAllCategories({ commit, state }) {
      state.loadingTable = true;
      let Categories = null;
      let CategoriesArray = [];
      db.collection("categories")
        .get()
        .then((data) => {
          data.docs.forEach((oneOfCategory) => {
            Categories = oneOfCategory.data();
            Categories.CategoriesId = oneOfCategory.id;
            CategoriesArray.push(Categories);
          });
          state.loadingTable = false;
          commit("Allcategories", CategoriesArray);
        });
    },
    addProducts({ commit, state }, payload) {
      state.loading = true;
      const DataObj = {
        ProductTitle: payload.ProductTitle,
        priceBeforeDiscount: payload.priceBeforeDiscount,
        priceAftereDiscount: payload.priceAftereDiscount,
        ProductImage: payload.ProductImage,
        discription: payload.discription,
        selecteCatogery: payload.selecteCatogery,
        review: null,
        quantity: 1,
      };
      return db
        .collection("products")
        .add({
          ...DataObj,
        })
        .then((data) => {
          DataObj.productsId = data.id;
          state.loading = false;
          commit("setproducts", DataObj);
        });
    },
    addToCart({ commit, state }, payload) {
      state.loading = true;
      let currentUser = auth.currentUser.uid;
      const DataObj = {
        ProductImage: payload.ProductImage,
        ProductTitle: payload.ProductTitle,
        discription: payload.discription,
        priceAftereDiscount: payload.priceAftereDiscount,
        priceBeforeDiscount: payload.priceBeforeDiscount,
        newPrice: payload.priceAftereDiscount,
        productsId: payload.productsId,
        review: payload.review,
        selecteCatogery: payload.selecteCatogery,
        quantity: payload.quantity,
        userId: currentUser,
      };
      console.log(currentUser);
      return db
        .collection("cart")
        .add({
          ...DataObj,
        })
        .then((data) => {
          DataObj.cartId = data.id;
          commit("setCart", DataObj);
          state.loading = false;
        });
    },
    getSingleCart({ commit }, payload) {
      console.log(payload.productsId);
      let singleCart = null;
      let singleCartArray = [];
      db.collection("cart")
        .where("productsId", "==", payload.productsId)
        .get()
        .then((data) => {
          data.docs.forEach((oneOfCart) => {
            singleCart = oneOfCart.data();
            singleCart.cartId = oneOfCart.id;
            singleCartArray.push(singleCart);
          });
          commit("singleCart", singleCart);
        });
    },
    getAllCart({ commit, state }) {
      state.loadingData = true;
      let AllCart = null;
      let allCartArray = [];
      let totalQuantity = 0;
      let currentUser = auth.currentUser.uid;
      db.collection("cart")
        .where("userId", "==", currentUser)
        .get()
        .then((data) => {
          data.docs.forEach((oneOfCart) => {
            AllCart = oneOfCart.data();
            AllCart.cartId = oneOfCart.id;
            totalQuantity += oneOfCart.data().quantity;
            allCartArray.push(AllCart);
          });
          commit("allCart", allCartArray);
          commit("totalPriceCart", allCartArray);
          commit("quantity", totalQuantity);
          state.loadingData = false;
        });
    },
    addFivourite({ commit }, payload) {
      let currentUser = auth.currentUser.uid;
      const DataObj = {
        ProductImage: payload.ProductImage,
        ProductTitle: payload.ProductTitle,
        discription: payload.discription,
        priceAftereDiscount: payload.priceAftereDiscount,
        priceBeforeDiscount: payload.priceBeforeDiscount,
        productsId: payload.productsId,
        review: payload.review,
        selecteCatogery: payload.selecteCatogery,
        quantity: payload.quantity,
        userId: currentUser,
      };
      return db
        .collection("fivourite")
        .add({
          ...DataObj,
        })
        .then((data) => {
          (DataObj.fivouriteId = data.id), commit("toFivourite", DataObj);
        });
    },
    getFivourite({ commit, state }) {
      state.loadingData = true;
      let fivourite = null;
      let fivouriteArray = [];
      console.log(auth.currentUser.uid);
      if (auth.currentUser.uid) {
        db.collection("fivourite")
          .where("userId", "==", auth.currentUser.uid)
          .get()
          .then((data) => {
            data.docs.forEach((oneOfFivourite) => {
              fivourite = oneOfFivourite.data();
              fivourite.fivouriteId = oneOfFivourite.id;
              fivouriteArray.push(fivourite);
            });
            console.log(fivouriteArray);
            commit("myFivourite", fivouriteArray);
            state.loadingData = false;
          });
      }
    },
    getAllProducts({ commit, state }) {
      state.loadingTable = true;
      let products = null;
      let productsArray = [];
      db.collection("products")
        .get()
        .then((data) => {
          data.docs.forEach((oneOfProducts) => {
            products = oneOfProducts.data();
            console.log(oneOfProducts);
            products.productsId = oneOfProducts.id;
            productsArray.push(products);
          });
          state.loadingTable = false;
          commit("setAllProducts", productsArray);
        });
    },
    singleCategory({ commit }, payload) {
      let dataSingleCategory = null;
      db.collection("categories")
        .doc(payload)
        .get()
        .then((data) => {
          dataSingleCategory = data.data();
          commit("setSingleCategory", dataSingleCategory);
        });
    },
    editCartQuantity({ commit }, payload) {
      console.log(payload);
      console.log(payload.id);
      db.collection("cart")
        .doc(payload.id)
        .update({
          quantity: payload.newQuantity,
          newPrice: payload.totalPrice,
        });
      console.log(commit);
    },
    deleteProduct({ commit, state }, payload) {
      state.loading = true;
      return db
        .collection("products")
        .doc(payload.productsId)
        .delete()
        .then(() => {
          commit("deleteProducts", payload);
          state.loading = false;
        });
    },
    deleteProductsFromCategory({ commit }, payload) {
      let mydata = null;
      db.collection("products")
        .where("selecteCatogery", "==", payload.CategoriesId)
        .get()
        .then((data) => {
          console.log(data.docs);
          data.docs.forEach((e) => {
            console.log(e);
            mydata = e.data();
            console.log(e.data());
            mydata.productsId = e.id;
            console.log(mydata.productsId);
            console.log(mydata);
            db.collection("products")
              .doc(mydata.productsId)
              .delete();
            commit("deleteProducts", mydata);
          });
        });
    },
    deleteProductInCard({ commit }, payload) {
      let mydata = null;
      db.collection("cart")
        .where("productsId", "==", payload.productsId)
        .get()
        .then((data) => {
          data.docs.forEach((e) => {
            mydata = e.data();
            // console.log(e.data());
            mydata.id = e.id;
            // console.log(mydata.id);
            if (mydata.id) {
              db.collection("cart")
                .doc(mydata.id)
                .delete();
            }
          });
        });
      commit("deleteMyCart", payload);
    },
    editProduct({ commit, state }, payload) {
      console.log(payload);
      state.loading = true;
      const DataObj = {
        ProductImage: payload.ProductImage,
        ProductTitle: payload.ProductTitle,
        discription: payload.discription,
        priceAftereDiscount: payload.priceAftereDiscount,
        priceBeforeDiscount: payload.priceBeforeDiscount,
        quantity: payload.quantity,
        selecteCatogery: payload.selecteCatogery,
      };
      return db
        .collection("products")
        .doc(payload.productsId)
        .update({
          ...DataObj,
        })
        .then((res) => {
          console.log(res);
          DataObj.productsId = payload.productsId;
          state.loading = false;
          commit("editpost", DataObj);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCategory({ commit, state }, payload) {
      state.loading = true;
      return db
        .collection("categories")
        .doc(payload.CategoriesId)
        .delete()
        .then(() => {
          state.loading = false;
          commit("setDeleteCategory", payload);
        });
    },
    editCategory({ commit, state }, payload) {
      console.log(payload);
      state.loading = true;
      const DataObj = {
        categoryImage: payload.categoryImage,
        categoryName: payload.categoryName,
        categoryTitle: payload.categoryTitle,
      };
      return db
        .collection("categories")
        .doc(payload.CategoriesId)
        .update({
          ...DataObj,
        })
        .then(() => {
          DataObj.CategoriesId = payload.CategoriesId;
          state.loading = false;
          commit("editcategory", DataObj);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadimgProfile({ commit }, payload) {
      let userId = auth.currentUser.uid;
      return db
        .collection("users")
        .doc(userId)
        .update({
          image: payload,
        })
        .then(() => {
          commit("setimage", payload);
        });
    },
    deleteFivourite({ commit, state }, payload) {
      state.loading = true;
      return db
        .collection("fivourite")
        .doc(payload.fivouriteId)
        .delete()
        .then(() => {
          commit("deleteMyFivourite", payload);
          state.loading = false;
        });
    },
    deleteCart({ commit, state }, payload) {
      state.loading = true;
      return db
        .collection("cart")
        .doc(payload.cartId)
        .delete()
        .then(() => {
          commit("deleteMyCart", payload);
          state.loading = false;
        });
    },
    EditInfoUser({ commit, state }, payload) {
      state.loading = true;
      let userId = auth.currentUser.uid;
      const DataObj = {
        address: payload.address,
        city: payload.city,
        companyName: payload.companyName,
        country: payload.country,
        email: payload.email,
        lastname: payload.lastname,
        name: payload.name,
        phoneNum: payload.phoneNum,
        postcode: payload.postcode,
      };
      return db
        .collection("users")
        .doc(userId)
        .update({ ...DataObj })
        .then(() => {
          commit("editInfo", payload);
          state.loading = false;
        });
    },
    addOrder({ commit }, payload) {
      let currentUser = auth.currentUser.uid;
      const DataObj = {
        ProductImage: payload.product.ProductImage,
        ProductTitle: payload.product.ProductTitle,
        discription: payload.product.discription,
        priceAftereDiscount: payload.product.priceAftereDiscount,
        priceBeforeDiscount: payload.product.priceBeforeDiscount,
        productsId: payload.product.productsId,
        review: payload.product.review,
        selecteCatogery: payload.product.selecteCatogery,
        quantity: payload.product.quantity,
        cartId: payload.product.cartId,
        totalPrice: payload.product.newPrice,
        address: payload.user.address,
        city: payload.user.city,
        phoneNum: payload.user.phoneNum,
        country: payload.user.country,
        userId: currentUser,
        date: payload.date,
      };
      db.collection("order")
        .add({
          ...DataObj,
        })
        .then((data) => {
          console.log(data.id);
          DataObj.orderId = data.id;
          commit("setOrder", DataObj);
        });
    },
    getOrder({ commit }) {
      let orders = null;
      let ordersArray = [];
      let currentUser = auth.currentUser.uid;
      db.collection("order")
        .where("userId", "==", currentUser)
        .get()
        .then((data) => {
          data.docs.forEach((mydata) => {
            orders = mydata.data();
            orders.orderId = mydata.id;
            ordersArray.push(orders);
          });
          commit("AllMyOrder", ordersArray);
        });
    },
    // getUser({ commit }) {
    //   let datauser = null;
    //   let id = auth.currentUser.uid;
    //   db.collection("users")
    //     .doc(id)
    //     .get()
    //     .then((e) => {
    //       console.log(e.data());
    //       datauser = e.data();
    //       console.log(datauser);
    //     })
    //     commit("setuser", datauser);

    // },
  },
});
