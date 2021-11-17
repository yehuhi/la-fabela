<template>
  <q-page id="background">
    <div class="container">
      <div id="frame">
        <div id="frame-text">הרשמה</div>
        <q-input style="text-align: right; width: 80%; margin-top: 30px" rounded outlined v-model="userName"
                 label="שם משתמש"/>
        <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw" rounded outlined
                 v-model="email"
                 label="אימייל"/>
        <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw" rounded outlined
                 v-model="phone"
                 label="מס' פלאפון"/>
        <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw" rounded outlined
                 v-model="password"
                 label="סיסמא"/>
        <q-file class="col-12 col-sm-4"
                bg-color="orange-1s"
                color="grey-3" rounded outlined
                v-model="imageUser"
                @input="imageSelected"
                accept="image/*"
                label="בחר תמונה"
                style="padding: 15px">
          <template v-slot:append>
            <q-icon name="attachment" color="orange"/>
          </template>
        </q-file>
        <q-btn id="signInBtn" rounded @click="signUp()" label="הירשם"/>
        <p id="linkSignIn" @click="goSignIn">משתמש קיים --> לחץ כאן</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import database from '../../middleware/firebase/database'
import storage from '../../middleware/firebase/storage'

export default {
  name: "register",
  props: [],
  data() {
    return {
      userName: '',
      tableName: 'users',
      email: '',
      password: '',
      phone: '',
      imageUser: null,
      url: ''
    }
  },
  methods: {
    imageSelected(file) {
      this.imageUser = file
    },
    signUp() {
      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // debugger
            storage.uploadImg({imageName: this.imageUser.name, file: this.imageUser})
                .then(res => {
                  this.url = res;
                  // debugger
                  console.log(this.url);
                  database.createUser({entity: this.tableName, item: {userName: this.userName, email: this.email, phone: this.phone, url: this.url}})
                });

            var user = userCredential.user;
            window.user = user;
            this.$router.push('/home')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },
    goSignIn() {
      this.$emit('loginScreen'); // read to event on the home Component
    }

  }
}
</script>

<style>

#frame-text {
  text-align: center;
  margin: 10px 10px 0 10px;
  font-weight: bold;
  font-size: 30px;
}

#signInBtn {
  margin-top: 20px;
}

#linkSignIn {
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;

}

#linkSignIn:hover {
  opacity: .5;
  cursor: pointer;
}
</style>