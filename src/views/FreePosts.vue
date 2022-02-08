<template>
  <div style="position: relative">
<!--    <q-btn v-if="!idk" @click="addPost()"-->
<!--           style="position: absolute;font-size: 11px;font-weight: bold;  margin: 15px 0 0 25px; background-color: #ffcf00; color: #000000">-->
<!--      פוסט חדש-->
<!--    </q-btn>-->
    <insta v-if="idk"/>
  </div>
</template>

<script>

import Insta from "../components/Insta";

export default {

  name: "FreePosts",
  // props: [],
  components: {
    Insta
  },
  data() {
    return {
      idk: this.$route.params.id
    }
  },
  methods: {
    // addPost() {
    //   this.$router.push('/AddPost');
    // }
  },
  created() {
  }
}
</script>

<style>

</style>