<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/background.jpg" style="height: 150px; width: auto">-->
    <AddItem :table-name="'tableItem'" @itemAdded="reloadTable"/>
<!--    <TableViewer :table-name="'tableItem'" :isReload="isReload"/>-->
    <Cards :tableName="'tableItem'" :card="card"/>

  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem";
import TableViewer from "../components/TableViewer";
import Cards from "../components/Cards";

export default {
  name: 'Home',
  components: {
    AddItem,
    TableViewer,
    Cards
  },
  props: ['tableName', 'card'],

  data(){
    return {
      isReload: false
    }
  },
  methods: {
    reloadTable() {
      this.isReload = !this.isReload;
      alert('Done successfully!');
    }
  }
}
</script>
