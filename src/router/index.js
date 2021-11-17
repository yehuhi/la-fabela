import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connections from '../views/Connections.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Connections',
        component: Connections
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/item/:id',
        name: 'Item',
        component: () => import(/* webpackChunkName: "item" */ '../views/Item.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "UsedParts" */ '../views/profile.vue')
    },
    {
        path: '/items-details/:id',
        name: 'ItemDetails',
        component: () => import(/* webpackChunkName: "ItemDetails" */ '../views/ItemDetails.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
