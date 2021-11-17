
export default {
    setUsers: ((state, users) => state.users = users),

    setEditedUserId: ((state, id) => state.editedUserId = id),

    setEditedUser: ((state, user) => state.editedUser = user),

    resetEditedUserId: ((state) => state.editedUserId = ''),

    resetEditedUser: ((state) => {
        for (const key in state.editedUser) {
            state.editedUser[key] = ''
        }
        delete state.editedUser.id;
    }),
    editedUser: ((state, item) => {
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
}