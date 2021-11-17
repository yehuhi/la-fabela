import database from "../../middleware/firebase/database";

export default {
    getUsers: async ({commit}) => {
        const users = await database.get({entity: 'users'});
        commit('setUsers', users)
    },
}