<template>
  <div class="about">
    <h1>User Parts</h1>
    <AddItem :tableName="'tableItem'"></AddItem>
    <TableViewer :tableName="'tableItem'"></TableViewer>
  </div>
</template>

<script>
import AddItem from "../components/AddItem";
import TableViewer from "../components/TableViewer";

export default {
  name: 'About',
  props: [''],
  components: {
    TableViewer,
    AddItem
  },
  data() {
    return {

    }
  },
  methods: {
    //  Functions
  },
  created() {
  }
}

</script>

<style>

</style>