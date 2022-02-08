<template>

  <div style="display: flex; flex-direction: column; flex-wrap: wrap; align-content: center">
    <h5 style="align-self: flex-end;  font-size: 30px; margin: 20px 10px 30px 0;
     font-weight: bold; color: #ffce0c"> הזמנת חלקים +</h5>

    <q-card v-for="(product, index) in products" :key="index" id="carrds">
      <div style="width: 99%;height: 70px; border: transparent solid 5px; position: relative;">
        <div style="margin-left: 100px; top: 5px ;display: flex ; align-items: center;
         justify-content: space-between; padding: 2px;
       position: relative ;border-radius: 10px; width: 100px; height: 50px">
          <q-btn @click="calc(minus=1, plus=0, product.id, products)"
                 style="position: absolute; background-color: #ffcf00; width: 30px"> -
          </q-btn>
          <p style="position: absolute; margin: 3px 0 0 40px; font-size: 18px;font-weight: bold"> {{
              product.quantity
            }} </p>

          <q-btn @click="calc(minus=0, plus=1, product.id, products)"
                 style="position: absolute; margin-left: 60px; background-color: #ffcf00; width: 30px"> +
          </q-btn>
        </div>
        <div style="; width: 50px; margin: -45px 0 5px 305px ">
          <img :src="product.url" style=";border-radius: 10px; width: 50px; height: 50px"/>
        </div>
        <div style="margin: -55px 0 0 197px; position: absolute">
          <p style="text-align: right; position: absolute; font-size: 9px; font-weight: bold ; width: 100px">
            {{ product.manufacturer }}</p>
        </div>
        <div style="margin: -40px 0 0 190px; position: absolute; width: 120px">
          <p style="direction: rtl; text-align: right; font-size: 13px;width: 95px; padding: 0; margin: 0 auto ;
              text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 95px">{{
              product.textPart
            }}</p>
        </div>
        <div style="margin: -55px 0 0 53px; position: absolute;">
          <p style="text-align: right; font-size: 10px; font-weight: bold; color: blue">מחיר</p>
        </div>
        <div style="margin: -40px 0 15px 50px; position: absolute;">
          <p style="text-align: right; font-size: 12px;font-weight: bold">
            {{ product.pricePart }}</p>
        </div>
        <!--      <p style="text-align: right;margin: -105px 350px 80px 0; font-size: 15px;">a</p>-->
        <div style="margin: -55px 0 0 1px">
          <q-btn @click="deleteMyItem(product)"
                 style="text-align: right;width: 30px; font-size: 15px; color: #f50404; font-weight: bold">
            x
          </q-btn>
        </div>
      </div>
    </q-card>

    <div style="text-align: right ;top: 77%;width: 100%; height: 40px;position: fixed; background-color: white">
      <div style="display: flex; flex-direction: column; align-items: center; ">
        <p style="text-align: center; padding-top: 10px; font-weight: bold; width: 160px">
          <span style="font-size: 15px;color: #fa5050">{{ total }}</span> - סה"כ לתשלום </p>

        <div style=" margin: -37px 190px 0 0;color: #000000; font-weight: bold;width: 40px; ">
          ש"ח
        </div>
      </div>
      <div style="position: absolute; margin-top: 15px;width: 100%; display: flex; justify-content: center">
        <button @click="payNewItems"
                style="cursor: pointer; height: 40px; width: 190px; font-size: 18px; font-weight: bold;
           left: 95px; border-radius: 5px; background-color: #ffcf00; border: none">
          ביצוע תשלום
        </button>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 90%; height: 200px; background-color: #ffd752; border-radius: 10px">
        <!--        <q-card-section>-->
        <div style="margin: 10px 25px 0 0;text-align: right; font-weight: bold; font-size: 20px; color: #0000fc">
          :הודעה
        </div>
        <!--        </q-card-section>-->

        <q-card-section class="q-pt-none" style="text-align: right">
          <p style="margin: 5px 10px 0 0;font-size: 24px">
            נכון להיום, <span style="font-weight: bold; color: #797979">חד פעמי...</span> המוצרים בחינם בשבילך
            תודה שקנית אצלנו</p>

        </q-card-section>
        <q-card-actions align="left">
          <q-btn flat label="OK" color="red" v-close-popup style="margin: -25px 0 0 0"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from "vuex";

export default {
  name: "Cart",
  props: ['idProduct'],
  data() {
    return {
      alert: false,
      minus: 0,
      minusA: 1,
      plus: 0,
      plusA: 1,
      idItemCart: '',
      totalx: 0,
      yyyy: this.myCartItems,
    }
  },
  computed: {
    ...mapState('items', ['cartItems', 'itemsPrivate', 'cartItemsTotal', 'myCartItems']),
    ...mapState('users', ['userStore']),
    products: function () {
      debugger
      if (this.myCartItems[0]) {
        return this.myCartItems;
      }
      // return this.myCartItems;
    },
    total: function () {
      debugger
      return this.cartItemsTotal
    }
  },
  methods: {
    ...mapActions('items', ['setEditItemById', 'getCartItems', 'calcObjCart', 'getCartTotal', 'getMyCartItems', 'deleteCartItem']),
    ...mapActions('users', ['getStoreInfo', 'getUserInfo']),
    ...mapMutations('items', ['setEditedItemId']),
    ...mapMutations('users', ['resetStoreEditedUser']),

    async calc(minus, plus, productId, products) {
      debugger
      if (minus === undefined) {
        products = this.myCartItems;
        this.totalx = await this.calcObjCart({minus, plus, productId, products, store: this.userStore.imStore});
      } else {
        for (let i = 0; i < products.length; i++) {
          debugger
          if (products[i].id === productId) {
            debugger
            if (products[i].quantity > 0) {
              debugger
              if (minus === 0 || (products[i].quantity > 1 && minus === 1)) {
                debugger
                this.totalx = await this.calcObjCart({minus, plus, productId, products, store: this.userStore.imStore});
                debugger
              }
              // else {
              // products = this.myCartItems;
              // this.totalx = await this.calcObjCart({minus, plus, productId, products});
              // }
              console.log(this.totalx)
              debugger
            }
          }
        }
      }
    },

    deleteMyItem(product) {
      debugger
      this.setEditedItemId(product.id);
      debugger
      this.deleteCartItem(parseInt(product.pricePart));
      debugger
    },

    payNewItems() {
      debugger
      this.alert = true;
    }
  },
  created() {
    debugger
    this.getStoreInfo().then(() => {
      debugger
      // this.resetStoreEditedUser();
      debugger
      this.getMyCartItems(this.userStore).then(() => {
            debugger
            this.calc();
          }
      )
    })
    // this.getCartItems();
    if (this.idProduct) {
      debugger
      // this.setEditedItemId(this.$route.params.id);
      this.setEditItemById(this.idProduct);
    }

    this.getUserInfo();
    debugger
  }
}
</script>

<style>

#carrds {
  max-width: 800px;
  height: 70px;
  width: 370px;
  /*max-height: 20%;*/
  margin: 0 0 20px 0;
  border-radius: 3px;
  position: relative;
  display: flex;
  justify-content: space-around;
}

</style>