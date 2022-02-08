<template>
  <q-layout view="hHh LpR fff">
    <NotificationBox :flag="flag" @is-Reload="isReload"/>
    <push-notification/>
    <q-header v-if="$route.meta.header !== 'connections'" elevated style="color: black; direction: rtl" dir="rtl">
      <q-toolbar style="background-color: #ffce0c" dir="rtl">
        <q-btn
            flat
            dense
            round
            @click="right = !right"
            aria-label="Menu"
            icon="menu"/>

        <q-toolbar-title>
          <q-item clickable @click="goHome">
            לה פבאלה
            <span style="font-size: 5px; font-weight: bold ">DEV</span>
          </q-item>
        </q-toolbar-title>
        <!-- Search Button Toolbar -->
        <q-btn round dense icon="search" @click="goToItems"/>
        <!-- Notifications Button Toolbar -->
        <!--        && notiAlarms-->
        <q-btn v-if="userExist" @click="notifUser" dense round icon="notifications"
               style="margin-right: 17px">
          <q-badge v-if="notifBadge > 0 && notiAlarms" color="red" floating transparent>
            {{ notifBadge }}
          </q-badge>
        </q-btn>
        <!-- Profile Button Toolbar -->
        <q-btn v-if="userExist === false && indicator === false" style="width: 50px;margin-right: 20px;
        border-radius: 8px" id="signOutBtn" @click="signIn()">
          כניסה
        </q-btn>
        <send-notification/>

        <q-item v-if="!tequilas" clickable @click="goProfile()">
          <q-icon v-if="tequilas" name="person_outline" style="margin-top: 4px; font-size: 25px; left: -10px"/>
          <img v-if="!tequilas" :src="avatarHome"
               style="margin-top: 2px; width: 35px; height: 35px; padding: 0; border-radius: 50px"/>
        </q-item>

      </q-toolbar>
    </q-header>
    <q-dialog v-model="notifications" transition-show="rotate" transition-hide="rotate">
      <!--      <draggable tag="v-layout" v-model="draggableNotifications">-->
      <!--      </draggable>-->
      <q-card v-if="notifBadge > 0 || notifBadge === 0 || notifBadge === -1" class="my-card"
              :style="[notifBadge === 0 || notifBadge === -1?{'display':'flex','flex-direction':'column','justify-content':'center','background-color': '#212529', 'height': '25%', 'top':'-210px'}
              :{'display': 'flex', 'flex-wrap':' wrap','align-content': 'flex-start',
               'justify-content': 'space-around', 'background-color': '#212529', 'height': '95%'}]">
        <q-card-section>
          <div v-if="notifBadge > 0" class="text-h5"
               style="direction: rtl; font-weight: bold; color: #ffcf00; font-size: 30px">
            התראות
          </div>
          <div v-if="notifBadge === 0 || notifBadge === -1" class="text-h5"
               style="direction: rtl; font-weight: bold; color: #ffcf00; font-size: 30px">
            אין התראות
          </div>
        </q-card-section>

        <q-card v-if="notifBadge > 0"
                style="background-color: #ffcf00; width: 90%;height: 100px; margin-top: 8px; border-radius: 5px"
                v-for="(notiAlarm, index) in notiAlarms" :key="index" @click="goInstush(notiAlarm.id, index)">
          <q-card-section>
            <!--            <div class="text-h6" style="direction: rtl; font-weight: bold">-->
            <!--              <span class="text-h6" style="direction: rtl; color: blue">-->
            <!--                {{ notiAlarm.userName }}-->
            <!--              </span>-->
            <!--              עשה לך לייק בפוסט-->
            <!--              <p class="text-subtitle1" style="direction: rtl">-->
            <!--                {{ notiAlarm.commentDate }} {{ notiAlarm.commentHour }}-->
            <!--              </p>-->
            <!--              <p style="direction: rtl; margin: 0 0 -5px; font-size: 15px">איזה רכב יפה </p>-->
            <!--              <q-icon color="green" name="thumb_up_alt" style="font-size: 18px; bottom: 70px; right: 180px"/>-->
            <!--            </div>-->

            <div class="text-h6" style="direction: rtl; font-weight: bold">
              <span class="text-h6" style="direction: rtl; color: blue">
                {{ notiAlarm.userName }}
              </span>
              הגיב/ה בפוסט
              <p class="text-subtitle1" style="direction: rtl">
                {{ notiAlarm.commentDate }} {{ notiAlarm.commentHour }}
              </p>
              <p style="direction: rtl; margin: 0 0 -5px; font-size: 15px;
               text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 230px">
                {{ notiAlarm.addComment }}
              </p>
              <!--              <q-icon color="blue" name="message" style="font-size: 18px; bottom: 70px; right: 152px"/>-->
            </div>

            <!--            <div class="text-h6" style="direction: rtl; font-weight: bold">-->
            <!--              <span class="text-h6" style="direction: rtl; color: blue">-->
            <!--                {{ notiAlarm.userName }}-->
            <!--              </span>-->
            <!--              פרסום פוסט חדש-->
            <!--              <p class="text-subtitle1" style="direction: rtl">-->
            <!--                {{ notiAlarm.commentDate }} {{ notiAlarm.commentHour }}-->
            <!--              </p>-->
            <!--              <p style="direction: rtl; margin: 0 0 -5px; font-size: 15px">איזה רכב יפה </p>-->
            <!--              <q-icon name="address_card" color="red" style="bottom: 70px; font-size: 18px"/>-->
            <!--            </div>-->


          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-img style="width: 50px; height: 50px; bottom: 75px; border-radius: 50px"
                   :src="notiAlarm.avatarUrl"/>
          </q-card-section>
        </q-card>


        <!--        <q-card style="background-color: #ffcf00; width: 90%;height: 100px; margin-top: 8px; border-radius: 5px">-->
        <!--          <q-card-section>-->
        <!--            <div class="text-h6" style="direction: rtl; font-weight: bold ">-->
        <!--              תגובה בפוסט-->
        <!--              <q-icon color="blue" name="message" style="font-size: 15px"/>-->
        <!--            </div>-->
        <!--            <div class="text-subtitle1" style="direction: rtl; color: blue">-->
        <!--              Moshe Rabeinu-->
        <!--            </div>-->
        <!--          </q-card-section>-->
        <!--          <q-card-section class="q-pt-none">-->
        <!--            <div style="direction: rtl; bottom: 40px; margin: 0">-->
        <!--              חלום הרכב הזה-->
        <!--            </div>-->
        <!--            <q-img style="width: 50px; height: 50px; bottom: 65px; border-radius: 50px"-->
        <!--                   src="https://yt3.ggpht.com/YqhZo-RLDLyop7mqnUTHZ9jpjPqw8w1Xi-W3VtPIj9sLOu70Pwx7K3bjRELGfsUsqkG5IbE_=s176-c-k-c0x00ffffff-no-rj"/>-->
        <!--          </q-card-section>-->
        <!--        </q-card>-->
        <!--        <q-card style="background-color: #ffcf00; width: 90%;height: 100px; margin-top: 8px;  border-radius: 5px">-->
        <!--          <q-card-section>-->
        <!--            <div class="text-h6" style="direction: rtl; font-weight: bold">פוסט בקבוצה-->
        <!--              <q-icon name="address_card" color="red" style="right: -85px;font-size: 18px"/>-->
        <!--            </div>-->
        <!--            <div class="text-subtitle1" style="direction: rtl; color: blue">-->
        <!--              Omri Brem-->
        <!--            </div>-->
        <!--          </q-card-section>-->
        <!--          <q-card-section class="q-pt-none">-->
        <!--            <p style="direction: rtl; bottom: 40px; margin: 0">-->
        <!--              מה תגידו על הג'נטים החדשות ?-->
        <!--            </p>-->
        <!--            <q-img style="width: 50px; height: 50px; bottom: 65px; border-radius: 50px"-->
        <!--                   src="https://www.football.org.il/ImageServer/GetImage.ashx?type=2&id=431061&width=240&height=305"/>-->
        <!--          </q-card-section>-->
        <!--        </q-card>-->

        <q-card-actions align="left" class="bg-gray text-black">
          <q-btn v-if="notifBadge > 0" @click="removeNotifications" flat label="נקה הכל"
                 style="background-color: #ffcf00; left: -120px; border-radius: 5px; top: 5px"/>
        </q-card-actions>
      </q-card>

    </q-dialog>


    <q-drawer
        :show-if-above=false v-model="right" side="right" content-class="bg-yellow-8">
      <q-list>
        <q-item-label header style="text-align: right; font-size: 15px">תפריט</q-item-label>
        <q-item clickable tag="a" @click="goProfile()">
          <q-item-section avatar>
            <!--            <q-icon name="personoutline"/>-->
            <q-img v-if="!tequilas" :src="avatarHome"
                   style="width: 35px;height: 35px; margin-top: 4px; font-size: 25px; left: -5px; border-radius: 30px"/>

          </q-item-section>
          <q-item-section>
            <q-item-label style="text-align: right; font-weight: bold"> פרופיל אישי</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="goToItems()">
          <q-item-section avatar>
            <q-icon name="search" style="text-align: right"/>
          </q-item-section>
          <q-item-section>
            <q-item-label style="text-align: right; font-weight: bold">חיפוש חלקים</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="goPurchaseGroup()">
          <q-item-section avatar>
            <q-icon name="groups"/>
          </q-item-section>
          <q-item-section>
            <q-item-label style="text-align: right; font-weight: bold">
              רכישה קבוצתית
              <span style="font-size: 7px; font-weight: bold ;letter-spacing: 1px; color: red">בקרוב</span>

            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="goInstushAll()">
          <q-item-section avatar>
            <q-icon name="party_mode"/>
          </q-item-section>
          <q-item-section>
            <q-item-label style="text-align: right; font-weight: bold">פינה חמה</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn v-if="userExist" style="left: 70px; border-radius: 8px" id="signOutBtn" @click="singOut()">
              התנתק
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>


    <q-footer class="my-footer" style="background-color: #ffcf00">
      <a :href="'https://www.facebook.com/'">
        <q-icon name="facebook" style="color: blue; font-size: 25px; position: absolute; left: 40%;top: 5px"/>
      </a>
      <a :href="'https://www.instagram.com/'">
        <q-icon name="facebook" style="color: green; font-size: 25px; position: absolute; left: 50%;top: 5px"/>
      </a>
      <a :href="'https://www.twitter.com/'">
        <q-icon name="facebook" style="color: #b01919; font-size: 25px; position: absolute; left: 60%; top: 5px"/>
      </a>
      <p style="background-color: #ffcf00; position: absolute; margin-top: 45px;"> כל הזכויות שמורות לחברת - לה פבאלה
        @</p>
    </q-footer>
  </q-layout>
