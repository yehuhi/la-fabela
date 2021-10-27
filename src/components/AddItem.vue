<template>
  <div class="q-pa-md">
    <!--  {{ this.item }}-->
    <!--  <br>-->
    <p>Add Item:</p>
    <div class="row" >
      <q-radio class="col-6 col-sm-1" size="lg" keep-color v-model="editedItem.status" val="New" label="New" color="orange"/>
      <q-radio class="col-6 col-sm-1" size="lg" keep-color v-model="editedItem.status" val="Used" label="Used" color="orange"/>
    </div>

    <div class="row" style="padding: 0 10px 40px 10px">
      <q-select class="col-12 col-sm-4"
                style="padding: 15px"
                bg-color="orange-3"
                outlined rounded
                standout="bg-transparent"
                v-model="editedItem.manufacturer"
                :options="manufacturerOptions"
                behavior="menu"
                label="Manufacturer"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 400px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="editedItem.Vehicle" :options="VehicleOptions" behavior="menu" label="Category"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 780px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="editedItem.model" :options="modelOptions" behavior="menu" label="Model"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 1150px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-2" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="editedItem.selectYear" :options="YearOptions" behavior="menu" label="Year"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-2" clearable clear-icon="close" rounded outlined
               style="padding: 15px"
               v-model="editedItem.textPart" label="Name Part"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-2" prefix="ש''ח" clearable clear-icon="close"
               style="padding: 15px"
               rounded
               outlined v-model="editedItem.pricePart" label="Price" type="number"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               outlined
               v-model="editedItem.quantityPart" label="Quantity" type="number"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               outlined
               v-model="editedItem.numberPart" label="Barcode Part"/>

      <q-file class="col-12 col-sm-4" bg-color="orange-1s" color="grey-3" rounded outlined v-model="editedItem.file"
              label="Upload IMG"
              style="padding: 15px">
        <template v-slot:append>
          <q-icon name="attachment" color="orange"/>
        </template>
      </q-file>

    </div>
    <!--    <br>-->
    <div class="row">
      <q-btn  v-if="!item" rounded
              class="col-12 col-sm-4 glossy"
              color="green" label="Insert" @click="insert()"/>
      <q-btn  v-if="item" class="glossy" rounded
              color="primary" label="Update" @click="update()"/>
    </div>


  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage'

const manufacturerOptions = [
  'AUDI', 'FERRARI', 'MERCEDES-BENZ', 'B.M.W', 'MASERATI'];
const VehicleOptions = [
  'מכוניות', 'אופנועים', 'אופניים', 'כלי שטח', 'כל שייט', 'כלי טייס'];
const modelOptions = ['A4 Cabriolet', 'GTS 812', 'AMG GT R Roadster', 'Z4', 'GHIBLI'];
const YearOptions = [
  '2000', '2005', '2010', '2015', '2020'];

export default {
  name: "AddItem",
  props: ['tableName', 'item'],
  data() {
    return {
      editedItem: {
        manufacturer: '',
        status: '',
        textPart: '',
        Vehicle: '',
        model: '',
        numberPart: '',
        pricePart: '',
        quantityPart: '',
        selectYear: '',
        file: null
      },
      manufacturerOptions, VehicleOptions, modelOptions, YearOptions,
      options: manufacturerOptions
    }
  },
  methods: {
    insert() {
      // alert(JSON.stringify(this.item));
      localStorageDriver.insert(this.tableName, this.editedItem);
      this.$emit('itemAdded'); // read to event on the home Component
      alert('The post was sent successfully!');
    },
    update() {
      // debugger;
      console.log(this.$route);
      localStorageDriver.update(this.tableName, this.editedItem.id, this.editedItem); // Why item?
      // this.$router.push('/');
      this.$router.push('/used-parts');

    },
    search() {
      alert('What Interest you?');
    }
  },
  created() { //
    // debugger;
    if (this.item) {
      this.editedItem = this.item;
    }
  }
}
</script>

<style scoped>

</style>