<template>
  <div class="item-detail-main">
    <div class="item-detail-card" v-if="products" v-for="(product, index) in products" :key="index">
      <div class="item-detail-image">
        <img id="item-image" :src="product.url"/>
      </div>
      <div class="item-detail-info">
        <div class="item-detail-info-inside">
          <p class="product-info-right product-info-white-color"><span
              class="product-info-yellow-color">שם מוצר - </span>{{ product.textPart }}</p>
          <p class="product-info product-info-white-color"><span
              class="product-info-yellow-color">יצרן - </span>{{ product.manufacturer }}</p>
          <p class="product-info-right product-info-white-color"><span
              class="product-info-yellow-color">דגם - </span>{{ product.model }}</p>
          <p class="product-info-right product-info-white-color"><span class="product-info-yellow-color"> שנה - </span>{{
              product.selectYear
            }}</p>
          <p class="product-info-right product-info-white-color"><span class="product-info-yellow-color">כמות - </span>{{
              product.quantityPart
            }}</p>
          <p class="product-info-right product-info-white-color"><span
              class="product-info-yellow-color">מצב - </span>{{ product.status }}</p>
          <p v-if="product.status === 'משומש'" class="product-info-white-color"><span class="product-info-yellow-color">מיקום - </span>{{
              product.location
            }}</p>
          <p class="product-info-right product-info-white-color"><span class="product-info-yellow-color">ברקוד - </span>{{
              product.numberPart
            }}</p>
          <p v-if="product.status === 'משומש'" class="product-info-left "><span> איש קשר - </span>{{ product.name }}</p>
          <p v-if="product.status === 'חדש'" class="product-info-left product-info-white-color"><span
              class="product-info-yellow-color"> שם חנות - </span>{{ product.name }}</p>
          <p class="product-info-white-color"><span class="product-info-black-color">מחיר - </span>{{
              product.pricePart
            }} ש"ח</p>
          <p><a class="phone-color" :href="'tel:'+product.phone"><span>טלפון - </span>{{ product.phone }}</a>
          </p>
          <a class="product-info-left-whatssap"
             :href="`https://api.whatsapp.com/send?phone=+972${product.phone}&text=${url}`">שלח וואטסאפ</a>
          <q-btn class="cart-button" v-if="!product.privateItem" @click="cart()">הוסף לסל</q-btn>

        </div>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Detalles",
  data() {
    return {
      tableName: 'items',
      url: ''
    }
  },
  computed: {
    ...mapState('items', ['editedItem', 'itemsPrivate', 'itemsStore', 'editedItemId']),
    products: function () {
      debugger
      // this.editedItem.http = window.location.href;
      debugger
      if (this.editedItem[0] !== "" && this.editedItem[0] !== undefined) {
        return this.editedItem
      }
    }
  },
  methods: {
    ...mapActions('items', ['getPrivateItems', 'getStoreItems', 'getInfoCards']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo']),
    ...mapMutations('items', ['setEditedItemId']),


    read() {
      debugger
      this.setEditedItemId(this.$route.params.id);
      this.getInfoCards();
      this.url = window.location.href;
      // this.url = 'http://localhost:8080/items-details/-Mq6B3EFT_2j3UOhBuJj';
    },
    cart() {
      this.$router.push(`/cartPage`);
    }
  },
  async created() {
    debugger
    await this.getStoreInfo();
    await this.getUserInfo();
    this.read();
    console.log('http/:', window.location.href);
  }
}
</script>

<style>


</style>