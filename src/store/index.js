import Vue from 'vue'
import Vuex from 'vuex'
import items from './items'
import users from './users'
import posts from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        items,
        users,
        posts
    }
})