</template>

<script>
import axios from 'axios';
import Home from "./views/Home";
import firebaseInstance from "./middleware/firebase";
import {mapActions, mapMutations, mapState} from "vuex";
import PushNotification from "./components/PushNotification";
import NotificationBox from "./components/NotificationBox";
import SendNotification from "./components/sendNotification";
import draggable from "vuedraggable";
import mapGetters from "vuex/dist/vuex.mjs";

export default {
  name: 'LayoutDefault',
  components: {SendNotification, NotificationBox, PushNotification, Home, draggable},
  data() {
    return {
      menuShow: true,
      userExist: false,
      out: false,
      indicator: false,
      myParts: false,
      arrayNotifications: [],
      tool: false,
      checkUser: '',
      flag: true,
      tequila: undefined,
      notify: true,
      notificationsAlarm: '',
      notifArr: [],
      notifBadge: 0,
      notifBadgeNum: 0,
      notifications: false,
      avatarHome: '',
      right: false
    }
  },
  computed: {
    ...mapState('users', ['privateUsers', 'privateUser', 'notification', 'userStore']),
    // draggableNotifications: {
    //   get()
    //   {
    //     return this.$store.state.;
    //   }
    // ,
    //   set(val)
    //   {
    //     this.$store.commit("setCardArray", val);
    //     }
    // },

    tequilas: function () {
      if (window.user === null) {
        debugger
        this.tequila = true;
      } else if (this.privateUser.url) {
        debugger
        this.avatarHome = this.privateUser.url;
        this.tequila = false;
      } else if (this.userStore.url) {
        debugger
        this.avatarHome = this.userStore.url;
        this.tequila = false;
      }
      return this.tequila;
    },
    notiAlarms: function () {
      debugger
      return this.arrayNotifications;
    },
  },
  methods: {
    ...mapActions('users', ['getUserInfo', 'getStoreInfo', 'getMyNotifications', 'removeNotif']),
    goProfile() {
      if (!this.$route.params.id) {
        this.right = false
        this.$router.push(`profile/${window.user.uid}`)
      }
    },
    goHome() {
      // this.$router.push(...).catch(() => { /* ignore */ })
      debugger
      this.$router.push('/').then(() => {
        if (this.indicator) {
          window.location.reload();
        }
      })
          .catch((error) => {
            /* ignore */
            console.log(error)
          })
    },

    goInstush(id, index) {
      this.$router.push(`/insta/${id}&&${index}`);
    },

    goInstushAll(id) {
      debugger
      this.right = false
      if (window.user) {
        this.$router.push(`/instushAll`);
      }
    },

    goToItems() {
      this.right = false
      this.$router.push('/SearchItems');
    },

    notifUser() {
      debugger
      if (this.$route.path.includes(`/insta`)) {
        this.$router.push('/');
      }
      this.notifications = true;
    },

    async removeNotifications() {
      debugger
      await this.removeNotif().then(() => {
        this.getMyNotifications().then(() => {
          debugger
          if (this.notifBadge > 0) {
            this.notifBadge = -1;
            this.notifications = false;
            console.log(this.notifBadge, 'CANTIDAD DE BADGES')
          }
        });
      })
    },

    isReload(checkUserId) {
      debugger
      this.checkUser = checkUserId;
      this.getMyNotifications().then(() => {
        debugger
        if (this.notification !== "") {
          if (this.notification.length !== 0) {
            debugger
            this.arrayNotifications = [];
            for (let i = 0; i < this.notification.length; i++) {
              if (this.notification[i].userId !== this.notification[i].userdPostId) {
                this.arrayNotifications.push(this.notification[i]);
                this.notifBadge = this.arrayNotifications.length;
                // this.notifBadgeNum = this.arrayNotifications.length;
              }
            }
          }
        }
      });
    },
    signIn() {
      debugger
      if (window.user) {
        this.userExist = true;
      } else {
        this.userExist = false;
        this.indicator = true;
      }
      this.$router.push('/Connections');
    },

    singOut() {
      debugger
      firebaseInstance.firebase.auth().signOut().then(() => {
        debugger
        this.right = false
        this.$router.push('/');
        window.location.reload();
        this.indicator = false;
        this.resetEditedUser();
        this.resetStoreEditedUser();

        // Sign-out successful.
      }).catch((error) => {
        console.error(error);
      });
    },
  },
  // beforeCreate() {
  //   if (window.user.uid) {
  //     this.userExist = true;
  //   }
  // },

  created() {
    debugger
    if (window.user) {
      this.userExist = true;
      this.isReload();
    }
  },
  // watch: {}
}
</script>

<style>

body {
  /*background-image: url('../src/assets/iron_back.jpg');*/
  background-color: #212529;
  /*background-image: url('../src/assets/iron_back.jpg');*/
  /*background-position: center top;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover, contain;*/
}

#signOutBtn {
  border-radius: 20px;
  background-color: #000000;
  width: 120px;
  justify-content: center;
  color: #ffcf00;
}

.my-footer {
  position: relative;
  display: flex;
  width: auto;
  min-height: 40px;
  height: 50px;
  background-color: #ffcf00;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: black;
}

.q-layout_section--marginal {
  background-color: #ffcf00;
}


</style>
