<template>
  <div class="upload">
    <div class="card">
      <div class="head">Upload Image</div>
      <form @submit.prevent="doRegister">
        <input type="text" v-model="filename" placeholder="Image Name" />
        <input type="file" placeholder="Select File" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Upload",
  data() {
    return {
      filename: ""
    };
  },
  methods: {
    doRegister() {
      this.$store.dispatch("UPLOAD");
    }
  },
  mounted() {
    this.$store.dispatch("CHECK_STATUS").then(loggedIn => {
      if (!loggedIn) this.$router.push({ name: "Login" });
    });
  }
};
</script>

<style lang="scss" scoped>
.upload {
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
