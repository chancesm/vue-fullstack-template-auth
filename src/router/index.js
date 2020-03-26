import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Protected from "../views/Protected.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";

import store from "@/store";
Vue.use(VueRouter);
function authcheck(to, from, next) {
  if (store.state.user !== null) {
    next();
  } else next("/login");
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/protected",
    name: "Protected",
    beforeEnter: authcheck,
    component: Protected,
    meta: { title: "Protected" }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login" }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" }
  },
  { path: "/404", component: NotFound, meta: { title: "Not Found" } },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  routes
});

export default router;
