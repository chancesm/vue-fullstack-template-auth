import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});
Vue.use(Vuex);
export default new Vuex.Store({
  state: { user: null, registerError: "", loginError: "" },
  mutations: {
    clearErrors(state) {
      state.registerError = "";
      state.loginError = "";
    },
    setRegisterError(state, message) {
      state.registerError = message;
    },
    setLoginError(state, message) {
      state.loginError = message;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    ["LOG_IN"](ctx, params) {
      return axios
        .post("/auth/login", { ...params })
        .then(({ data }) => {
          ctx.commit("setUser", data);
          return true;
        })
        .catch(err => {
          if (err.response?.status === 401) {
            ctx.commit("setLoginError", "Incorrect Username or Password");
          } else ctx.commit("setLoginError", "Something went wrong.");
          return false;
        });
    },
    ["LOG_OUT"](ctx) {
      axios.delete("/auth/logout");
      ctx.commit("setUser", null);
    },
    ["REGISTER"](ctx, params) {
      ctx.commit("clearErrors", "");
      return axios
        .post("/auth/register", { ...params })
        .then(({ data }) => {
          ctx.commit("setUser", data);
          return true;
        })
        .catch(err => {
          if (err.response?.status === 403) {
            ctx.commit("setRegisterError", "That username is already in use.");
          } else ctx.commit("setRegisterError", "Something went wrong.");
          return false;
        });
    },
    ["CHECK_STATUS"](ctx) {
      return axios.get("/auth/status").then(({ data }) => {
        let user = data;
        if (user === null) {
          ctx.dispatch("LOG_OUT");
          return false;
        } else {
          ctx.commit("setUser", user);
          return true;
        }
      });
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
