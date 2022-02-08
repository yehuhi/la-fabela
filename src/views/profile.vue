<template>
  <div>
    <p style="text-align: right; font-size: 30px;margin: 15px 15px 15px 0; font-weight: bold; color: #ffce0c">פרופיל
      אישי + </p>
    <q-btn @click="goToCart()"
           style="margin: -90px 0 0 30px;  background-color: #ffcf00; color: #000000; font-size: 11px ">
      סל קניות
    </q-btn>
    <ContactInfo v-if="userStore.imStore "/>
    <ContactInfo v-if="privateUser.imPrivate "/>
    <user-tabs/>

  </div>
</template>

<script>
import Cards from "../components/Cards";
import ContactInfo from "../components/ContactInfo";
import {mapState, mapActions, mapMutations} from 'vuex';
import UserTabs from "../components/userTabs";

export default {
  name: "Profile",
  components: {
    UserTabs,
    ContactInfo,
    Cards
  },
  data() {
    return {
      flag: false,
      badgePost: undefined,
      msg: 'עוד לא פרסמת מודעות',
      myParts: true,
      itemsUser: undefined,
      store: false,
      myGroups: '',
    }
  },
  computed: {
    ...mapState('items', ['myPostis', 'editedItem', 'itemsStore', 'myItemsStore', 'itemsPrivate', 'myItemsPrivate']),
    ...mapState('users', ['privateUser', 'userStore', 'myGroup']),
    textName: function () {
      // debugger
      if (this.userStore.imStore) {
        return this.userStore.userName;
      } else {
        return this.privateUser.userName;
      }
    }
  },

  methods: {
    ...mapActions('items', ['getUserDetails', 'getStoreItems', 'getPrivateItems', 'setEditItemById']),
    ...mapActions('users', ['getStoreInfo', 'getUserInfo', 'getMyGroups', 'getUsers']),
    ...mapActions('posts', ['getPosts']),

    async getMyCards() {
      debugger
      await this.getUserDetails();
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
              this.badgePost = this.myPostis.length;
              console.log(this.badgePost, 'badgePosts')
              debugger
              this.flag = true;
            })
      });
    },
    getMyGroupos() {
      debugger
      this.getMyGroups().then(() => {
        debugger
        this.badgeGroups = this.myGroup.length;
        console.log(this.badgeGroups, 'badgeGroups')
        this.flag = true;
      });
    },
    goToCart() {
      this.$router.push('/cart');
    }
  },
  async created() {
    debugger
    window.scrollTo(0, 0);

    // await this.getPrivateItems();
    // await this.getStoreItems();
    // await this.getStoreInfo();
    // await this.getUserInfo();
    // await this.getMyCards();
    await this.getMyPosts();
    // await this.getMyGroupos();
  }
}
</script>

<style>

</style>