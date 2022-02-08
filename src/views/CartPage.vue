<template>
  <div>
    <!--<h5>SHALOM CART PAGE</h5>-->
    <Cart :idProduct="idProduct"/>
  </div>
</template>

<script>

import Cart from "../components/Cart";
import {mapState} from "vuex";

export default {
  name: "CartPage",
  components: {
    Cart
  },
  data() {
    return {
      idProduct: ''
    }
  },
  computed: {
    ...mapState('items', ['editedItemId'])
  },
  methods: {},
  created() {
    debugger
    this.idProduct = this.editedItemId;

  }
}
</script>

<style>

</style>