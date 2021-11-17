export default {
    setItems: ((state, items) => state.items = items),

    setMyItems: ((state, items) => state.myItems = items),

    setEditedItemId: ((state, id) => state.editedItemId = id),

    setEditedItem: ((state, item) => state.editedItem = item),

    resetEditedItemId: ((state) => state.editedItemId = ''),

    resetEditedItem: ((state) => {
        for (const key in state.editedItem) {
            state.editedItem[key] = ''
        }
        delete state.editedItem.id;
    }),
    editedItem: ((state, item) => {
        const index = state.items.findIndex(p => p.id === item.id)
        state.items.splice(index, 1, item)
    }),

    deleteItem: ((state, itemId) => {
        const index = state.myItems.findIndex(p => p.id === itemId)
        state.myItems.splice(index, 1)
    }),

    insertItem: ((state, item) => {
        state.items.push(item)
    }),

    // *********** My Cards in the Profile *************
    insertMyItem: ((state, item) => {
        state.items.push(item)
    }),
}