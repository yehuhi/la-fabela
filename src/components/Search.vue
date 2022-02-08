<template>
  <div>
    <p style="text-align: right; font-size: 30px;margin: 10px 20px 20px 0; font-weight: bold; color: #ffce0c">...מצאנו
      בשבילך +</p>
    <div class="container">
      <q-card flat dir="rtl" v-for="(product, index) in products" :key="index" id="cardio"
              style="position: relative;border-radius: 10px; border-color: #ffcf00; border-style:double; direction: rtl">
        <q-img @click="doSomething(product.id)" id="my-img" :src="product.url"
               :style="[myParts? {'margin-left': '193px', 'position': 'absolute','border-bottom-right-radius': '7px','border-top-right-radius': '7px','border-top-left-radius': '0','width': '155px','height': '152px'}
               :{'position': 'absolute','border-radius': '10px','max-width': '250px','max-height': '252px'}]">
          <div v-if="!myParts" dir="rtl" class="absolute-bottom text-subtitle5 text-right"
               :style="[myParts?{'font-weight':'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px',
                'color': 'black', 'text-overflow':'ellipsis', 'z-index':'1', 'direction':'rtl',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'40px'}
               :{'font-weight': 'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px',
                'color': 'black', 'text-overflow':'ellipsis',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'40px','z-index':'1', 'direction':'rtl'}]">
            {{ product.textPart }}
          </div>
          <div dir="rtl" class="absolute-bottom text-subtitle5 text-right"
               :style="[myParts?{'font-weight': 'bold', 'margin-bottom':'-15px', 'text-overflow':'ellipsis','color':'red',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'10px', 'background-color':' rgba(211,211,211,0.62)'}
               :{'font-weight': 'bold', 'color':'red', 'margin-bottom':'-15px', 'text-overflow':'ellipsis',
                'white-space':'nowrap', 'overflow':'hidden', 'background-color':' rgba(211,211,211,0.62)'}]">
            {{ product.pricePart }} ש"ח
          </div>
        </q-img>
      </q-card>
    </div>
    <p v-if="!products[0]" style="color: #ff4242; font-size: 50px; font-weight: bold; text-align: center">מצטערים, אין
      כרגע מוצר כזה...תנסה שוב</p>
  </div>
</template>

<script>
import Cards from "./Cards";
import {mapActions, mapMutations, mapState} from "vuex";
import router from "../router";
import axios from "axios";

