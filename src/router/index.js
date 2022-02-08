import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connections from '../views/Connections.vue'
import firebaseInstance from '../middleware/firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/Connections',
        name: 'Connections',
        component: Connections,
        meta: {authNotRequired: false}
    },
    {
        path: '/',
        name: '/',
        component: Home,
        meta: {authNotRequired: false}
    },
    // {
    //     path: '/home',
    //     name: 'Home',
    //     component: Home,
    //     meta: {authNotRequired: false}
    // },
    {
        path: '/item/:id',
        name: 'Item',
        component: () => import(/* webpackChunkName: "item" */ '../views/Item.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "UsedParts" */ '../views/profile.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/items-details/:id',
        name: 'ItemDetails',
        component: () => import(/* webpackChunkName: "ItemDetails" */ '../views/ItemDetails.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/addItem',
        name: 'AddItem',
        component: () => import(/* webpackChunkName: "AddItem" */ '../components/AddItem.vue'),
        // meta: {authNotRequired: true},
        beforeEnter: async (to, from, next) => {
            if (!window.user && to.path === '/addItem') {
                await next('/Connections')
            }
            next();
        }
    },
    {
        path: '/searchItems',
        name: 'SearchItems',
        component: () => import(/* webpackChunkName: "AddItem" */ '../views/SearchItmes.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/searchUsedParts',
        name: 'SearchUsedParts',
        component: () => import( '../views/searchUsedParts.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/searchNewParts',
        name: 'SearchNewParts',
        component: () => import( '../views/searchNewParts.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/search/:search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "AddItem" */ '../components/Search.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/instushAll',
        name: 'InstushAll',
        component: () => import( '../components/Insta.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/insta/:id',
        name: 'Instush',
        component: () => import( '../views/FreePosts.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/addPost',
        name: 'AddPost',
        component: () => import( '../components/AddPost.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/cartPage',
        name: 'CartPage',
        component: () => import( '../views/CartPage.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import( '../components/Cart.vue'),
        meta: {authNotRequired: false}
    }
]

const router = new VueRouter({
    routes
})

//   router.beforeEach(async(to, from, next) => {
//
//      if (!window.user && to.path !== '/addItem'){
//          await next('/Connections')
//      }
//     next();
//
//      // return router
// })

// esLint-disable-next-line consistent-return
// router.beforeEach((to, from, next) => {
//     const user = firebaseInstance.firebase.auth().currentUser;
//     if (user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
//         const path = !user ? '/addItem' : '/Connections';
//         return next(path);
//     }
//     next();
// })


export default router
