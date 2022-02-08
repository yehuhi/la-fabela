<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <div v-for="(myGroup, index) in myGroups" :key="index">
      <q-card style="height: 200px; background-color: #212529" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
            <!--peoples in the group-->
            <p style="text-align: center; margin-top: -5px; color: white"><span style="color: #ff0000; font-weight: bold">{{ myGroup.numUsers }}</span> הצטרפו</p>
            <!-- Text about the group-->
            <div style="margin-top: -10px; text-align: center; font-weight: bold; color: #eab601">{{ myGroup.carGroup }}</div>
            <div style="margin-top: 1px; font-size: 15px; width: 150px; color: white; text-align: center">{{ myGroup.textFree }}</div>
            <q-card-section>
              <!--Name of the group-->
              <q-btn v-if="myGroup.cancelBtn === false" @click="addGroupCar(index)" label="להצטרף"
                     style="background-color: #ffcf00; margin: -1px 0 0 15px">
              </q-btn>
              <p v-if="myGroup.flag"
                 style="color: #3effe8; font-weight: bold ; margin-top: -15px; text-align: center">! מצורף לקבוצה
              </p>
              <q-btn v-if="myGroup.flag" label="לבטל"
                     style="background-color: #ff4242; margin: -15px 0 0 25px">
              </q-btn>
            </q-card-section>
          </q-card-section>
          <q-img class="col-6" style="height: 197px; width: 165px" :src="myGroup.imgUrl"/>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "CarGroups",
  data() {
    return {
      groups: {},
      onlyNumUsers: {},
      my: '',
      all: '',
      flag: true,
      lorem: 'קבוצת מכוניות, תוכל לפרסם פוסטים וגם לרכוש מוצרים במחירים פנטסטיים'
    }
  },
  computed: {
    ...mapState('users', ['privateUser', 'myGroup', 'myGroups']),
    myGroups: function () {
      debugger
      if (this.my && this.all) {
        debugger
        if (this.my[0]) {
          for (let i = 0; i < this.my.length; i++) {
            for (let j = 0; j < this.all.length; j++) {
              if (this.all[j].carGroup === this.my[i].carGroup) {
                this.all[j].addBtn = this.my[i].addBtn;
                this.all[j].cancelBtn = this.my[i].cancelBtn;
                this.all[j].flag = this.my[i].flag;
              }
            }
          }
        }
        console.log(this.my);
        return this.all;
      } else {
        return this.all;
      }
    }
  },
  methods: {
    ...mapActions('users', ['insertMyGroups', 'getMyGroups', 'getAllGroups', 'insertGroups']),
    ...mapMutations('users', ['setMyNewGroup', 'setNumUsersGroup']),
    addGroupCar(index) {
      debugger
      if (index => 0) {
        this.getAllGroups().then(res => {
          let carGroupo = res[index].carGroup;
          let idCarGroup = res[index].id;
          debugger
          if (res[0]) {
            for (let key in res) {
              // this.groups = key;
              // if (typeCar === res[key].carGroup) {
              if (index === key) {
                alert('אתה כבר מצורף לקבוצה');
                return
              } else if (parseInt(key) === res.length - 1) {
                alert(`הצטרפת לקבוצת ${carGroupo} `);
                this.groups.carGroup = carGroupo;
                this.groups.flag = true;
                this.groups.numUsers = 0;
                this.groups.addBtn = true;
                this.groups.cancelBtn = true;
                this.onlyNumUsers.numUsers = res[index].numUsers + 1;

                this.setNumUsersGroup(this.onlyNumUsers);
                this.setMyNewGroup(this.groups);
                debugger
                this.insertMyGroups().then(() => {
                  debugger
                  this.my = [{carGroup: carGroupo, flag: true}];
                  this.insertGroups(idCarGroup);
                })
              }
            }
          } else {
            alert(`הצטרפת לקבוצת ${carGroupo} `);
            this.groups.carGroup = carGroupo;
            this.groups.flag = true;
            this.groups.numUsers = 0;
            this.groups.addBtn = true;
            this.groups.cancelBtn = true;
            this.setMyNewGroup(this.groups);
            debugger
            this.insertMyGroups().then(() => {
              debugger
              this.my = [{carGroup: carGroupo, flag: true}];
            })
            this.flag = true;
          }
        });
      }
    },
    grupos() {
      this.getMyGroups().then(res => {
        debugger
        if (res[0]) {
          this.my = res;
        }
        // else {
        //   this.my = [{flag: false}];
        // }
      });
    },

    allGrupos() {
      this.getAllGroups().then(res => {
        debugger
        if (res[0]) {
          this.all = res;
        }
      });
    }
  },
  created() {
    this.allGrupos();
    this.grupos();
  }
}
</script>

<style scoped>

</style>