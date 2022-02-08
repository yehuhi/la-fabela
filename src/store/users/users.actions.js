import database from "../../middleware/firebase/database";
import carsDatabase from "../../middleware/firebase/database/cars";

export default {

    getUsers: async ({commit}) => {
        debugger
        const users = await database.get({entity: 'users'});
        debugger
        console.log(users, 'my users')
        commit('setUsers', users)
    },

    getStores: async ({commit}) => {
        const stores = await database.get({entity: 'stores'});
        commit('setStores', stores)
    },

    getUserInfo: async ({commit}) => {
        debugger
        const userDetail = await carsDatabase.getCards({entity: 'users'});
        debugger
        commit('setEditedUser', userDetail)
        console.log(userDetail.userName);
    },

    getStoreInfo: async ({commit}) => {
        debugger
        const storeDetail = await carsDatabase.getCards({entity: 'stores'});
        debugger
        commit('setEditedStore', storeDetail)
        console.log(storeDetail.userName);
    },

    getMyGroups: async ({commit, state, rootState}) => {
        debugger
        const userGroups = await database.getMyGroup({entity: `users/${window.user.uid}/UserGroups`});
        commit('getGroups', userGroups);
        debugger
        return userGroups;
    },

    getUserToken: async ({commit, state, rootState}) => {
        debugger
        let userNotification = {};
        let userToken = await database.getTokeno({entity: `users/${state.notiFlag.userId}/userToken`});
        userNotification = state.notiFlag;
        userNotification.token = userToken;
        userNotification.userId = state.notiFlag.userId;
        commit('getToken', userToken);
        debugger
        return userNotification;
    },

    getUsersToken: async ({commit, state, rootState}, usersCommId) => {
        debugger
        let usersToken = {};
        debugger
        usersToken = await database.getTokeno({entity: `users/${usersCommId}`});
        return usersToken;
    },

    getMyNotifications: async ({commit, state, rootState}) => {
        debugger
        const userNotifications = await database.getMyNotifications({entity: `users/${window.user.uid}/notifications`});
        commit('setMyNotifications', userNotifications);
        debugger
        // return userNotifications;
    },

    getAllGroups: async ({commit, state, rootState}) => {
        debugger
        return await database.getGroups({entity: `carGroups`});
        // debugger
        // commit('getGroups', userGroups);
    },

    insertNotifications: async ({commit, state, rootState}, options) => {
        // debugger
        const id = await database.generateId({entity: 'Test2'});
        await database.updateNotifications({
            entity: `users/${options.userdPostId}/notifications/${id}`, notification: options
        });
    },

    removeNotif: async ({commit, state, rootState}) => {
        debugger
        await database.removeNotifications({entity: `users/${window.user.uid}/notifications`})
    },

    insertUserToken: async ({commit, state, rootState}, tokenNum) => {
        debugger
        if (state.userStore.imStore) {
            await database.updateUserToken({
                entity: `stores/${window.user.uid}/userToken`, token: tokenNum
            });
        } else {
            await database.updateUserToken({
                entity: `users/${window.user.uid}/userToken`, token: tokenNum
            });
        }
    },

    insertGroups: async ({commit, state, rootState}, idCarGroup) => {
        debugger
        // const id = await database.generateId({entity: 'Test2'})
        await database.updateGroups({
            entity: `carGroups/${idCarGroup}`, post: state.carGroup.numUsers
        });
        // debugger
        // commit('setMyGroups', state.newGroup);
    },

    insertMyGroups: async ({commit, state, rootState}) => {
        debugger
        const id = await database.generateId({entity: 'Test2'})

        await database.updateUserGroups({
            entity: 'users',
            subEntity: 'UserGroups', post: {[id]: state.newGroup}
        });
        debugger
        commit('setMyGroups', state.newGroup);

    }
    // getUserById:async ({state, commit}) => {
    //     debugger
    //     let userData = await carsDatabase.getCards({entity: 'users', id: state.editedUserId});
    //     debugger
    //     commit('setUsersLikePost', userData);
    //     debugger
    // }
}