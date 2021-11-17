<template>
  <div>
    <p style="text-align: center; font-size: 30px; font-weight: bold; margin-top: 10px">פרופיל אישי</p>
        <ContactInfo/>
    <Cards v-if="flag"/>
    <p v-if="!flag"
       style="text-align: center; font-size: 60px; font-weight: bold; margin-top: -30px">{{ msg }}</p>
  </div>
</template>

<script>
import Cards from "../components/Cards";
import ContactInfo from "../components/ContactInfo";
import {mapState, mapActions, mapMutations} from 'vuex';
// import carsDatabase from '../middleware/firebase/database/cars'

export default {
  name: "Profile",
  components: {
    ContactInfo,
    Cards
  },
  data() {
    return {
      // tableName: 'items',
      // myCards: undefined,
      flag: false,
      msg: 'עוד לא פרסמת מודעות',
    }
  },
  computed: mapState('items', ['editedItem', 'items', 'myItems']),
  methods: {
    ...mapActions('items', ['getUserDetails', 'getItems', 'setEditItemById']),

    getMyCards() {
      this.getUserDetails();
      this.flag = true;
    }
  },
  created() {
    this.getMyCards();
  }
}
</script>

<style>

</style>