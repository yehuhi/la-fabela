<template>
  <div dir="rtl">
    <!--    <q-toggle v-if="!toggleNotifications" v-model="toggleNotifications" checked-icon="check" label=""-->
    <!--              color="green" unchecked-icon="clear" @click="subscribeUser" style="margin: 0 100px -40px"/>-->

    <!--    <q-btn @click="subscribeUser" style="margin: 0 100px -40px;left: -120px; background-color: #212529; border-radius: 40px">-->
    <!--      -->
    <!--    </q-btn>-->
  </div>
</template>

<script>
import "firebase/messaging"
import firebase from "firebase/compat/app";
import {mapActions, mapState} from "vuex";

export default {
  name: 'PushNotification',
  data() {
    return {
      toggleNotifications: false,
      tokeno: 'test',
      tokeno1: false,
    }
  },
  methods: {
    ...mapActions('users', ['insertUserToken', 'getStoreInfo']),
    subscribeUser() {
      Notification.requestPermission().then(permission => {
        console.log(permission)
        debugger
        if (permission === "granted") {
          debugger
          if ('serviceWorker' in navigator) {
            debugger
            navigator.serviceWorker.register('firebase-messaging-sw.js',
                {scope: "firebase-cloud-messaging-push-scope"})
                .then((registration) => {
                  debugger
                  console.log(registration)
                  firebase.messaging().getToken({
                    vapidKey: "BD0DoRi7jc9p1SR7ZcB1raG0PVIc0jwrGl2cXrB7EyIzCjLI39FUpeWZP0iIJwGHwqr24iTn2V1yDa0dfeR3JPo",
                  }).then(currentToken => {
                    debugger
                    this.getStoreInfo().then(() => {
                      this.insertUserToken(currentToken);
                    })
                    debugger
                    // });
                    console.log(currentToken);
                    this.tokeno = currentToken;
                    this.toggleNotifications = true;
                  })
                }).catch()
            {
              console.error();
            }
          }
        }
      });
    },
    test() {
      this.tokeno1 = true;
    }
  },
  mounted() {
    // this.initialize()
  },
  created() {
    if (window.user) {
      debugger
      this.subscribeUser();
    }
  }
}
</script>