export default {
  name: "Search",
  components: {Cards},
  props: ['searcho', 'manuf', 'model', 'selectYear'],
  data() {
    return {
      myParts: false
    }
  },
  computed: {
    ...mapState('items', ['itemsPrivate', 'itemsStore', 'itemsFilterSearch']),
    products: function () {
      debugger
      let items = [];
      let itemx = '';
      let itemsStatus1 = '';
      let itemsStatus2 = '';
      debugger
      let route = this.$route.params.search.split("&&");
      let namePart = route[0];
      let manufacturer = route[1];
      let model = route[2];
      let year = route[3];
      let location = route[4];
      let itemsStatus = route[5];
      debugger

      if (itemsStatus === 'itemsPrivate') {
        itemx = this.itemsPrivate;
        itemsStatus = 'משומש';
      } else if (itemsStatus === 'itemsStore') {
        itemx = this.itemsStore;
        itemsStatus = 'חדש';
      } else if (itemsStatus === 'all') {
        itemsStatus1 = 'משומש';
        itemsStatus2 = 'חדש';
      }

      if (namePart && itemsStatus1 === 'משומש' && itemsStatus2 === 'חדש') {
        debugger
        let test = '';
        if (!manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.textPart === namePart
              && prod.status === itemsStatus1);

          test = (this.itemsStore.filter(prod => prod.textPart === namePart
              && prod.status === itemsStatus2));
        }
        if (manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.textPart === namePart
              && prod.status === itemsStatus1 && prod.manufacturer === manufacturer);

          test = (this.itemsStore.filter(prod => prod.textPart === namePart
              && prod.status === itemsStatus2 && prod.manufacturer === manufacturer));
        }

        if (test[0] !== undefined) {
          debugger
          let key = '';
          for (key of test) {
            test = key;
          }
          items.push(test);
        }
        return items;
      } else if (!namePart && model && itemsStatus1 === 'משומש' && itemsStatus2 === 'חדש') {
        debugger
        let test = '';
        if (!manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.textPart === namePart
              && prod.status === itemsStatus1);
        }
        if (manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.status === itemsStatus1 && prod.manufacturer === manufacturer
              && prod.model === model);

          test = (this.itemsStore.filter(prod => prod.status === itemsStatus2 && prod.manufacturer === manufacturer
              && prod.model === model));
        }

        if (test[0] !== undefined) {
          debugger
          let key = '';
          for (key of test) {
            test = key;
          }
          items.push(test);
        }
        return items;
      } else if (!namePart && !model && itemsStatus1 === 'משומש' && itemsStatus2 === 'חדש') {
        debugger
        let test = '';
        if (!manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.manufacturer === manufacturer
              && prod.status === itemsStatus1);
        }
        if (manufacturer) {
          items = this.itemsPrivate.filter(prod => prod.status === itemsStatus1 && prod.manufacturer === manufacturer);

          test = (this.itemsStore.filter(prod => prod.status === itemsStatus2 && prod.manufacturer === manufacturer));
        }

        if (test[0] !== undefined) {
          debugger
          let key = '';
          for (key of test) {
            test = key;
          }
          items.push(test);
        }
        return items;
      }

      if (namePart && itemsStatus) {
        debugger
        items = itemx.filter(prod => prod.textPart === namePart
            && prod.status === itemsStatus);
        return items;
      }
      if (namePart && manufacturer && model && year && location) {
        items = itemx.filter(prod => prod.textPart === namePart
            && prod.manufacturer === manufacturer && prod.model === model && prod.selectYear === year && prod.location === location)
        return items;
      }
      if (namePart && manufacturer && !model && year && !location) {
        items = itemx.filter(prod => prod.textPart === namePart
            && prod.manufacturer === manufacturer && prod.selectYear === year);
        return items;
      }
      if (namePart && manufacturer && !model && !year && !location) {
        items = itemx.filter(prod => prod.textPart === namePart
            && prod.manufacturer === manufacturer);
        return items;
      }
      if (namePart && manufacturer && model && year && !location) {
        items = itemx.filter(prod => prod.textPart === namePart
            && prod.manufacturer === manufacturer && prod.model === model && prod.selectYear === year);
        return items;
      }
      if (namePart && manufacturer && model && location && !year) {
        items = itemx.filter(prod => prod.textPart === namePart && prod.manufacturer === manufacturer && prod.model === model && prod.location === location)
        return items;
      }
      if (namePart && manufacturer && model && !location && !year) {
        items = itemx.filter(prod => prod.textPart === namePart && prod.manufacturer === manufacturer && prod.model === model)
        return items;
      }
      if (namePart && manufacturer && !model && !year && location) {
        items = itemx.filter(prod => prod.textPart === namePart && prod.manufacturer === manufacturer && prod.location === location)
        return items;
      }
      if (namePart && manufacturer && !model && year && location) {
        items = itemx.filter(prod => prod.textPart === namePart && prod.manufacturer === manufacturer && prod.selectYear === year && prod.location === location)
        return items;
      }
      if (namePart && !manufacturer && !model && !year && location) {
        items = itemx.filter(prod => prod.textPart.includes(namePart) && prod.location === location);
        return items;
      }
      if (namePart && !manufacturer && model && !year && location) {
        items = itemx.filter(prod => prod.textPart.includes(namePart) && prod.model === model && prod.location === location)
        return items;
      }
      if (namePart && !manufacturer && !model && !year && !location) {
        items = itemx.filter(prod => prod.textPart.includes(namePart));
        return items;
      }
      if (!namePart && manufacturer && !model && !year) {
        items = itemx.filter(prod => prod.manufacturer === manufacturer)
        return items;
      }
      if (!namePart && manufacturer && !model && year) {
        items = itemx.filter(prod => prod.manufacturer === manufacturer && prod.selectYear === year)
        return items;
      }
      if (!namePart && manufacturer && model && year) {
        items = itemx.filter(prod => prod.manufacturer === manufacturer && prod.selectYear === year && prod.model === model)
        return items;
      }
      if (!namePart && manufacturer && model && !year) {
        items = itemx.filter(prod => prod.manufacturer === manufacturer && prod.model === model)
        return items;
      }
    }
  },
  methods: {
    ...mapActions('items', ['getPrivateItems', 'getStoreItems']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo']),
    ...mapMutations('items', ['resetEditedItem']),
    test() {
      debugger

    },
    doSomething(id) {
      debugger
      this.$router.push(`/items-details/${id}`);
    }
  },
  created() {
    this.getUserInfo();
    this.getStoreInfo();
    this.getPrivateItems();
    this.getStoreItems();
  }
}
</script>

<style>
.containers {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 1em;
}

.container {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 1em;
}

#cardio {
  height: 255px;
  width: 250px;
  /*padding: 0.5em;*/
  cursor: pointer;
  transition: 0.2s;
}

#my-img {
  position: absolute;
  border-radius: 10px;
  max-width: 300px;
  height: 252px
}

@media only screen and (max-width: 420px) {
  #cardio {
    height: 155px;
    width: 150px;
    border-radius: 10px;
  }

  #my-img {
    max-width: 149px;
    height: 153px;
    /*border-radius: 10px;*/
  }
}
</style>
