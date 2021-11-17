<template>
  <q-page class="q-pa-md constrain" style=" min-height: 0;">
    <p style="text-align: right; font-size: 30px; color: #ffce0c; font-weight: bold">: חלקים משומשים +</p>
    <div class="container">
      <q-card flat v-for="(product, index) in products" :key="index" class="my-card"
              style="position: relative;border-radius: 20px">
        <q-img @click="doSomething(product.id)" class="my-image" :src="product.url"
               style="position: absolute; border-radius:20px;max-width: 300px; height: 157px"/>
        <!--        <div v-ripple @click="doSomething(item.id)" class="card-touch">-->
        <q-card-section @click="doSomething(product.id)">
          <p class="card-title">{{ product.textPart }}</p>
          <p class="card-title"><span>מחיר - </span>{{ product.pricePart }} ש"ח</p>
        </q-card-section>
        <q-card-section class="card-details">
          <!--          <p><span>to </span>{{ item.manufacturer }}</p>-->
          <!--          <p><span>Model - </span>{{ item.model }} </p>-->
          <!--          <p><span>Year - </span>{{ item.selectYear }}</p>-->
          <!--          <p><span>Quantity - </span>{{ item.quantityPart }}</p>-->
          <!--          <p><span>Status - </span>{{ item.status }}</p>-->

        </q-card-section>
        <q-card-actions class="card-btn" style="display: flex; justify-content: center">
          <div class="my-btn">
            <q-btn v-if="!flag" rounded color="primary" label="עדכון" @click="gotoItem(product.id)"
                   style="margin-top: -110px; padding: 1px 0 1px 0"/>
            <q-btn v-if="!flag" rounded color="red" label="מחיקה" @click="deleteCard(product.id)"
                   style="margin-top: -110px; padding: 1px 0 1px 0"/>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage'
// import api from "../middleware/api";
// import firebaseDatabase from "../middleware/firebase/database"
// import storageDB from "../middleware/firebase/storage";
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Cards",
  components: {},
  props: ['flag'], // 'tableName', 'isReload', 'myCards',
  data() {
    return {
      // products: null,
      // cards: [],
    }
  },
  computed: {
    ...mapState('items', ['editedItem', 'items', 'myItems']),

    products: function () {
      if (this.flag) {
        return this.items
      } else return this.myItems
    }
  },

  methods: {
    ...mapActions('items', ['deleteItem', 'getItems', 'setEditItemById', 'getUserDetails']),
    ...mapMutations('items', ['setEditedItemId']),

    deleteCard(cardId) {
      this.setEditedItemId(cardId)
      // debugger
      this.deleteItem()
    },
    gotoItem(id) {
      this.flaq = true;
      this.$router.push(`/item/${id}`);
    },
    doSomething(id) {
      // this.$q.notify('לבדיקה בלבד')
      console.log(this.items)
      if (!this.flaq) {
        this.$router.push(`/items-details/${id}`);
      }
    },
    // remove(id) {
    //   // debugger
    //   // let newId = this.cards.find(x => x.id === id);
    //   // console.log(newId.imgName); newId.imgName
    //   storageDB.deleteImg({imageName: id})
    //       .then(() => {
    //         firebaseDatabase.remove({entity: this.tableName, id})
    //             .then(() => {
    //               this.$router.push('/used-parts')
    //               // this.read();
    //             });
    //       })
    // }
  },
  created() {
  },
  // watch: {
  //   isReload() {
  //     this.read()
  //   }
  // }
}

</script>

<style>

/*.my-btn:active {*/
/*  position: absolute;*/
/*  z-index: 10;*/
/*}*/

.q-card {
  height: 155px;
  width: 150px;
  /*padding: 0.5em;*/
  cursor: pointer;
  transition: 0.2s;
}

.my-card {
  transition: 0.2s;
}

.my-image {
  /*height: auto;*/
  /*width: 150px;*/
}

.q-card:hover {
  opacity: .6;
}

.container {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 1em;
}

.card-title {
  font-size: 1.2em;
  text-align: right;
  font-weight: bold;
  color: #ffcf00;
}

.card-details {

}

.card-details p {

}

.card-details span {
  font-weight: bold;
  text-transform: uppercase;
}

.card-btn .q-btn {
  padding: 0.3em 0.2em;
}

</style>