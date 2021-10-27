<template>
  <div>
<!--    {{ $route.params.id }}-->
<!--    <br>-->
<!--    <br>-->
<!--    {{ this.item }}-->
    <br>
    <AddItem :tableName="tableName" :item="item" ></AddItem>

 </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage'
import AddItem from "../components/AddItem";

// const tableName = 'tableItem';

export default {
  name: "Item",
  components:{
    AddItem
  },
  data() {
    return {
      item: {},
      tableName : 'tableItem'
    }
  },
  methods: {
    getItemByIds() {
      this.item = localStorageDriver.getItemById(this.tableName, this.$route.params.id);
    }
  },
  created() {   // In loading the component, active the method - getItemByIds()
    this.getItemByIds();
  }
}
</script>

<style scoped>

</style>