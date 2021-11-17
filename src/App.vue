<template>
  <q-layout view="hHh LpR fff" style="background-color: #737373">
    <q-header elevated style="color: black" dir="rtl">
      <q-toolbar style="background-color: #ffce0c" dir="rtl">
        <q-btn
            flat
            dense
            round
            @click="right = !right"
            aria-label="Menu"
            icon="menu"
        />

        <q-toolbar-title>
          <q-item clickable tag="a" @click="$router.push('/home')">
            <!--          <q-item clickable tag="a" href="https://la-fabela.web.app/#/">-->
            לה פבאלה
            <span style="font-size: 5px; font-weight: bold ">BETA</span>
          </q-item>
        </q-toolbar-title>
        <q-btn flat round dense icon="search"/>
        <q-item clickable tag="a" @click="goProfile()">
          <q-icon name="person_outline" style="margin-top: 4px; font-size: 25px; left: -10px"/>
        </q-item>
        <!--        <div> v {{ "1.0" }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
        show-if-above
        v-model="right"
        side="right"
        bordered
        content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>תפריט</q-item-label>
        <q-item clickable tag="a" @click="goProfile()">
          <q-item-section avatar>
            <q-icon name="personoutline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>פרופיל אישי</q-item-label>
            <!--            <q-item-label caption>localhost:8082/#/used-parts</q-item-label>-->
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="staroutline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>מודעות</q-item-label>
            <!--            <q-item-label caption>quasar.dev</q-item-label>-->
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="layersoutline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>רכישה קבוצתית</q-item-label>
            <!--            <q-item-label caption>chat.quasar.dev</q-item-label>-->
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="cameraoutline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>פינה חמה</q-item-label>
            <!--            <q-item-label caption>forum.quasar.dev</q-item-label>-->
          </q-item-section>
        </q-item>

        <q-item clickable tag="a">
          <!--          <q-item-section avatar>-->
          <!--&lt;!&ndash;            <q-icon name="rss_feed"/>&ndash;&gt;-->
          <!--          </q-item-section>-->
          <q-item-section>
            <q-btn id="signOutBtn" @click="singOut()">התנתק</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!--      <TableViewer :tableName = "'tableItem'" />-->
      <!--      <TableViewer :tableName = "'tableUsers'" />-->
      <!--      <home/>-->
      <router-view></router-view>

    </q-page-container>
    <!--    <button @click="getUsers">Get Users</button>-->

  </q-layout>
</template>

<script>
import axios from 'axios';
import Home from "./views/Home";
import firebaseInstance from "./middleware/firebase";

export default {
  name: 'LayoutDefault',
  components: {Home},
  data() {
    return {
      right: false
    }
  },
  methods: {
    goProfile() {
      if (!this.$route.params.id) {
        this.$router.push(`profile/${window.user.uid}`)
      }
    },
    getUsers() {
      axios.get('http://localhost:5000/users')
          .then(result => {
            console.log(result)
          })
          .catch(error => console.log(error))
    },
    singOut() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.$router.push('/');
        // Sign-out successful.
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>

<style>
#signOutBtn {
  border-radius: 20px;
  background-color: yellow;
  width: 120px;
  justify-content: center;
  color: #696969;
}
</style>
