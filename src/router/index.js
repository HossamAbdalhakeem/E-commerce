import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/components/home.vue";
import signup from "@/components/register/signup";
import login from "@/components/register/login";
import profile from "@/components/profile";
import selecteCategory from "@/components/selecteCategory";
import singleProduct from "@/components/singleProduct";
import allCart from "@/components/allCart";
import singleCategory from "@/components/singleCategory";
import shopingMain from "@/components/shopingMain";
import footer from "@/components/footer";
import chat from "@/components/chat";
import chating from "@/components/chating";
import DashBoard from "@/components/admin/DashBoard";
import categories from "@/components/admin/categories";
import products from "@/components/admin/products";
import fivourite from "@/components/fivourite";
import gurdRegister from "./gurdLogin";
import gurdDashboard from "./gurdDashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/signup",
    name: "signup",
    beforeEnter: gurdRegister,
    component: signup,
  },
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter: gurdRegister,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },

  {
    path: "/selecteCategory/:id",
    name: "selecteCategory",
    component: selecteCategory,
    props: true,
  },
  {
    path: "/singleProduct/:id",
    name: "singleProduct",
    component: singleProduct,
    props: true,
  },
  {
    path: "/singleCategory/:id",
    name: "singleCategory",
    component: singleCategory,
    props: true,
  },
  {
    path: "/allCart",
    name: "allCart",
    component: allCart,
  },
  {
    path: "/shopingMain",
    name: "shopingMain",
    component: shopingMain,
  },
  {
    path: "/footer",
    name: "footer",
    component: footer,
  },
  {
    path: "/chat",
    name: "chat",
    component: chat,
  },
  {
    path: "/chating",
    name: "chating",
    component: chating,
  },
  {
    path: "/fivourite",
    name: "fivourite",
    component: fivourite,
  },
  {
    path: "/DashBoard",
    name: "DashBoard",
    component: DashBoard,
    beforeEnter: gurdDashboard,
    children: [
      {
        path: "/",
        name: "categories",
        component: categories,
      },
      {
        path: "/products",
        name: "products",
        component: products,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
