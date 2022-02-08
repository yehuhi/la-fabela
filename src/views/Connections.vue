<template>
  <div>
    <login v-if="flag" @registerScreen="goSingUp"/>
    <register v-else @loginScreen="goSingIn"/>

    <div class="q-pa-xl-lg q-gutter-xl-md">
      <!--        <q-btn label="Alert" color="primary" @click="alert = true"/>-->
      <q-dialog v-model="alertUser">
        <q-card style="width: 90%; height: 200px; background-color: #ffce0c; border-radius: 20px">
          <q-card-section>
            <div class="text-h6" style="text-align: right; font-weight: bold">:הודעה</div>
          </q-card-section>

          <q-card-section class="q-pt-none" style="text-align: right; font-size: 22px; padding-right: 30px">
            כדי לפרסם מודעה באתר שלנו, חובה להיות רשום אצלנו, תודה
          </q-card-section>

          <q-card-actions align="left">
            <q-btn flat label="OK" color="red" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
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
      alertUser: true,
      flag: true
    }
  },
  methods: {
    goSingUp() {
      this.flag = false;
    },
    goSingIn() {
      this.flag = true;
    }
  },
  created() {
    if (window.user) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>