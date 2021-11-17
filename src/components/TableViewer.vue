<template>
  <div class="q-pa-md">
    <q-table
        :title="tableName"
        :data="rows"
        :columns="columns"
        row-key="name"
        binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="manufacturer" :props="props" @click="goToItem(props.row.id)">{{ props.row.manufacturer }}</q-td>
          <q-td key="status" :props="props">{{ props.row.status }}</q-td>
          <q-td key="textPart" :props="props">{{ props.row.textPart }}</q-td>
          <q-td key="Vehicle" :props="props">{{ props.row.Vehicle }}</q-td>
          <q-td key="model" :props="props">{{ props.row.model }}</q-td>
          <q-td key="numberPart" :props="props">{{ props.row.numberPart }}</q-td>
          <q-td key="pricePart" :props="props">{{ props.row.pricePart }}</q-td>
          <q-td key="quantityPart" :props="props">{{ props.row.quantityPart }}</q-td>
          <q-td key="selectYear" :props="props">{{ props.row.selectYear }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn push color="primary" label="delete" @click="remove(props.row.id)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage';
import api from '../middleware/api';

export default {
  name: "TableViewer",
  props: ['tableName', 'isReload'],
  data() {
    return {
      columns: [
        {
          name: 'manufacturer',
          required: true,
          label: 'Company Name',
          align: 'center',
          field: 'manufacturer',
          sortable: true
        },
        {name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true},
        {name: 'textPart', align: 'center', label: 'Name Part', field: 'textPart'},
        {name: 'Vehicle', align: 'center', label: 'Vehicle', field: 'Vehicle', sortable: true},
        {name: 'model', align: 'center', label: 'Model', field: 'model'},
        {name: 'numberPart', align: 'center', label: 'Number Part', field: 'numberPart'},
        {name: 'pricePart', align: 'center', label: 'Price', field: 'pricePart'},
        {name: 'quantityPart', align: 'center', label: 'Quantity', field: 'quantityPart'},
        {name: 'selectYear', align: 'center', label: 'Year', field: 'selectYear'},
        {name: 'actions', align: 'center', label: 'Actions', field: 'actions'}
      ],
      rows: []
    }
  },
  created() {
    this.read();
  },
  watch: {
    isReload() {
      this.read();
    }
  },
  methods: {
    read() {
      api.get({entity: this.tableName})
          .then(result => {
            this.rows = result;
          })
    },
    remove(id) {
      localStorageDriver.remove(this.tableName, id);
      this.read();
    },
    goToItem(id) {
      this.$router.push(`/item/${id}`);
    }
  }
}

</script>

<style scoped>

</style>