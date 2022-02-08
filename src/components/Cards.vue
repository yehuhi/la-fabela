<template>
  <!--  :style="[a? {}:{}]"-->
  <q-page class="q-pa-md constrain" style=" min-height: 0">
    <p v-if="!myParts" style="text-align: right; font-size: 30px; color: #ffce0c; font-weight: bold">
      <!--      {{ titleParts }}-->
    </p>
<!--    :style="[X?{}:{}]"-->
    <div class="container">
      <q-card id="cardios" flat v-for="(product, index) in products" :key="index"
              :style="[myParts? {'height': '157px', 'width': '452px','position': 'relative', 'border-radius': '10px', 'border-color': '#8c8686', 'border-style':'double', 'background-color': '#212529'}
               : {'position': 'relative', 'border-radius': '10px', 'border-color': '#ffcf00', 'border-style':'double'}]">
        <q-img @click="doSomething(product.id)" id="my-image" :src="product.url"
               :style="[myParts? {'margin-left': '193px', 'position': 'absolute','border-bottom-right-radius': '7px','border-top-right-radius': '7px','border-top-left-radius': '0','width': '155px','height': '152px'}
               :{'position': 'absolute','border-radius': '10px','max-width': '250px','max-height': '252px'}]">
          <div v-if="!myParts" class="absolute-bottom text-subtitle5 text-right"
               :style="[myParts?{'font-weight':'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px',
                'color': 'black', 'text-overflow':'ellipsis', 'z-index':'1',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'40px'}
               :{'font-weight': 'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px',
                'color': 'black', 'text-overflow':'ellipsis',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'40px','z-index':'1',}]">
            {{ product.textPart }}
          </div>
          <div class="absolute-bottom text-subtitle5 text-right"
               :style="[myParts?{'font-weight': 'bold', 'margin-bottom':'-15px', 'text-overflow':'ellipsis','color':'red',
                'white-space':'nowrap', 'overflow':'hidden', 'height':'10px', 'background-color':' rgba(211,211,211,0.62)'}
               :{'font-weight': 'bold', 'color':'red', 'margin-bottom':'-15px', 'text-overflow':'ellipsis',
                'white-space':'nowrap', 'overflow':'hidden', 'background-color':' rgba(211,211,211,0.62)'}]">
            {{ product.pricePart }} ש"ח
          </div>
        </q-img>

        <div :style="[myParts?{ 'width' :'193px','height': '95px', 'border-bottom-right-radius': '0','border-top-left-radius': '7px'}
        :{}]">
          <div v-if="myParts" class=" text-subtitle5 text-left"
               :style="[myParts?{'font-weight': 'bold', 'font-size': '18px', 'color': '#ffffff', 'text-align':'center', 'margin-top':'10px'}
               :{'font-weight': 'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px', 'color': '#000000'}]">
            <p>{{ product.textPart }}</p>
          </div>
          <div v-if="myParts" class=" text-subtitle5 text-left"
               :style="[myParts?{'font-weight': 'bold', 'color': '#dc2323', 'text-align':'center', 'margin-top':'-15px'}
               :{'font-weight': 'bold', 'background-color':' rgba(211,211,211,0.62)', 'padding-top': '2px', 'color': '#000000'}]">
            <p>{{ product.pricePart }} ש"ח</p>
          </div>
        </div>

        <!--        </q-card-section>-->
        <q-card-actions class="card-btn" style="display: flex; ">
          <div
              :style="[myParts?{ 'width' :'193px', 'height':'58px', 'margin':'-19px 0 0 -8px','border-bottom-left-radius': '7px'}:{}]">
            <div class="my-btn">
              <q-btn v-if="!flag" label="עדכון" @click="updateCard(product.id)"
                     style="margin: 9px 35px; padding: 0.5px 0;background-color: #ffcf00; color: black"/>
              <!--                     style="margin: -5px 20px 0 0; padding: 1px 0 1px 0;background-color: #ffcf00; color: black"/>-->
              <q-btn v-if="!flag" label="מחיקה" @click="deleteCard(product.id)"
                     style="padding: 0.5px 0; margin: 0 0 0 -15px;background-color: orange; color: black"/>
              <!--                     style="margin: -5px 175px 0 0; padding: 1px 0 1px 0;background-color: orange; color: black"/>-->
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Cards",
  components: {},
  props: ['flag', 'storeParts', 'privateParts', 'myParts'],
  data() {
    return {
      titleParts: ' חלקים חדשים +'
    }
  },
  computed: {
    ...mapState('items', ['editedItem', 'itemsPrivate', 'itemsStore', 'myItemsStore', 'myItemsPrivate']),
    ...mapState('users', ['userStore']),
    products: function () {
      if (this.flag && !this.myParts) {
        debugger
        if (this.privateParts) {
          this.titleParts = ' חלקים משומשים +'
          return this.itemsPrivate
        } else if (this.storeParts) {
          return this.itemsStore
        }
      } else if (this.myParts && this.userStore.imStore) {
        debugger
        return this.myItemsStore
      } else {
        return this.myItemsPrivate
      }
    }
  },

  methods: {
    ...mapActions('items', ['updateItem', 'deleteItem', 'getStoreItems', 'getPrivateItems', 'setEditItemById', 'getUserDetails', 'setEditItemWithId']),
    ...mapMutations('items', ['setEditedItemId', 'setEditItemId', 'resetEditedItem']),

    async updateCard(cardId) {
      // this.setEditedItemId(cardId)
      await this.setEditItemWithId(cardId)
      await this.$router.push('/addItem');
      // await this.updateItem();
    },

    deleteCard(cardId) {
      this.setEditedItemId(cardId)
      this.deleteItem()
    },

    doSomething(id) {
      debugger
      this.resetEditedItem();
      debugger
      if (!this.flaq) {
        this.$router.push(`/items-details/${id}`);
      }
    }
  },
  created() {
    // debugger
  },
}

</script>

<style>

#cardios {
  height: 255px;
  width: 250px;
  /*padding: 0.5em;*/
  cursor: pointer;
  transition: 0.2s;
}

#my-image {
  position: absolute;
  /*border-radius: 20px;*/
  max-width: 300px;
  height: 255px
}

#cardios:hover {
  opacity: .6;
}

.container {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 1em;
}

.card-title {
  font-size: 1.2em;

  text-align: right;
  font-weight: bold;
  color: #ffcf00;
}

.card-details {
  margin-left: 20px;
}

/*.card-details p {*/

/*}*/

.card-details span {
  font-weight: bold;
  text-transform: uppercase;
}

.card-btn .q-btn {
  padding: 0.3em 0.2em;
}

@media only screen and (max-width: 420px) {
  #cardios {
    height: 155px;
    width: 150px;
    border-radius: 10px;
  }

  #my-image {
    max-width: 149px;
    height: 153px;
    /*border-radius: 10px;*/
  }
}

</style>