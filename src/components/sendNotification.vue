<template>
  <!--  <div>-->
  <!--    <div>-->
  <!--      &lt;!&ndash;      <q-btn @click="sendNotifications">N</q-btn>&ndash;&gt;-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import login from "./auth/login";
import {getMessaging, onMessage} from "firebase/messaging";
import {mapActions, mapState} from "vuex";

export default {
  name: "sendNotification",
  props: ['newNotificacions', 'usersPostComment', 'usersPostComment2'],
  data() {
    return {
      userTokeno: '',
      title: 'LA FABELA TEST',
      msg: 'מבצעים מטורפים עכשיו אצלנו !',
      img: 'https://w7.pngwing.com/pngs/230/168/png-transparent-car-chevrolet-orlando-scooter-spare-part-motorcycle-car-scooter-bicycle-vehicle.png',
      action: "https://la-fabela.web.app/#/insta/"
    }
  },
  computed: {
    ...mapState('users', ['userToken', 'notiFlag']),
  },
  methods: {
    ...mapActions('users', ['getUserToken', 'getUsersToken']),
    async sendNotifications() {
      let userTokeno = '';
      debugger
      if (!this.usersPostComment[0]) {
        userTokeno = await this.getUserToken();
      } else {
        userTokeno = this.usersPostComment;
      }
      debugger
      if (userTokeno.token === null) {
        userTokeno.token = userTokeno.userId;
      }

      if (this.usersPostComment[0]) {
        for (let i = 0; i < this.usersPostComment.length; i++) {
          debugger
          this.sendNoti(this.usersPostComment[i], this.newNotificacions);
          debugger
        }
      } else {
        this.sendNoti(userTokeno)
      }
    },

    sendNoti(userTokeno, notification) {
      debugger
      let body = {};
      if (notification === undefined) {
        body = {
          to: userTokeno.token,
          notification: {
            title: ` ${userTokeno.userName} הגיב/ה בפוסט `,
            body: userTokeno.comment,
            icon: userTokeno.avatar,
            click_action: `https://la-fabela.web.app/#/insta/${userTokeno.postUserId}`
          },
          data: {
            userName: "La Fabela",
            userPostCommentId: window.user.uid,
          }
        }
      } else {
        body = {
          to: userTokeno.userToken,
          notification: {
            title: ` ${notification.userName} הגיב/ה בפוסט `,
            body: notification.comment,
            icon: notification.avatar,
            click_action: `https://la-fabela.web.app/#/insta/${notification.postUserId}`
          },
          data: {
            userName: "La Fabela",
            userPostCommentId: window.user.uid,
          }
        }
      }

      debugger
      let options = {
        method: "POST",
        headers: new Headers({
          Authorization: "key=AAAAJTO2NQI:APA91bEzScX8n1NqiI4gFjs1XsLLkJtA5jytrXG4rQKgy071A7pTRjrw7g2YfBYf14DyrD0gme_XsdAuGlndSq02c-IrKlLypmNbKn9Z-LM-mxMSQHLcEyvzxbV9Flm_tF2K3QIhdQZr",
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
      };
      debugger
      fetch("https://fcm.googleapis.com/fcm/send", options).then(
          (res => {
            debugger
            console.log(res, 'sent');
          })).catch(e => console.log(e));

      setTimeout(() => {
        debugger
        body = {};
        options = {};
      }, 2000);

    }
  },
  created() {
    debugger
    if (this.newNotificacions !== undefined) {
      console.log('CONGRATULATIONS', this.newNotificacions)
      if (window.user) {
        debugger
        this.sendNotifications();
      }
    }
  }
}
</script>

<style scoped>

</style>