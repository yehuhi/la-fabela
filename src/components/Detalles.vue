<template>
  <div>
    <div v-for="(item, index) in items" style=" padding-right: 20px;  text-align: right;">
      <p>{{ item.textPart }}</p>
      <p>{{ item.manufacturer }}</p>
      <p>{{ item.model }}</p>
      <p>{{ item.selectYear }}</p>
      <p>{{ item.quantityPart }}</p>
      <p>{{ item.status }}</p>
      <p>{{ item.pricePart }}</p>
    </div>
  </div>
</template>

<script>
import carsDatabase from '../middleware/firebase/database/cars'
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Detalles",
  data() {
    return {
      // items: [],
      tableName: 'items'
    }
  },
  computed:{
    ...mapState('items',['editedItem', 'items']),
  },
  methods: {
    ...mapActions('items', ['getItems','getInfoCards']),
    ...mapMutations('items', ['setEditedItemId']),

    read() {
      this.setEditedItemId(this.$route.params.id);
      this.getInfoCards();
    }
  },
  created() {
    this.read();
  }
}
</script>

<style scoped>

</style>