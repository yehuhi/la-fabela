<template>
  <div>
    <br>
    <AddItem v-if="flag" :tableName="tableName" :item="item"></AddItem>

  </div>
</template>

<script>
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
      debugger
      firebaseDatabase.getById({entity: this.tableName, itemId: this.$route.params.id})
          .then(result => {
            debugger
            this.item = result;
            this.flag = true
            debugger
            console.log(this.item, 'im item')
          })
    }
  },
  created() {
    this.getItemByIds(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>