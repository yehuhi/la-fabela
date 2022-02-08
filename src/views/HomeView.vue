<!--<template>-->
<!--  <div>-->
<!--    <push-notification-->
<!--        ref="pushNotification"-->
<!--        :currentToken="userToken"-->
<!--        @update-token="onUpdateToken"-->
<!--        @new-message="onNewMessage"/>-->

<!--    <div id="snackbar-message" class="mdl-js-snackbar mdl-snackbar">-->
<!--      <div class="mdl-snackbar__text"></div>-->
<!--      <button class="mdl-snackbar__action" type="button"></button>-->
<!--    </div>-->

<!--    <div class="mdl-grid">-->
<!--      <div class="mdl-cell mdl-cell&#45;&#45;3-col mdl-cell mdl-cell&#45;&#45;1-col-tablet mdl-cell&#45;&#45;hide-phone"></div>-->
<!--      <div class="mdl-cell mdl-cell&#45;&#45;6-col mdl-cell&#45;&#45;4-col-phone">-->

<!--        <div v-show="askForPermission && !userToken" class="headline"-->
<!--             style="background-color: #ff897d; padding: 20px; border-radius: 6px; color: #fff;">-->
<!--          היי, תלחץ כאן כדי לאשר קבלת התראות מ-לה פבאלה!!!-->
<!--          <button class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-js-ripple-effect"-->
<!--                  @click="enableNotifications">-->
<!--            אישור התראות-->
<!--          </button>-->
<!--        </div>-->

<!--        <div v-show="userToken">-->
<!--          <h2>Try to send a message to this user by:</h2>-->
<!--          <div-->
<!--              style="background-color: rgb(65, 65, 65); padding: 20px; border-radius: 6px; color: rgb(228, 255, 0); font-family: monospace;">-->
<!--            <p>-->
<!--              curl -i -H 'Content-type: application/json'-->
<!--              -H 'Authorization: key={{ firebaseServerKey }}'-->
<!--              -XPOST https://fcm.googleapis.com/fcm/send -d '{-->
<!--              "registration_ids":["{{ userToken }}"],-->
<!--              "notification": {-->
<!--              "title":"Title of your notification",-->
<!--              "body":"content of your notification"-->
<!--              }-->
<!--              }'-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import PushNotification from '/components/PushNotification'-->
<!--import api from '/api/api'-->

<!--export default {-->
<!--  components: {-->
<!--    PushNotification-->
<!--  },-->
<!--  methods: {-->
<!--    enableNotifications() {-->

<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    var userLoggedId = 1-->
<!--    // check if user has a token-->
<!--    api.user_profile(userLoggedId).then((response) => {-->
<!--      this.userProfile = response.data-->
<!--      this.userToken = this.userProfile.push_notification.ask_for_permission.token-->
<!--      if (this.userProfile.push_notification.ask_for_permission) {-->
<!--        setTimeout(() => {-->
<!--          // Simulate it wont ask for permission in the first user access-->
<!--          this.askForPermission = true-->
<!--        }, 4000)-->
<!--      }-->
<!--    })-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      firebaseServerKey: 'AAAAJTO2NQI:APA91bFvq9vtnfWLMVI5uEwu3JJbtP2vHKCn7BxCLDR_M_GAm0CCyXp0lBNrb8pqxwOL_tb7kyRfBtGy1_DoIYCq_gK0kfn-ZKhROw4x8TaCfSAezsw1_lNHXWxhSWb8C0JkefBex4nl',-->
<!--      userProfile: {},-->
<!--      askForPermission: false,-->
<!--      userToken: null-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.add-picture-button {-->
<!--  position: fixed;-->
<!--  right: 24px;-->
<!--  bottom: 24px;-->
<!--  z-index: 998;-->
<!--}-->

<!--.image-card {-->
<!--  position: relative;-->
<!--  margin-bottom: 8px;-->
<!--}-->

<!--.image-card__picture > img {-->
<!--  width: 100%;-->
<!--}-->

<!--.image-card__comment {-->
<!--  position: absolute;-->
<!--  bottom: 0;-->
<!--  height: 52px;-->
<!--  padding: 16px;-->
<!--  text-align: right;-->
<!--  background: rgba(0, 0, 0, 0.5);-->
<!--}-->

<!--.image-card__comment > span {-->
<!--  color: #fff;-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--}-->
<!--</style>-->