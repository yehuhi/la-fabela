<template>
  <div>
    <q-btn v-if="!idk" @click="addPost()"
           style="position: absolute;font-size: 11px;font-weight: bold;  margin: 15px 0 0 25px; background-color: #ffcf00; color: #000000">
      פוסט חדש
    </q-btn>
    <p v-if="!myParts && !idk"
       style="text-align: right; font-weight: bold; font-size: 30px; color: #ffce0c; padding-right: 20px">פינה חמה +</p>
    <p v-if="idk"
       style="text-align: right; font-weight: bold; font-size: 30px; color: #ffce0c; padding-right: 20px"></p>
    <div class="containerx">
      <q-card
          v-for="(post, index) in posts" :key="index"
          class="card-post" bordered
          style="min-width: 300px; min-height: 100px; width: auto; height: 370px; background-color: #ffcf00; border: 2px solid black">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="post.avatarUser">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ post.name }}</q-item-label>
            <q-item-label caption>
              {{ post.location }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <div style="margin-left: 90px">
              <q-btn v-if="myParts" color="black" round flat icon="more_vert">
                <q-menu cover auto-close style="left: 230px">
                  <q-list>
                    <q-item clickable>
                      <q-item-section @click="deletePost(post)" style="left: 230px">מחיקת פוסט</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
        <img :src="post.url"
             style="min-width: 300px; min-height: 100px;width: 400px;height: 240px; border: 1px solid black">
        <q-card-section>
          <div class="text-h6" style="text-align: right">{{ post.comment }}</div>
          <div class="text-subtitle2" style="text-align: right">{{ post.carGroup }}</div>

          <q-btn @click="iLike(post, index)" flat round :color="color[index]" icon="thumb_up_alt"
                 style="margin-top: -65px"/>
          <q-btn @click="viewComments(post, index)" flat round color="black" icon="comments"
                 style="margin: -60px 0 0 20px">
            <q-badge style="right: 1px; top: -1px" v-if="post.sumComments > 0" color="red" floating>
              {{ post.sumComments }}
            </q-badge>
          </q-btn>
          <p style="margin: -33px 8px; font-size: 15px; font-weight: bold">{{ post.likeCounter }}</p>
          <!--          @click="viewLikesPeople"-->
        </q-card-section>
      </q-card>
      <!--Dialog For Delete Post -->
      <div class="q-pa-xl-lg q-gutter-xl-md">
        <!--        <q-btn label="Alert" color="primary" @click="alert = true"/>-->
        <q-dialog v-model="alertDeletePost">
          <q-card style="width: 90%; height: 200px; background-color: #ffce0c; border-radius: 20px">
            <q-card-section>
              <div class="text-h6" style="text-align: right; font-weight: bold">:הודעה</div>
            </q-card-section>

            <q-card-section class="q-pt-none" style="text-align: right">
              האם אתה בטוח שרוצה למחוק את הפוסט ?
            </q-card-section>

            <q-card-actions align="left">
              <q-btn @click="remove" flat label="כן" color="red" v-close-popup/>
              <q-btn flat label="לא" color="blue" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <!-- DIALOG POP UP -->
      <q-dialog dir="rtl" v-model="basic" transition-show="rotate" transition-hide="rotate">
        <q-card dir="rtl" class="my-card" flat style="width: 300px">
          <div style="width: 300px;position: fixed; z-index: 9; margin-bottom: 100px; background-color: #ffcf00">
            <q-input id="commentInput" bottom-slots v-model="comments.addComment" label="תגובה חדשה...">
              <template v-slot:before>
                <q-avatar style="width: 40px; height: 40px">
                  <img :src="comments.avatar">
                </q-avatar>
              </template>

              <template dir="rtl" v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
              </template>

              <template dir="rtl" v-slot:after>
                <q-btn @click="insertComment()" dir="rtl" round dense flat icon="send"
                       style="transform: rotateY(177deg); font-size: 18px; color: #7c7c7c"/>
              </template>
            </q-input>

            <div class="text-h6" style="color: #8c8686; margin-right: 20px; font-weight: bold">תגובות:</div>
          </div>

          <q-separator/>
          <q-card style="height: 95px"></q-card>

          <q-intersection
              v-for="index in 1"
              :key="index"
              transition="slide-down"
              class="example-item"
          >
            <!--THE 1st CARD COMMENT-->
            <q-card style="width: 300px" dir="rtl" class="my-card" flat bordered
                    v-for="(postCom, index) in postsComments" :key="index">

              <q-btn style="position: absolute; right: 210px; top: 20px; font-size: 12px" flat icon="reply_all"
                     @click="viewReplyMessages(postCom.id)"
                     class="cursor-pointer">
                <q-badge v-if="postCom.sumComToCom" style="right: 7px; top: -6px; " color="orange" floating>
                  {{ postCom.sumComToCom }}
                </q-badge>
              </q-btn>

              <q-item style="max-width: 180px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="postCom.avatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div style="margin-right: 10px; max-width: 300px">
                    <q-item-label style="font-weight: bold; text-overflow: ellipsis; white-space: nowrap;
                    overflow: hidden; ">{{ postCom.userName }}
                    </q-item-label>
                    <q-item-label caption>
                      <div style="font-size: 10px">
                        {{ postCom.commentDate }} {{ postCom.commentHour }}
                      </div>
                    </q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-card-section horizontal class="row-4">
                <p style="padding-right: 40px; width: 280px">{{ postCom.addComment }}</p>
              </q-card-section>
              <q-separator/>
            </q-card>
          </q-intersection>
        </q-card>
      </q-dialog>

      <!-- COMMENT FROM COMMENTS -->
      <q-dialog dir="rtl" v-model="basic2" transition-show="rotate" transition-hide="rotate">
        <q-card dir="rtl" class="my-card" flat bordered style="width: 333px">
          <div style="width: 330px;position: fixed; z-index: 9">
            <div>
              <q-btn icon="west" @click="back" style="width: 331px;padding-right: 40px; background-color: #ffcf00">
                <span style="position: absolute; margin-left: 65px">חזרה</span>
              </q-btn>
            </div>

            <!-- COMMENT FIXED  -->
            <q-card style="background-color: #bdbdbd; width: 331px; border: none" dir="rtl" class="my-card" flat>
              <q-item style="max-width: 180px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="comentario.avatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div style="margin-right: 10px; max-width: 330px">
                    <q-item-label style="font-weight: bold; text-overflow: ellipsis; white-space: nowrap;
                    overflow: hidden; "> {{ comentario.userName }}
                    </q-item-label>
                    <q-item-label caption>
                      <div style="font-size: 10px">
                        {{ comentario.commentDate }} {{ comentario.commentHour }}
                      </div>
                    </q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-card-section horizontal class="row-4">
                <p style="padding-right: 40px; max-width: 300px">{{ comentario.addComment }}</p>
              </q-card-section>
              <!--              <q-separator/>-->
            </q-card>

            <q-input id="commentInput" bottom-slots v-model="comments2.addComment" label="תגובה לתגובה..."
                     style="background-color: #ffcf00; width: 331px; border: none">
              <template v-slot:before>
                <q-avatar style="width: 40px; height: 40px">
                  <img :src="comments2.avatar">
                </q-avatar>
              </template>

              <template dir="rtl" v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
              </template>

              <template dir="rtl" v-slot:after>
                <q-btn @click="insertReplyComment()" dir="rtl" round dense flat icon="send"
                       style="transform: rotateY(177deg); font-size: 18px; color: #7c7c7c"/>
              </template>
            </q-input>
          </div>

          <q-intersection
              v-for="index in 1"
              :key="index"
              transition="slide-down"
              class="example-item"
          >
            <!-- CHECK THIS FAST -->
            <div class="text-h5" style="color: orange; margin-right: 251px; font-weight: bold">תגובות:</div>
            <q-separator/>

            <q-card style="height: 180px"></q-card>

            <!--THE CARD COMMENT-->
            <q-card style="" dir="rtl" class="my-card" flat bordered
                    v-for="(postComToCom, index) in postCommentToComment" :key="index">

              <q-item style="max-width: 180px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="postComToCom.avatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div style="margin-right: 10px; max-width: 300px">
                    <q-item-label style="font-weight: bold; text-overflow: ellipsis; white-space: nowrap;
                    overflow: hidden; ">{{ postComToCom.userName }}
                    </q-item-label>
                    <q-item-label caption>
                      <div style="font-size: 10px">
                        {{ postComToCom.commentDate }} {{ postComToCom.commentHour }}
                      </div>
                    </q-item-label>
                  </div>
                </q-item-section>
              </q-item>
              <q-card-section horizontal class="row-4">
                <p style="padding-right: 40px; width: 300px">{{ postComToCom.addComment }}</p>
              </q-card-section>
              <q-separator/>
            </q-card>
          </q-intersection>
        </q-card>
      </q-dialog>
    </div>
    <q-dialog v-model="alertCommentEmpty">
      <q-card style="width: 90%; height: 200px; background-color: #ff6767; border-radius: 20px">
        <q-card-section>
          <div class="text-h3" style="text-align: right; font-weight: bold">:אזהרה</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="text-align: right">
          <p style="margin: 20px 10px 0 0;font-size: 25px">
            לא ניתן לשלוח תגובה ללא טקסט
          </p>
        </q-card-section>
        <q-card-actions align="left">
          <q-btn flat label="OK" color="blue" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <send-notification v-if="newNotificacion !== undefined" :usersPostComment="arrUsersToken"
                       :usersPostComment2="notificaxion" :newNotificacions="objTest"/>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import SendNotification from "./sendNotification";
import database from "../middleware/firebase/database";

export default {
  name: "Insta",
  components: {SendNotification},
  props: ['myParts'],
  data() {
    return {
      idk: this.$route.params.id,
      myGroups: '',
      degel: true,
      comReplyId: '',
      arrUsersPost: [],
      arrUsersToken: [],
      notificaxion: '',
      postCommentToCommentId: '',
      objTest: '',
      newNotificacion: undefined,
      postData: {},
      postNewData: '',
      comment1: '',
      userComment: '',
      userAvatarUrl: '',
      deletePostBtn: false,
      text: '',
      flag: false,
      quantity: 0,
      alertDeletePost: false,
      postId: '',
      sumPost: 0,
      comments: {
        addComment: '',
        avatar: ''
      }, comments2: {
        addComment: '',
        avatar: ''
      },
      commToCommBadge: 0,
      alertCommentEmpty: false,
      comentario: '',
      userData: '',
      newComment: {
        sumComments: 0,
      },
      basic: false,
      basic2: false,
      like: {
        likeCounter: 0
      },
      users: ''
    }
  },
  computed: {
    ...mapState('posts', ['postArray', 'postim', 'postComments', 'postCommentToComments', 'sumComment', 'myPosts']),
    ...mapState('items', ['myPostis']),
    ...mapState('users', ['userStore', 'privateUser', 'privateUsers', 'notiFlag', 'notification']),
    color: function () {
      debugger
      if (this.myPostis !== "" || this.flag) {
        let userx = this.privateUsers;
        let arr = [];
        debugger
        for (let i = 0; i < userx.length; i++) {
          if (userx[i].id === window.user.uid) {
            if (userx[i].postIlikeById) {
              debugger
              for (let key in userx[i].postIlikeById) {
                debugger
                arr.push(key);
              }
            }
          }
        }
        return this.postArray.map(function (post) {
          let value = arr.find(p => p === post.id)
          debugger
          if (value) {
            return post.id === value ? 'green' : 'red'
          }
        });
      }
    },
    posts: function () {
      this.users = this.privateUsers;
      debugger
      if (this.postArray[0] !== undefined) {
        debugger
        if (this.myParts) {
          if (this.myPostis === "") {
            return 'עוד לא פרסמת פוסט'
          }
          return this.myPostis;
        } else {
          this.flag = true;
          return this.postArray;
        }
      }
    },

    postsComments: function () {
      debugger
      if (this.myPostis !== "" || this.flag) {
        this.comments.addComment = '';
        debugger
        if (this.postComments[0]) {
          return this.postComments
        }
      }
    },

    postCommentToComment: function () {
      debugger
      return this.postCommentToComments;
    }
  },
  methods: {
    ...mapActions('posts', ['removePosts', 'insertReplyCommentsSum', 'getPostCommentToComments', 'insertCommentToComments', 'getPosts', 'insertDataById', 'insertUserPostLike', 'getSumComments', 'insertCommentsToPost', 'getPostComments', 'insertSumPost']),
    ...mapActions('users', ['getUserInfo', 'getUsersToken', 'getStoreInfo', 'getUserById', 'getUsers', 'getMyGroups', 'insertNotifications', 'getMyNotifications']),
    ...mapMutations('posts', ['setReplyComment', 'setEditedPost', 'setEditedPostId', 'setComment', 'setSumComment', 'setEditedPostCarGroup', 'resetPosts']),
    ...mapMutations('users', ['setEditedUserId', 'setNotiFlag']),

    async iLike(post) {
      let userx = this.privateUsers;
      let arr = [];
      debugger
      for (let i = 0; i < userx.length; i++) {
        if (userx[i].id === window.user.uid) {
          if (userx[i].postIlikeById) {
            debugger
            for (let key in userx[i].postIlikeById) {
              debugger
              arr.push(key);
            }
          }
        }
      }
      let value = arr.find(p => p === post.id)
      if (!value) {
        post.like = true;
        post.likeCounter += 1;

        this.setEditedPostId(post.id);
        this.insertUserPostLike();
        this.setEditedPost(post);
        await this.insertDataById(post.carGroup);
        await this.getUsers();
      }
    },

    insertComment() {
      if (this.comments.addComment === '') {
        debugger
        this.alertCommentEmpty = true;
        return
      }
      debugger
      this.newNotificacion = undefined;
      let userId = window.user.uid;
      let quantity = 0;
      if (userId) {
        let userData = this.privateUsers.find(data => data.id === userId);
        this.comments.avatar = userData.url;
        this.comments.userName = userData.userName;
        this.comments.userId = userData.id;
        this.comment1 = this.comments.addComment;
        this.comments.commentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        this.comments.commentHour = `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
        this.comments.userdPostId = this.postData.userdPostId;
        this.quantity = 1;
        this.newComment.sumComments = this.quantity;
        debugger
        this.setEditedPost(this.newComment)
        debugger
        let objNotification = {
          userId: this.newComment.userdPostId,
          postUserId: this.postId,
          not: true,
          avatar: this.newComment.url,
          userName: userData.userName,
          comment: this.comments.addComment
        };
        this.objTest = objNotification;
        this.setNotiFlag(objNotification);
        debugger
        this.setComment(this.comments);
        debugger
        this.insertCommentsToPost(this.postData.carGroup)
            .then(async () => {
              debugger
              await this.insertSumPost(this.postData.carGroup);
              debugger
              this.comments.addComment = this.comment1;
              this.comments.avatarUrl = this.newComment.url;
              this.comments.id = this.postId;
              debugger
              if (this.postData.userdPostId !== window.user.uid) {
                this.insertNotifications(this.comments).then(() => {
                  debugger
                  if (this.newNotificacion) {
                    debugger
                    this.newNotificacion = false;
                  } else {
                    debugger
                    this.newNotificacion = true;
                  }
                  this.comments.addComment = '';
                });
              }
            });
        debugger
      }
    },

    viewComments(post) {
      let idExist = false;

      if (!post) {
        Object.assign(this.postData, this.postArray[0]);
      } else {
        Object.assign(this.postData, post);
      }
      console.log(this.postData.userdPostId, ' <===> ', window.user.uid)

      this.userAvatarUrl = this.postData.url;
      debugger
      this.setEditedPostId(this.postData.id);
      this.setEditedPostCarGroup(this.postData.carGroup);
      debugger
      this.newComment = this.postData;
      debugger
      if (this.$route.params.id) {
        idExist = true;
      }
      this.getPostComments({carGroup: this.postData.carGroup, idExist: idExist}).then(() => {
        this.basic = true;
      })
      debugger
      let userId = window.user.uid;
      this.userData = this.privateUsers.find(data => data.id === userId);
      debugger
      this.comments.avatar = this.userData.url;
      this.comments.id = this.userData.url;
      this.postId = this.postData.imgName;
      debugger
    },

    addPost() {
      this.$router.push('/AddPost');
    },

    remove(post) {
      debugger
      this.deletePostBtn = true;
      if (this.deletePostBtn) {
        this.removePosts({carGroup: this.postNewData.carGroup, postId: this.postNewData.id})
      }
      window.location.reload();
    },

    deletePost(post) {
      debugger
      this.postNewData = post;
      this.alertDeletePost = true;
    },

    insertReplyComment() {
      if (this.comments2.addComment === '') {
        // debugger
        this.alertCommentEmpty = true;
        return
      }
      this.newNotificacion = undefined;
      let sumComToCom = 0;
      this.comments2.commentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
      this.comments2.commentHour = `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`;
      this.comments2.userId = window.user.uid;
      this.comments2.userName = this.userData.userName;
      this.comments2.commentId = this.postCommentToCommentId;
      this.comments2.userdPostId = this.userComment;
      this.comments2.id = this.postId;
      this.comments2.avatarUrl = this.userAvatarUrl;
      sumComToCom = this.postCommentToComments.length + 1;
      let userReplyComm = this.$store.state.users.privateUsers.find(user => user.id === this.userComment);
      console.log(userReplyComm, 'userData')

      let objNotification = {
        userId: userReplyComm.userToken,
        postUserId: this.postId,
        not: true,
        avatar: this.comments2.avatarUrl,
        userName: this.comments2.userName,
        comment: this.comments2.addComment
      };
      this.objTest = objNotification;
      this.setNotiFlag(objNotification);
      this.setReplyComment(this.comments2);
      this.insertCommentToComments({
        carGroup: this.postData.carGroup,
        commentId: this.postCommentToCommentId
      }).then(() => {
        this.insertReplyCommentsSum({
          carGroup: this.postData.carGroup,
          commentId: this.postCommentToCommentId,
          sumComToCom
        });
      }).then(() => {
        this.insertNotifications(this.comments2).then(async () => {
          let usersToken = '';
          if (this.postCommentToComments) {
            for (let key of this.postCommentToComments) {
              if (this.degel && this.comentario.userId !== window.user.uid) {
                this.degel = false;
                usersToken = await this.getUsersToken(this.comentario.userId);
                this.arrUsersPost.push(this.comentario.userId);
                this.arrUsersToken.push(usersToken);
              }
              if (!(this.arrUsersPost.indexOf(key.userId) !== -1) && (key.userId !== window.user.uid)) {
                this.comments2.userdPostId = key.userId;
                await this.insertNotifications(this.comments2);
                usersToken = await this.getUsersToken(key.userId);
                this.arrUsersToken.push(usersToken);
                this.arrUsersPost.push(key.userId);
              }
            }
          }
          if (this.newNotificacion) {
            this.newNotificacion = false;
          } else {
            this.newNotificacion = true;
          }
          this.comments2.addComment = '';
        });
      })
    },

    viewReplyMessages(messageId) {
      let idExist = false;
      debugger
      console.log(messageId);
      this.postCommentToCommentId = messageId;
      debugger
      this.comentario = this.postComments.find(comment => comment.id === messageId);
      console.log(this.comentario);
      this.userComment = this.comentario.userId
      debugger
      if (this.$route.params.id) {
        idExist = true;
      }
      this.getPostCommentToComments({carGroup: this.postData.carGroup, commentId: messageId, idExist}).then(() => {
        this.basic2 = true;
      });
      this.comments2.avatar = this.userData.url;
    },

    back() {
      this.comments2.addComment = '';
      this.basic2 = false;
    }
  },
  created() {
    debugger
    this.getUsers();
    debugger
    if (!this.myParts) {
      this.resetPosts();
      this.getMyGroups().then(res => {
        debugger
        let arr = [];
        for (let key of res) {
          arr.push(key.carGroup)
        }
        this.myGroups = arr;
        let route = '';
        let numNoti = '';

        if (this.$route.params.id) {
          route = this.$route.params.id.split("&&");
          numNoti = parseInt(route[1]);
        }

        debugger
        if (route[0] === "undefined") {
          this.getPosts({groups: this.myGroups});
        } else {
          this.getPosts({groups: this.myGroups, postId: route[0]}).then(async () => {
            await this.getMyNotifications().then(() => {
              if (route[0]) {
                this.viewComments();
                if (this.notification[numNoti].commentId) {
                  console.log(this.notification[numNoti].commentId, 'last test');
                  setTimeout(() => {
                    this.viewReplyMessages(this.notification[numNoti].commentId);
                  }, 500);
                }
              }
            })
          })
        }
      });
    }
    this.getUserInfo();
  },
}
</script>

<style>

.containerx {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  padding: 10px 20px;
  gap: 2em;
}

.q-field__inner {
  text-align: right !important;
  right: 10px;
}
</style>