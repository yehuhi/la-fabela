<template>
  <q-page>
    <div style="height: 800px; padding: 0 5px; display: flex;flex-direction: column; align-items: center">
      <p style="text-align: center; font-size: 30px;margin: 10px 0;
       font-weight: bold; color: #ffce0c">פרטים על המוצר</p>
      <Detalles />
    </div>
  </q-page>
</template>

<script>
import Detalles from "../components/Detalles";
import {mapState} from "vuex";

export default {
  name: "ItemDetails",
  components: {
    Detalles,

  },
  computed:{
    ...mapState('items',['itemsPrivate'])
  },
  methods:{

  },
  created() {
    debugger
    window.scrollTo(0, 0);
  }
}
</script>

<style>

</style>