<template>
  <div v-if="alerta">
    <div id="notification-box" class="notification-box" v-for="(notif, index) in notificaciones" :key="index">
      <a href="#" id="notification-close" @click="closed" title="close">x</a>

      <div @click="doSomething(notif.id)" class="notification-data">
        <div class="notification-title">
          <p class="notification-title">
            {{ notif.title }}
            <br/>
            <span class="title" style="font-size: 10px; font-weight: 600;">{{ notif.from }}</span>
          </p>
        </div>

        <div class="notification-notice">
          <p id="subject">{{ notif.subject }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// import firek from '../middleware/firebase'
import fire from "firebase/messaging";
import {getMessaging, onMessage} from "firebase/messaging";
import {mapActions, mapState} from "vuex";

export default {
  name: "NotificationBox",
  components: {},
  props: ['flag'],
  data() {
    return {
      userCheckId: '',
      notifBadge: 0,
      alerta: false,
      arrayNoty: [],
      noti: {
        title: "",
        from: "",
        subject: "",
      },
      userimg: "",
      currentMessage: "",
      notify: false,
    };
  },
  computed: {
    ...mapState('users', ['notification']),
    notificaciones: function () {
      debugger
      if (this.userCheckId !== window.user.uid) {
        return this.arrayNoty;
      }
    }
  },
  methods: {
    ...mapActions('users', ['getMyNotifications', 'getUserInfo']),
    async receiveMessage() {
      try {
        debugger
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
          //   console.log('Message received. ', payload);
          // });
          //   await firebase.messaging().onMessage((payload) => {
          // firebase.messaging().onBackgroundMessage((payload) => {
          this.alerta = false;
          console.log(this.alerta)
          debugger
          this.currentMessage = payload;
          console.log(this.currentMessage);
          console.log("Message received. ", payload);
          let message;
          message = payload.notification.title + ":\n\n" + payload.notification.body + ":\n\n" + payload.data.userName;
          this.userCheckId = payload.data.userPostCommentId
          this.setNotificationBoxForm(
              payload.notification.title,
              payload.data.userName,
              payload.notification.body,
          );
          console.log(message)
          // this.notify = true;
          this.alerta = true;
          console.log(this.alerta)
          setTimeout(() => {
            // this.notify = false;
            this.alerta = false;
          }, 3000);
        });
      } catch (e) {
        console.log(e);
      }
    },

    setNotificationBoxForm(title, from, subject) {
      debugger
      this.noti.title = title;
      this.noti.from = from;
      this.noti.subject = subject;
      this.arrayNoty.push(this.noti);
      debugger
      this.$emit('is-Reload', this.userCheckId);
    },

    doSomething(id) {
      debugger
      this.$router.push(`/insta/${id}`);
    },

    closed() {
      console.log('BE CLOSED');
      this.alerta = false;
    }
  },
  created() {
    debugger
    if (window.user) {
      debugger
      this.receiveMessage();
    }
  }
}
// validations: function () {
//   return {};
// },
// };
</script>

<style scoped>

.notification-box {
  display: flex;
  position: fixed;
  right: 20px;
  border-radius: 10px;
  top: 65px;
  width: 90%;
  height: 100px;
  background-color: #ffcf00;
  z-index: 999;
}

#notification-close {
  position: absolute;
  color: #4d4c4c;
  font-size: 14px;
  right: 15px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 4px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}

.notification-data p {
  margin: 10px 0;
}

.notification-notice p {
  font-size: 16px;
  font-weight: 400;
}

p {
  margin: 0;
}

/*.notification-title p {*/
/*  font-size: 18px;*/
/*  font-weight: bold;*/
/*  line-height: 18px;*/
/*}*/


.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}

img {
  width: 30px;
}
</style>
