<template>
  <div>
    <p style="text-align: center; font-size: 30px; font-weight: bold; margin-top: 10px">פרופיל אישי</p>
    <ContactInfo/>
    <Cards/>
    <p v-if="items[0] === undefined"
       style="text-align: center; font-size: 60px; font-weight: bold; margin-top: -30px">{{ msg }}</p>
  </div>
</template>

<script>
import Cards from "../components/Cards";
import carsDatabase from '../middleware/firebase/database/cars'
import ContactInfo from "../components/ContactInfo";
import {mapState, mapActions, mapMutations} from 'vuex';


export default {
  name: "UsedParts",
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
  computed: mapState('items', ['editedItem', 'items']),

  methods: {
    ...mapActions('items', ['getMyCards2', 'getItems', 'setEditItemById']),

  },
  mounted() {
  }
}
</script>

<style>

</style>