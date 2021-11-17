<template>
  <div>
    <!--    {{ $route.params.id }}-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    {{ this.item }}-->
    <br>
    <AddItem v-if="flag" :tableName="tableName" :item="item"></AddItem>

  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage'
// import api from "../middleware/api";
// const tableName = 'tableItem';

import AddItem from "../components/AddItem";
import firebaseDatabase from "../middleware/firebase/database"
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Item",
  components: {
    AddItem
  },
  data() {
    return {
      item: {},
      tableName: 'items',
      flag: false
    }
  },
  // computed: mapState('items', ['editedItem', 'items']),
  methods: {
    // ...mapActions('items', ['setEditItemById']),
    // ...mapMutations('items', ['setEditedItemId','setEditedItem']),
    // get() {
    //   debugger
    //   this.setEditedItemId(this.$route.params.id)
    //   this.setEditItemById()
    // },
    // getItemByIds(this.$route.params.id){
    //   this.setEditItemById(this.$route.params.id);
    //   // this.setEditedItem();
    // },

    getItemByIds() {
      firebaseDatabase.getById({entity: this.tableName, itemId: this.$route.params.id})
          .then(result => {
            // debugger
            this.item = result;
            this.flag = true
            console.log(this.item, 'im item')
          })
      // this.item = localStorageDriver.getItemById(this.tableName, this.$route.params.id);
    }
  },
  created() {
    // debugger// In loading the component, active the method - getItemByIds()
    this.getItemByIds(this.$route.params.id);
  //   this.get();
  }
}
</script>

<style scoped>

</style>