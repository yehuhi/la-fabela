<template>
  <q-page id="background">
    <div class="containers">
      <div id="frame" class="frame">
        <div id="frame-text">התחברות</div>
        <div id="signUp_container">
          <q-input style="text-align: right; width: 80%; margin-top: 50px" outlined v-model="email"
                   label="אימייל"/>
<!--          <q-input style="text-align: right; width: 80%; margin-top: 25px" id="input-userPassw" outlined-->
<!--                   v-model="password" label="סיסמא"/>-->

          <q-input style="text-align: center; width: 80%; margin-top: 20px" id="input-userPassw"
                   outlined clearable
                   v-model="password"
                   :type="isPwd ? 'password' : 'text'"
                    label="סיסמא">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"/>
            </template>
          </q-input>

          <q-btn id="signInBtn" @click="signIn()" rounded label="התחבר"/>
          <p id="linkGoogleSignIn" @click="singInGoogle">Google להתחברות עם </p>
          <p id="linkSignup" @click="goSignUp">להרשמה</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import database from "../../middleware/firebase/database";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "login",
  data() {
    return {
      isPwd: true,
      email: '',
      password: '',
      username: '',
      url: ''
    }
  },
  computed: {
    ...mapState('users', ['privateUser']),
  },
  methods: {
    ...mapActions('users', ['getUsers', 'getUserInfo', 'getStoreInfo']),
    ...mapMutations('users', ['resetEditedUser']),
    singInGoogle() {
      // debugger
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            // debugger
            // console.log(`if new user in the DB = ${result.additionalUserInfo.isNewUser}`)
            if (result.additionalUserInfo.isNewUser) {
              database.createUser(
                  {
                    entity: 'users', item: {
                      userName: result.additionalUserInfo.profile.given_name,
                      email: result.additionalUserInfo.profile.email,
                      url: result.additionalUserInfo.profile.picture
                    }
                  });
            }
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            window.user = result.user;
            this.$router.push('/addItem')
            //
          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
    },
    signIn() {
      debugger
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            window.location.reload();
            // Signed in
            let user = userCredential.user;
            window.user = user;
            debugger
            // window.location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    },
    goSignUp() {
      this.$emit('registerScreen'); // read to event on the home Component
    }
  },
  created() {
    // if (window.user) {
    //   this.$router.push('/');
    // }
  }
}
</script>

<style>


#background {
  background-color: #b2b2b2;
}

.containers {
  justify-content: center;
  display: flex;
}

#frame {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin-top: 45px;
  height: 500px;
  width: 90%;
  background-color: #ffce0c;
  border-radius: 20px;
  max-width: 700px;
}

#frame-text {
  text-align: center;
  margin: -10px 10px 0 10px;
  font-weight: bold;
  font-size: 30px;
}

#signInBtn {
  margin: 70px 10px 0 10px;
  font-size: 20px;
  width: 50%;
  height: 50px;
  background-color: #b2b2b2;
}

#linkGoogleSignIn {
  margin-top: 10px;
}

#linkGoogleSignIn:hover {
  opacity: .5;
  cursor: pointer;
}

#linkSignup {
  font-size: 20px;
  font-weight: bold;

}

#linkSignup:hover {
  opacity: .5;
  cursor: pointer;
}


</style>