<template>
  <div style="width: 100%">
    <p v-if="!userExist"
       style="text-align: right; font-size: 30px;margin: 15px 15px 5px 0; font-weight: bold; color: #ffce0c">,שלום אורח

    </p>
    <p v-if="userExist && (/[\u0590-\u05FF]/).test(textName)"
       style="text-align: right; font-size: 30px;margin: 15px 15px 5px 0; font-weight: bold; color: #ffce0c">,שלום
      {{ textName }}
    </p>
    <p v-if="userExist && !(/[\u0590-\u05FF]/).test(textName)"
       style="text-align: right; font-size: 30px;margin: 30px 15px 0 0; font-weight: bold; color: #ffce0c">
      ,{{ textName }} שלום</p>


    <div class="q-pa-xl-lg">
      <q-parallax :height="500" :width="350" :speed="0.5">
        <template v-slot:media>
          <img src="../assets/autoparts.jpg">
        </template>

        <h3 style=" font-size: 50px;color: #ffce0c;letter-spacing: 1.5px; font-weight: bold">
          La Fabela
        </h3>
        <button
            style="margin-top: 40px;padding: 10px 20px;background-color: #ffce0c;font-weight: bold;
            border: none; border-radius: 5px"
            @click="addItemScreen()">פרסם מודעה
        </button>
      </q-parallax>
    </div>

    <div style="height: 130px;text-align: center; padding: 14px 10px 15px 10px;
        margin: 45px auto; position: relative; background-color:  #ffce0c">
      <div style="height: 100px;padding: 10px; font-size: 25px; color: #212529">
        ,מספיק לשמור חלקים בבית
        <p>תפרסם ותרוויח <span style="font-weight: bold">כסף</span></p>
      </div>
    </div>

    <div class="q-pa-xl-lg" style="position: relative; display: flex; flex-direction: column;
     justify-content: space-between; align-items: center">
      <img src="../assets/usedPart.png" style="max-width: 100%; max-height: 80%; min-height: 60%;  position: absolute">

      <h3 style="color: #ffce0c;position: absolute;font-size: 35px;
         text-align: center;letter-spacing: 2.5px; font-weight: bold; top: 380px">
        <div style="margin: 10px">חלקים משומשים</div>
      </h3>
      <button
          style="margin-top: 430px;padding: 10px 40px;background-color: #ffce0c;
            font-size: 15px;letter-spacing: 1px;font-weight: bold;border: none; border-radius: 5px"
          @click="goToUsedParts()">
        חיפוש
      </button>
    </div>

    <div style="height: 130px;text-align: center; padding: 14px 16px 15px 10px; bottom: 15px;
        margin: 45px auto; position: relative;padding: 20px 0; background-color: #ffce0c">
      <div style="height: 100px; font-size: 25px; color: #212529">
        ,בוא להנות ממחירים טובים
        <p style="">חלקים איכותיים לכיס שלך </p>
      </div>
    </div>

    <div class="q-pa-xl-lg" style="position: relative; bottom: 30px; display: flex; flex-direction: column;
     justify-content: space-between; align-items: center">
      <img src="../assets/pngegg.png" style="max-width: 100%; max-height: 80%; min-height: 60%;  position: absolute">
      <!--      <q-parallax :height="510" :speed="0.9">-->
      <!--        <template v-slot:media>-->
      <!--        </template>-->

      <h3 style="color: #ffce0c;position: absolute;font-size: 35px;
         text-align: center;letter-spacing: 2.5px; font-weight: bold; top: 380px">
        <div style="margin: 10px">חלקים חדשים</div>
        <!--          <div style="margin: 20px">?חדשים לרכב</div>-->
        <!--          <div style="margin-top: 20px"> לחץ כאן</div>-->
      </h3>
      <button
          style="margin-top: 430px;padding: 10px 40px;background-color: #ffce0c;
            font-size: 15px;letter-spacing: 1px;font-weight: bold;border: none; border-radius: 5px"
          @click="goToNewParts()">
        חיפוש
      </button>
      <!--      </q-parallax>-->
    </div>


    <!--    <div  style="position: relative; bottom: 70px; display: flex; flex-direction: row;-->
    <!--     justify-content: center; align-items: center;height: 250px">-->

    <!--      <img src="../assets/pngegg.png" style="max-width: 100%;min-width: 25%; max-height: 90%; min-height: 50%; position: absolute">-->

    <!--      <div style="color: #ffce0c;position: absolute;font-size: 4vh;-->
    <!--         text-align: center;letter-spacing: 2.3px; font-weight: bold; top: 89%; position: absolute">-->
    <!--        <div style="margin: 10px; ">חלקים חדשים</div>-->
    <!--      </div>-->

    <!--      <button-->
    <!--          style="margin: 330px 0; padding: 10px 40px;background-color: #ffce0c;-->
    <!--            font-size: 15px;letter-spacing: 1px;font-weight: bold;border: none;-->
    <!--             border-radius: 5px; "-->
    <!--          @click="goToNewParts()">-->
    <!--        חיפוש-->
    <!--      </button>-->
    <!--    </div>-->


  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem";
import TableViewer from "../components/TableViewer";
import Cards from "../components/Cards";
import axios from "axios";
import {mapActions, mapMutations, mapState} from 'vuex'
import Insta from "../components/Insta";
import PushNotification from "../components/PushNotification";
// $store.state.users.editedUser.userName

export default {
  name: 'Home',
  components: {
    Insta,
    AddItem,
    // TableViewer,
    Cards
  },
  props: ['out'],
  data() {
    return {
      test: true,
      userExist: false,
      alertUser: false,
      flag: true,
      privateParts: true,
      storeParts: true,
    }
  },
  computed: {
    ...mapState('users', ['privateUser', 'userStore']),
    textName: function () {
      // debugger
      if (this.userStore.imStore) {
        this.avatarHome = this.userStore.url;
        return this.userStore.userName;
      } else {
        return this.privateUser.userName;
      }
    }
  },
  methods: {
    ...mapActions('items', ['getPrivateItems', 'getStoreItems', 'getUserDetails']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo', 'getStores', 'getUsers']),
    ...mapMutations('users', ['resetEditedUser', 'resetStoreEditedUser']),

    addItemScreen() {
      debugger
      if (window.user) {
        this.$router.push(`/AddItem`);
      } else {
        debugger
        this.alertUser = true;
        this.$router.push(`/Connections`)
      }
    },

    goToUsedParts() {
      this.$router.push('/searchUsedParts');
    },

    goToNewParts() {
      this.$router.push('/searchNewParts');
    },

  },
  async created() {
    debugger
    window.scrollTo(0, 0);
    if (!window.user) {
      this.resetEditedUser();
      this.resetStoreEditedUser();
    }
    if (window.user) {
      debugger
      this.userExist = true;
      await this.getStoreInfo();
      await this.getUserInfo();
    }
    await this.getPrivateItems();
    await this.getStoreItems();
  }
}
</script>
