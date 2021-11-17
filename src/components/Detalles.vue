<template>
  <q-page>
    {{item}}
    <div style=" padding-right: 20px;  text-align: right;">
      <p>{{ item.manufacturer }}}</p>
      <p>דגם</p>
      <p>שנה</p>
      <p>כמות</p>
      <p>סטאטוס</p>
      <p>מחיר</p>
      <p>ברקוד</p>
    </div>
  </q-page>
</template>

<script>
import carsDatabase from '../middleware/firebase/database/cars'

export default {
  name: "Details",
  data() {
    return {
      item: [],
      tableName: 'items'
    }
  },
  methods: {
     read() {
      debugger
      carsDatabase.getCars2({entity: this.tableName, itemId: this.$route.params.id}).then(res => {
        this.item = res
        console.log('test..... ',this.item);
        debugger
      })
    }
  },
  created() {
    this.read();
  }
}
</script>

<style scoped>

</style>