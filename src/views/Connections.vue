<template>
  <div>
    <login v-if="flag" @registerScreen="goSingUp"/>
    <register v-else @loginScreen="goSingIn"/>
  </div>
</template>

<script>
import Login from "../components/auth/login";
import Register from "../components/auth/register"

export default {
  name: "Connections",
  components: {
    Register,
    Login
  },
  data() {
    return {
      flag: true
    }
  },
  methods: {
    goSingUp() {
      // this.isReload = !this.isReload;
      this.flag = false;
    },
    goSingIn() {
      // this.isReload = !this.isReload;
      this.flag = true;
    }
  },
  created() {
    if (window.user) {
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>