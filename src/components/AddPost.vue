<template>

  <div class="q-pa-md " dir="rtl">
    <p style="text-align: right; font-weight: bold; font-size: 30px; color: #ffce0c">+ פוסט לפינה חמה </p>
    <div class="row" style="padding: 5px 10px 5px 20px; display: flex; justify-content: center">
      <q-select class="col-12 col-sm-4" bg-color="yellow-7" outlined
                style="padding: 15px"
                standout="bg-yellow-7"
                v-model="postz.carGroup" :options="myGroups" behavior="menu" label="קבוצות לבחירה"/>
      <q-file class="col-12 col-sm-4"
              bg-color="yellow-7"
              color="black-3" outlined
              v-model="postz.image"
              @input="imageSelected"
              accept="image/*"
              label="בחר תמונה"
              style="padding: 15px">
        <template v-slot:append>
          <q-icon name="attachment" color="orange"/>
        </template>
      </q-file>
      <q-input class="col-12 col-sm-4" bg-color="yellow-7" clearable clear-icon="close" outlined
               style="padding: 15px"
               v-model="postz.location" label="מיקום"/>
      <q-input class="col-12 col-sm-4" bg-color="yellow-7" prefix="" clearable clear-icon="close"
               style="padding: 15px"
               outlined v-model="postz.comment" label="כתוב טקסט" type="text"/>
      <!--      v-if="!this.$route.params.id"-->


    </div>
    <div class="row justify-center">
      <q-btn v-if="" type="reset" class="glossy"
             style="background-color: #ffce0c; font-size: 20px;top: 20px; margin-bottom: 20px; width: 150px"
             label="פרסם"
             @click="insert()"/>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 90%; height: 200px; background-color: #ffce0c; border-radius: 20px">
        <q-card-section>
          <div class="text-h3" style="text-align: right; font-weight: bold">:הודעה</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="text-align: right">
          הפרסום ממתין לאישור הנהלת האתר לה פבאלה,
          תוך כמה דקות שעות אם אין חומר אסור הפרסום יעלה לאתר
          ,תודה לך
        </q-card-section>

        <!--          <q-card-actions align="left">-->
        <!--            <q-btn flat label="OK" color="red" v-close-popup/>-->
        <!--          </q-card-actions>-->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

// const myGroups = ['HONDA S2000', 'SEAT IBIZA CUPRA', 'GOLF VR6 MK3'];

export default {
  name: "AddPost",
  data() {
    return {
      alert: false,
      myGroups: '',
      postz: {
        id: 1,
        comment: '',
        carGroup: '',
        location: '',
        image: null,
        imgName: '',
        like: false,
        likeCounter: 0,
      },
      userData: {
        name: '',
        // phone: '',
        avatarUser: null,
        // carGroup: 'Audi TT',
      },
    }
  },
  computed: {
    ...mapState('posts', ['postim']),
    ...mapState('users', ['userStore', 'privateUser']),
  },
  methods: {
    ...mapActions('posts', ['getPosts', 'insertPosts']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo', 'getMyGroups']),
    ...mapMutations('posts', ['setEditedPost']),
    localSetEditedItem() {
      debugger
      // if (this.userStore.imStore) {
      //   this.userData.name = this.userStore.userName,
      //       this.userData.avatarUser = this.userStore.url
      // } else {
      this.userData.name = this.privateUser.userName;
      this.userData.avatarUser = this.privateUser.url;
      this.userData.userdPostId = window.user.uid;
      debugger
      Object.assign(this.postz, this.userData)
      this.setEditedPost(this.postz)
    },
    imageSelected(file) {
      debugger
      this.postz.image = file;
      console.log(this.postz.image);
    },
    insert() {
      debugger
      // this.imageSelected();
      this.localSetEditedItem();
      debugger
      this.insertPosts();
      this.alert = true;
      setTimeout(() => {
        this.$router.push('/instushAll');
      }, 3000);
    },
  },
  created() {
    this.getUserInfo();
    this.getStoreInfo();
    this.getMyGroups().then(res => {
      let arr = [];
      for (let key of res) {
        arr.push(key.carGroup)
      }
      this.myGroups = arr;
    });
    debugger
  }
}
</script>

<style scoped>

</style>