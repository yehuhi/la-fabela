<template>
  <q-page id="background">
    <div class="container">
      <div id="frameSignup">
        <div id="frame-text">הרשמה</div>

        <div id="signUp_container">
          <q-input style="text-align: right; width: 80%; margin-top: 30px" outlined type="search"
                   clearable maxlength="7"
                   v-model="privateUser.userName" :label="labelName"/>

          <q-input v-if="toggleStore" style="text-align: center;  width: 80%;  margin-top: 20px"
                   id="input-address" clearable
                   outlined type="search"
                   v-model="userStore.address"
                   label="כתובת"/>

          <q-input v-if="toggleStore" style="text-align: center; width: 80%; margin-top: 20px"
                   id="input-userPassw" clearable
                   outlined type="search"
                   v-model="userStore.city"
                   label="עיר"/>

          <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw"
                   type="email" outlined clearable
                   v-model="privateUser.email"
                   label="אימייל"/>

          <q-input style="text-align: right; width: 80%; margin-top: 20px" id="input-userPassw"
                   outlined type="number" clearable
                   v-model="privateUser.phone"
                   label="מס' פלאפון"/>

          <q-input style="text-align: center; width: 80%; margin-top: 20px" id="input-userPassw"
                   outlined clearable
                   v-model="privateUser.password"
                   :type="isPwd ? 'password' : 'text'"
                    label="סיסמא">
            <template v-slot:append>
              <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"/>
            </template>
          </q-input>
<!--          hint="Password with toggle"-->
          <q-file class="col-12 col-sm-4"
                  bg-color="orange-1s"
                  color="grey-3" outlined
                  v-model="privateUser.imageUser"
                  @input="imageSelected"
                  accept="image/*"
                  label="בחר תמונה.."
                  style="padding: 15px">
            <template v-slot:append>
              <q-icon name="attachment" color="orange"/>
            </template>
          </q-file>

          <q-toggle v-model="toggleStore" checked-icon="check" label="? האם זה חנות " color="green"
                    unchecked-icon="clear" id="toogleBtn"
                    @click="userStore"/>
          <q-btn id="signInBtn" @click="signUp()" label="הירשם"/>
          <p id="linkSignIn" @click="goSignIn">משתמש קיים --> לחץ כאן</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import database from '../../middleware/firebase/database'
import storage from '../../middleware/firebase/storage'
import {mapMutations} from "vuex";

export default {
  name: "register",
  props: [],
  data() {
    return {
      // labelName: 'שם משתמש',
      toggleStore: false,
      isPwd: true,
      tableName: 'users',
      privateUser: {
        userName: '',
        email: '',
        password: '',
        phone: '',
        imageUser: null,
        url: '',
        imPrivate: ''
      },
      userStore: {
        address: '',
        city: '',
        imStore: false,
      }
    }
  },

  computed: {
    labelName: function () {
      if (this.toggleStore) {
        return "שם החנות"
      } else {
        return "שם משתמש"
      }
    }
  },
  methods: {
    ...mapMutations('users', ['resetEditedUser', 'resetStoreEditedUser']),
    imageSelected(file) {
      this.privateUser.imageUser = file
    },
    signUp() {
      if (this.toggleStore) {
        this.userStore.imStore = true
        Object.assign(this.privateUser, this.userStore);
        this.tableName = 'stores';
      }

      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.privateUser.email, this.privateUser.password)
          .then((userCredential) => {
            storage.uploadImg({imageName: this.privateUser.imageUser.name, file: this.privateUser.imageUser})
                .then(res => {
                  this.privateUser.url = res;
                  if (!this.toggleStore) {
                    this.privateUser.imPrivate = true;
                  }
                  database.createUser({entity: this.tableName, details: this.privateUser}).then(() => {
                    window.location.reload();
                  })
                });

            let user = userCredential.user;
            window.user = user;
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
          });
    },
    goSignIn() {
      this.$emit('loginScreen'); // read to event on the home Component
    }

  },
  created() {
    debugger
    this.privateUser.password = '';
  }
}
</script>

<style>

#signUp_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  align-items: center;
}

#frameSignup {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin-top: 45px;
  height: 650px;
  width: 90%;
  background-color: #ffce0c;
  border-radius: 10px;
  max-width: 700px;
}

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

#toogleBtn {
  margin: -5px 0 -15px 0;
}
</style>