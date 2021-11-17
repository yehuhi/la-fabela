<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/background.jpg" style="height: 150px; width: auto">-->
    <p style="text-align: right; font-size: 30px;margin: 30px 15px 0 0; font-weight: bold; color: #bf360c">,היי {{$store.state.users.editedUser.userName}}</p>
    <AddItem :tableName="tableName" @itemAdded="reloadTable"/>
    <Cards :tableName="tableName" :isReload="isReload" :flag="flag"/>
    <!--    <TableViewer :table-name="'tableItem'" :isReload="isReload"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem";
import TableViewer from "../components/TableViewer";
import Cards from "../components/Cards";
import axios from "axios";
import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: 'Home',
  components: {
    AddItem,
    TableViewer,
    Cards
  },

  data() {
    return {
      isReload: false,
      tableName: 'items',
      flag: true
    }
  },
  methods: {
    ...mapActions('items', ['getItems']),

    reloadTable() {
      this.isReload = !this.isReload;
    },
    getModelCars() {
      axios.get('http://localhost:5000/model-cars')
          .then(result => {
          })
          .catch(error => console.log(error))
    }
  },
  created() {
    this.getItems();
    // this.getModelCars();
  }
}
</script>
