<template>
<div>

  <Cards :tableName="tableName" :card="card"/>
</div>
</template>

<script>
import Cards from "../components/Cards";

export default {
  name: "UsedParts",
  props: ['card'],
  components:{
    Cards
  },
  data(){
    return{
      tableName : 'tableItem'
    }
  },
  methods:{
    // itemAlone(){
    //   for (var cardKey in this.card) {
    //     console.log(cardKey.id);
    //   }
    // }
  },
  created() {
    // this.itemAlone();
  }
}
</script>

<style scoped>

</style>