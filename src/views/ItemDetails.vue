<template>
  <q-page>
    <div>
      <p style="padding-right: 20px; text-align: right; font-size: 30px; font-weight: bold">פרטים על המוצר</p>
      <Detalles/>
    </div>
  </q-page>
</template>

<script>
import Detalles from "../components/Detalles";

export default {
  name: "ItemDetails",
  components: {
    Detalles,

  },
  created() {
    // debugger
  }
}
</script>

<style>

</style>