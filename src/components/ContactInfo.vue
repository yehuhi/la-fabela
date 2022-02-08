<template>
  <div class="container">
    <div id="frame" v-for="(item, index) in cards" :key="index">
      <div id="frame-text">
        <q-input class="input-contact" borderless v-model="item.userName" label="שם משתמש"/>
        <q-input class="input-contact" borderless v-model="item.phone" label="מס' פלאפון"/>
        <q-input v-if="item.email.substring(0,8)+'...'" class="input-contact" borderless v-model="item.email"
                 label="אימייל"/>
        <q-img class="my-image" :src="item.url"
               style=" border-radius: 120px; height: 130px; max-width: 130px; right: 180px; margin-top: -210px"/>
      </div>
    </div>
  </div>
</template>

<script>
import dataUser from '../middleware/firebase/database/cars/index'
import {mapActions, mapState} from "vuex";

export default {
  name: "ContactInfo",
  props: ['itemsUser'],
  data() {
    return {
      cards: [],
      tableName: 'users',
      flag: true
    }
  },
  computed: {
    ...mapState('users', ['privateUser', 'userStore']),

  },
  methods: {
    ...mapActions('users', ['getStoreInfo', 'getStores']),
    wichUser() {
      debugger
      if (this.userStore.imStore) {
        this.tableName = 'stores'
      }
    },
    contactInfo() {
      debugger
      dataUser.getCards({entity: this.tableName})
          .then(res => {
            debugger
            this.cards.push(res);
          })
    },
  },
  async created() {
    // this.getStores();
    await this.wichUser();
    this.contactInfo();
  }
}
</script>

<style>
#background {
  background-color: #b2b2b2;
}

.container {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  /*flex-direction: column;*/
}

#frame {
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  display: flex;
  height: 250px;
  width: 90%;
  margin-top: -10px;
  background-color: #ffce0c;
  border-radius: 8px;
  max-width: 380px;
  /*text-align: center*/
}



.input-contact {
  justify-content: flex-end;
}

#frame-text {
  /*text-align: left;*/
  margin: 35px 1px 0 10px;
  font-weight: bold;
  font-size: 30px;
}

#signInBtn {
  margin: 70px 10px 0 10px;
  font-size: 20px;
  width: 20%;
  height: 50px;
  background-color: #b2b2b2;
}
</style>