export default {
    setUsers: ((state, users) => state.privateUsers = users),

    setUsersLikePost: ((state, users) => state.usersLikePost.push(users)),

    setStores: ((state, stores) => state.userStores = stores),

    setNotificacionsApp: ((state, notificacions) => state.notificacions = notificacions),

    setUserOut: ((state, out) => state.out = out),

    setUserOutL: ((state, outL) => state.outL = outL),

    setEditedUserId: ((state, id) => state.editedUserId = id),

    setEditedStoreId: ((state, id) => state.editedStoreId = id),

    setEditedUser: ((state, userDetail) => state.privateUser = userDetail),

    setEditedStore: ((state, storeDetail) => state.userStore = storeDetail),

    setMyNewGroup: ((state, newGroup) => state.newGroup = newGroup),

    setMyNotifications: ((state, notification) => state.notification = notification),

    setNumUsersGroup: ((state, numUsers) => state.carGroup.numUsers = numUsers),

    getGroups: ((state, myGroup) => {
        debugger
        state.myGroup = myGroup
    }),
    getToken: ((state, token) => {
        debugger
        state.userToken = token
    }),
    getTokens: ((state, tokens) => {
        debugger
        state.usersToken.push(tokens)
    }),

    setMyGroups: ((state, myGroup) => {
        debugger
        state.myGroups.push(myGroup)
    }),

    setNotiFlag: ((state, flag) => {
        debugger
        state.notiFlag = flag
    }),

    resetEditedUserId: ((state) => state.editedUserId = ''),

    resetEditedUser: ((state) => {
        for (const key in state.privateUser) {
            state.privateUser[key] = ''
        }
        delete state.privateUser.id;
    }),
    resetStoreEditedUser: ((state) => {
        for (const key in state.userStore) {
            state.userStore[key] = ''
        }
        delete state.privateUser.id;
    }),
    privateUser: ((state, item) => {
        const index = state.users.findIndex(p => p.id === item.id)
        state.users.splice(index, 1, item)
    }),

    deleteUser: ((state, itemId) => {
        const index = state.users.findIndex(p => p.id === itemId)
        state.users.splice(index, 1)
    }),

    insertUser: ((state, item) => {
        state.users.push(item)
    }),

    insertStore: ((state, item) => {
        state.users.push(item)
    }),
}