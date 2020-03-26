<template>
  <div id="app">
    <nav id="nav">
      <div class="left">
        <div class="brand">
          <img src="@/assets/logo.png" alt="Vue Logo" />
          <span class="title">{{ appTitle }}</span>
        </div>
        <router-link to="/">Home</router-link>
        <router-link v-if="user !== null" to="/protected"
          >Protected</router-link
        >
      </div>
      <div class="spacer"></div>
      <div class="right">
        <router-link v-if="user === null" to="/login">Login</router-link>
        <router-link v-if="user === null" to="/register">Register</router-link>
        <li v-if="user !== null">
          <a href="#" @click.prevent="doLogout">Logout</a>
        </li>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "MyApp"
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch("LOG_OUT");
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    document.title = this.appTitle;
  },
  watch: {
    $route(to) {
      document.title = to.meta.title
        ? `${this.appTitle}: ${to.meta.title}`
        : this.appTitle;
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  height: 100vh;
  .content {
    flex: 1;
    margin: 24px;
  }
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  background-color: teal;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  .spacer {
    flex: 1;
  }
  .left {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .brand {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 2em;
      }
      .title {
        color: white;
        font-size: 1.5em;
        font-weight: bold;
        margin-left: 8px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  list-style: none;
  a {
    font-weight: bold;
    color: white;
    margin-left: 24px;

    &.router-link-exact-active {
      color: #16db82;
    }
  }
}
</style>
