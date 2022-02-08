<template>
  <div class="container">
    <div style=" padding: 24px 0">
      <div class="q-gutter-y-md" >
        <q-card style="border-radius: 8px; width: 380px">
          <q-tabs
              style="background-color: #ffcf00"
              v-model="tab.Ads"
              dense
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator>
            <q-tab alert name="Group" icon="groups" label="קבוצות">
              <q-badge v-if="badgeGroups > 0" color="red" text-color="white" floating>{{ badgeGroups }}</q-badge>
            </q-tab>

            <q-tab name="Posts" icon="party_mode" label="פוסטים">
              <q-badge v-if="badgePosts > 0" color="red" text-color="white" floating>{{ badgePosts }}</q-badge>
            </q-tab>

            <q-tab name="Ads" icon="mail" label="מודעות">
              <q-badge v-if="badgeItems > 0" color="red" text-color="white" floating>{{ badgeItems }}</q-badge>
            </q-tab>

          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab.Ads" animated>

            <q-tab-panel name="Ads">
              <Cards v-if="flag" :myParts="myParts"/>
            </q-tab-panel>

            <q-tab-panel name="Posts">
              <insta :myParts="myParts"/>
            </q-tab-panel>

            <q-tab-panel name="Group">
              <car-groups/>
            </q-tab-panel>

          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "./Cards";
import {mapActions, mapState} from "vuex";
import CarGroups from "./CarGroups";
import Insta from "./Insta";

export default {
  name: "userTabs",
  components: {Insta, CarGroups, Cards},
  props: ['badgePost'],
  data() {
    return {
      flag: false,
      myParts: true,
      badgePosts: 0,
      badgeItems: 0,
      badgeGroups: 0,
      tab: {
        Ads: 'Ads',
        Posts: 'Posts',
        Group: 'Group',
      }
    }
  },
  computed: {
    ...mapState('posts', ['postBadges']),
    ...mapState('items', ['myItemsPrivate', 'myPostis']),
    ...mapState('users', ['myGroup']),
  },
  methods: {
    ...mapActions('items', ['getUserDetails', 'getStoreItems', 'getPrivateItems', 'setEditItemById']),
    ...mapActions('posts', ['getPosts']),
    ...mapActions('users', ['getStoreInfo', 'getMyGroups', 'getUserInfo']),
    async getMyCards() {
      debugger
      await this.getUserDetails();
      this.badgeItems = this.myItemsPrivate.length;
      this.flag = true;
    },
    async getMyPosts() {
      await this.getMyGroups().then(res => {
        debugger
        let arr = [];
        for (let key of res) {
          arr.push(key.carGroup)
        }
        this.myGroups = arr;
        debugger
        this.getPosts({groups: this.myGroups})
            .then(async () => {
              debugger
              await this.getUserDetails(this.myParts);
              debugger
              this.badgePosts = this.myPostis.length;
              if (!this.myPostis.length) {
                this.badgePosts = this.badgePost;
              }
              console.log(this.badgePosts, 'badgePosts')
              debugger
              this.flag = true;
            })
      });
    },

    async getMyGroupos() {
      debugger
      await this.getMyGroups().then(() => {
        debugger
        this.badgeGroups = this.myGroup.length;
        console.log(this.badgeGroups, 'badgeGroups')
        this.flag = true;
      });
    }
  },
  async created() {
    console.log(this.badgePost, 'FROM PROFILE');
    await this.getPrivateItems();
    await this.getStoreItems();
    await this.getStoreInfo();
    await this.getUserInfo();
    await this.getMyCards();
    await this.getMyPosts();
    await this.getMyGroupos();

  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
justify-content: center}

.q-tab-panel {
  padding: 0;
}
</style>