<template>
  <div class="q-pa-md " dir="rtl">
    <!--  {{ this.item }}-->
    <!--  <br>-->
    <p style="text-align: right; font-weight: bold; font-size: 30px; color: #ffce0c">+ פרסום מודעות :</p>
    <div class="row" style="padding: 5px 0 5px 20px">
      <q-radio style="left: auto" class="col-6  col-sm-3" size="lg" keep-color v-model="localEditedItem.status"
               val="New"
               label="חדש"
               color="orange"/>
      <q-radio class="col-6  col-sm-3" size="lg" keep-color v-model="localEditedItem.status" val="Used" label="משומש"
               color="orange"/>
    </div>

    <div class="row" style="padding: 0 10px 40px 10px">
      <q-select class="col-12 col-sm-4"
                style="padding: 15px"
                bg-color="orange-3"
                outlined rounded
                standout="bg-transparent"
                v-model="localEditedItem.manufacturer"
                :options="manufacturerOptions"
                behavior="menu"
                label="יצרן"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 400px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.Vehicle" :options="VehicleOptions" behavior="menu" label="קטגוריה"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 780px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.model" :options="modelOptions" behavior="menu" label="דגם"/>
      <!--      <br>-->
      <!--      style="width: 300px; margin: -75px 100px 0 1150px"-->
      <q-select class="col-12 col-sm-4" bg-color="orange-2" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.selectYear" :options="YearOptions" behavior="menu" label="שנה"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-2" clearable clear-icon="close" rounded outlined
               style="padding: 15px"
               v-model="localEditedItem.textPart" label="שם החלק"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-2" prefix="ש''ח" clearable clear-icon="close"
               style="padding: 15px"
               rounded
               outlined v-model="localEditedItem.pricePart" label="מחיר" type="number"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               outlined
               v-model="localEditedItem.quantityPart" label="כמות" type="number"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               outlined
               v-model="localEditedItem.numberPart" label="ברקוד"/>

      <q-file class="col-12 col-sm-4"
              bg-color="orange-1s"
              color="grey-3" rounded outlined
              v-model="localEditedItem.image"
              @input="imageSelected"
              accept="image/*"
              label="בחר תמונה"
              style="padding: 15px">
        <template v-slot:append>
          <q-icon name="attachment" color="orange"/>
        </template>
      </q-file>
    </div>

    <div class="row justify-center">
      <q-btn v-if="!this.$route.params.id" rounded type="reset" class=" glossy"
             style="background-color: #ffce0c; font-size: 20px; width: 150px" label="פרסם" @click="insert()"/>
      <q-btn v-if="this.$route.params.id" class="glossy" rounded color="primary" label="Update" @click="update()"/>
    </div>

  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage'
// import api from "../middleware/api";
// import firebaseDatabase from "../middleware/firebase/database";
// import storageDB from "../middleware/firebase/storage";
import {mapActions, mapState, mapMutations} from "vuex";

const manufacturerOptions = ['AUDI', 'FERRARI', 'MERCEDES-BENZ', 'B.M.W', 'MASERATI'];
const VehicleOptions = ['מכוניות', 'אופנועים', 'אופניים', 'כלי שטח', 'כל שייט', 'כלי טייס'];
const modelOptions = ['A4 Cabriolet', 'GTS 812', 'AMG GT R Roadster', 'Z4', 'GHIBLI'];
const YearOptions = ['2000', '2005', '2010', '2015', '2020'];

export default {
  name: "AddItem",
  props: ['tableName', 'item'],
  data() {
    return {
      flag: false,
      localEditedItem: {
        manufacturer: '',
        status: '',
        textPart: '',
        Vehicle: '',
        model: '',
        numberPart: '',
        pricePart: '',
        quantityPart: '',
        selectYear: '',
        image: null,
        imgName: '',
        url: '',
      },
      imageUpload: [],
      manufacturerOptions, VehicleOptions, modelOptions, YearOptions,
      options: manufacturerOptions,
    }
  },
  computed: mapState('items', ['editedItem']),

  methods: {
    ...mapActions('items', ['insertItem', 'updateItem', 'setEditItemById']),
    ...mapMutations('items', ['setEditedItem', 'setEditedItemId']),

    localSetEditedItem() {
      this.setEditedItem(this.localEditedItem)
    },

    imageSelected(file) {
      this.localEditedItem.image = file;
      console.log(this.localEditedItem.image);
    },

    // insert() {
    //   firebaseDatabase.generateId({entity: 'Test'})
    //       .then(id => {
    //         console.log(id)
    //         storageDB.uploadImg({imageName: id, file: this.editedItem.image})
    //             .then(url => {
    //               console.log(url)
    //               this.editedItem.url = url;  <-----Sara
    //               firebaseDatabase.create({entity: this.tableName, item: this.editedItem, id: id}) // Database
    //                   .then(() => {
    //                     this.$emit('itemAdded'); // read to event on the home Component <-----Sara

    // debugger
    // this.editedItem.imgName = this.editedItem.image.name;
    //                   })
    //             }) // Storage upload + download image
    //       })
    // },

    // insert() {
    //   storageDB.uploadImg({imageName: this.editedItem.image.name, file: this.editedItem.image}) // Storage upload + download image
    //       .then( url => {
    //         // debugger
    //         this.editedItem.url = url;
    //         this.editedItem.imgName = this.editedItem.image.name;
    //         // debugger
    //         console.log(this.editedItem.url);
    //         firebaseDatabase.create({entity: this.tableName, item: this.editedItem}) // Database
    //             .then((res) => {
    //               this.$emit('itemAdded'); // read to event on the home Component
    //               // debugger
    //               // this.editedItem.imgName = this.editedItem.image.name;
    //             })
    //       });
    // },

    insert() {
      this.localSetEditedItem();
      this.insertItem();
    },
    async update() {
      this.flag = true;
      debugger
      await this.localSetEditedItem();
      await this.updateItem();
      await this.goToHome();
    },

    goToHome() {
      this.$router.push(`/profile/${window.user.uid}`);
    },
    search() {
      alert('What Interest you?');
    },
    // onReset() {
    //   this.manufacturer = null
    //   this.status = null,
    //       this.textPart = null,
    //       this.Vehicle = null,
    //       this.model = null,
    //       this.numberPart = null,
    //       this.pricePart = null,
    //       this.quantityPart = null,
    //       this.selectYear = null,
    //       this.image = null
    // }
  },

  created() {
    // if (this.flag){
//
    // }
    //   // debugger
    //   if (this.item) {
    //     this.editedItem = this.item;
  },
  mounted() {
    if (this.$route.params.id) {
      this.setEditedItemId(this.$route.params.id);
      this.setEditItemById()
          .then(() => {
            Object.assign(this.localEditedItem, this.editedItem);
          })
    }
  }
}
</script>

<style>

</style>