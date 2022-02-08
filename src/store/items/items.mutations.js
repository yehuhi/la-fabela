export default {
    setPrivateItems: ((state, itemsPrivate) => state.itemsPrivate = itemsPrivate),

    setStoreItems: ((state, itemsStore) => state.itemsStore = itemsStore),

    setCartItems: ((state, cartItems) => state.cartItems = cartItems),

    setCartTotal: ((state, cartItems) => state.cartItemsTotal = cartItems),

    setFilterItems: ((state, cartItems) => state.editedItem = cartItems),

    setItemDetails: ((state, cartItems) => state.editedItem = cartItems),

    setMyPrivateItems: ((state, itemsPrivate) => state.myItemsPrivate = itemsPrivate),

    setMyStoreItems: ((state, itemsStore) => state.myItemsStore = itemsStore),

    setMyCartItems: ((state, cartItems) => state.myCartItems = cartItems),

    setMyPostis: ((state, posts) => {
        debugger
        state.myPostis = posts
    }),


    setEditedItemId: ((state, id) => {
        debugger
        state.editedItemId = id
    }),

    setEditedItem: ((state, item) => state.editedItem = item),

    setEditItemId: ((state, item) => state.editItemId = item),

    setEditedItemCart: ((state, item) => {
        debugger
        // let result = item.find(itm => itm === state.cartItems)
        // if (!result) {
        //     state.cartItems.push(item);
        // }
        state.cartItems.push(item);

    }),

    resetEditedItemId: ((state) => state.editedItemId = ''),

    resetEditedItem: ((state) => {
        debugger
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
        debugger
        const index = state.myItemsPrivate.findIndex(p => p.id === itemId)
        state.myItemsPrivate.splice(index, 1)
    }),

    insertPrivateItem: ((state, item) => {
        state.itemsPrivate.push(item)
    }),
    insertStoreItem: ((state, item) => {
        state.itemsStore.push(item)
    }),
    insertFilterItems: ((state, item) => {
        state.itemsFilterSearch.push(item)
    }),

    // *********** My Cards in the Profile *************
    insertMyItem: ((state, item) => {
        state.myItemsPrivate.push(item)
    }),
    insertMyCartItem: ((state, item) => {
        state.items.push(item)
    }),
}