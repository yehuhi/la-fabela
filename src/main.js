import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import firebaseInstance from './middleware/firebase';
// import firebaseMessaging from './middleware/firebase';
import style from './styleSheet.css'
import "firebase/messaging";

Vue.prototype.$messaging = firebaseInstance
Vue.config.productionTip = false;

firebaseInstance.firebase.auth().onAuthStateChanged((user) => {
    window.user = user;
    new Vue({
        router,
        store,
        // icon,
        render: h => h(App)
    }).$mount('#app')
})

