<template>
  <q-page id="background">
    <div class="containers">
      <div id="frame" class="frame">
        <div id="frame-text">התחברות</div>
        <q-input style="text-align: right; width: 80%; margin-top: 50px" rounded outlined v-model="email" label="אימייל"/>
        <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw" rounded outlined v-model="password" label="סיסמא"/>
        <q-btn id="signInBtn" @click="signIn()" rounded label="התחבר"/>
        <p id="linkGoogleSignIn" @click="singInGoogle">Google להתחברות עם </p>
        <p id="linkSignup" @click="goSignUp">להרשמה</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import database from "../../middleware/firebase/database";

export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      username:'',
      url:''
    }
  },
  methods: {
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
                  {entity: 'users', item: {userName: result.additionalUserInfo.profile.given_name,
                                                  email: result.additionalUserInfo.profile.email,
                                                  url: result.additionalUserInfo.profile.picture}});
            }
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.user = result.user;
            this.$router.push('/home')
            //
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    signIn() {
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.user = user;
            this.$router.push('/home')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },
    goSignUp() {
      this.$emit('registerScreen'); // read to event on the home Component
    }
  },
  created() {
    if (window.user) {
      this.$router.push('/home');
    }
  }
}
</script>

<style>


#background {
  background-color: #b2b2b2;
}

.containers {
  justify-content: center;
  /*flex-wrap: wrap;*/
  display: flex;
  /*flex-direction: column;*/
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
  /*text-align: center*/
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