<template>
  <q-page class="constrain q-pa-md">
    <div class="row">
      <div class="col-12 col-sm-9">left
        <div class="row justify-sm-start" style="background-color: #b2b2b2; padding: 10px">
          <q-card v-for="item in this.card" class="my-card text-black col-6 col-sm-4"
                  style="background: radial-gradient(circle, #f6dfa2 0%, #fff0b9 100%)">
            <q-card-section>
              <div class="text-h5" style="font-weight: bold">{{ item.textPart }}</div>
              <p style="font-size: 16px">to <span style="font-weight: bold">{{ item.manufacturer }}</span></p>
              <p style="font-size: 13px"><span style="font-weight: bold; font-size: 15px">Model - </span>{{item.model }}
              </p>
              <p style="font-size: 13px"><span style="font-weight: bold; font-size: 15px">Year - </span>{{item.selectYear }}</p>
              <p style="font-size: 13px"><span
                  style="font-weight: bold; font-size: 15px">Quantity - </span>{{ item.quantityPart }}</p>
              <p style="font-size: 13px"><span style="font-weight: bold; font-size: 15px">Status - </span>{{item.status }}
              </p>
              <p style="font-size: 13px"><span style="font-weight: bold; font-size: 15px">Price - </span>{{item.pricePart}} ש"ח</p>
              <p style="margin: -140px 0 100px 200px;width: 50px; height: 50px">{{ item.file }}</p>
              <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg"/>

              <q-btn v-if="item" class="glossy" rounded color="primary" label="Update" @click="update(item.id)"
                     style="margin-left: 40px"/>
              <q-btn rounded color="red" label="delete" @click="remove(item.id)" style="margin-left: 20px"/>
            </q-card-section>

          </q-card>
        </div>
      </div>
      <div class="col-3 col-sm-3">right

      </div>
    </div>

    <!--    </div>-->
  </q-page>
</template>

<script>
import localStorageDriver from '../middleware/local-storage'

export default {
  name: "Cards",
  components: {},
  props: ['tableName'],
  data() {
    return {
      card: []
    }
  },
  methods: {
    read() {
      this.card = localStorageDriver.select(this.tableName);
    },
    update(id) {
      this.$router.push(`/item/${id}`);
      // this.$router.push('/used-parts');
    },
    remove(id) {
      localStorageDriver.remove(this.tableName, id);
      this.read();
    }
  },
  created() {
    this.read();
  }
}
</script>

<style lang="sass">
.my-card
  width: 30%
  height: auto
  max-width: 300px

</style>