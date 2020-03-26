<template>
  <div class="login">
    <div class="card">
      <div class="head">Login</div>
      <form @submit.prevent="doLogin">
        <input
          type="text"
          v-model="username"
          placeholder="User Name"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <input type="submit" value="Log In" />
        <span style="color:red;">{{ loginError }}</span>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    loginError() {
      return this.$store.state.loginError;
    }
  },
  methods: {
    doLogin() {
      this.$store
        .dispatch("LOG_IN", {
          username: this.username,
          password: this.password
        })
        .then(success => {
          if (success) {
            this.$router.push({ name: "Home" });
          }
        });
    }
  },
  mounted() {
    this.$store.commit("clearErrors");
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .card {
    width: 100%;
    max-width: 700px;
    max-height: 100%;
    .head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 2em;
      font-size: 1.5em;
      font-weight: bold;
      padding-left: 24px;
      background-color: teal;
      color: white;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      input {
        width: 75%;
        height: 2em;
        margin: 16px;
        padding: 8px;
        &[type="submit"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 45px;
          width: 50%;
          background-color: teal;
          color: white;
          font-weight: bold;
          font-size: 1em;
        }
      }
    }
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }
}
</style>
