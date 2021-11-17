import state from './users.state'
import mutations from './users.actions'
import actions from './users.mutations'
import getters from './users.getters'


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}