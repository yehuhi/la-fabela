import database from "../../middleware/firebase/database";
import firebaseDatabase from "../../middleware/firebase/database";
import storageDB from "../../middleware/firebase/storage";
import carsDatabase from "../../middleware/firebase/database/cars";

export default {
    getPrivateItems: async ({commit}) => {
        debugger
        const itemsPrivate = await database.get({entity: `${'items/privateUserItems'}`});
        commit('setPrivateItems', itemsPrivate)
    },

    getStoreItems: async ({commit}) => {
        const itemsStore = await database.get({entity: `${'items/storeItems'}`});
        commit('setStoreItems', itemsStore)
    },

    getCartItems: async ({commit}) => {
        debugger
        const cartItem = await database.get({entity: `${'carts/items'}`});
        commit('setCartItems', cartItem)
        debugger
    },
    getMyCartItems: async ({commit, rootState}, userStore) => {
        debugger
        let cartItemsId = '';
        let items = '';
        let itemArr = [];
        let enti = 'users';
        if (window.user.uid) {
            if (userStore) {
                enti = 'stores';
            }
            debugger
            cartItemsId = await database.getCartIt({entity: `${enti}/${window.user.uid}/cartItemsId`})
            // item = await database.getById({entity: 'items/privateUserItems', id: state.editedItemId})
        }
        debugger
        items = await database.get({entity: `${'carts/items'}`});
        // const cartItem = await database.get({entity: `${'carts/items'}`});
        debugger
        for (let i = 0; i < cartItemsId.length; i++) {
            debugger
            itemArr.push(items.find(item => item.id === cartItemsId[i]));
        }
        debugger
        commit('setMyCartItems', itemArr)
        debugger
    },
    getCartTotal: async ({commit}) => {
        debugger
        // const cartTotal = await database.getCartIt({entity: `${'carts/total'}`});
        const cartTotal = await database.getCartIt({entity: `users/${window.user.uid}/cartTotal`});
        commit('setCartTotal', cartTotal[0])
        debugger
    },

    deleteCartItem: async ({state, commit, dispatch}, priceDelete) => {
        debugger
        await firebaseDatabase.remove({entity: 'carts/items', id: state.editedItemId}).then(() => {
            debugger
            firebaseDatabase.removeCartId({entity: 'users', subEntity: 'cartItemsId', id: state.editedItemId})
        });
        let newPrice = state.cartItemsTotal - priceDelete
        debugger
        await database.createMyTotalCart({entity: `users/${window.user.uid}/cartTotal`, item: newPrice});

        commit('deleteItem', state.editedItemId);
        commit('resetEditedItemId');
        dispatch('getMyCartItems');
        dispatch('getCartTotal')
        debugger
    },

    deleteItem: async ({state, commit}) => {
        debugger
        await firebaseDatabase.remove({entity: 'items/privateUserItems', id: state.editedItemId})
        await storageDB.deleteImg({imageName: state.editedItemId})
        commit('deleteItem', state.editedItemId)
        commit('resetEditedItemId')
        debugger
    },

    updateItem: async ({state, commit}) => {
        debugger
        const item = {};
        Object.assign(item, state.editedItem)
        item.id = state.editItemId;
        debugger
        // Saves in DB
        await database.update({entity: 'items/privateUserItems', id: item.id, item})
        debugger
        // Saves in store
        commit('resetEditedItem')
        commit('resetEditedItemId')
        commit('editedItem', item)
    },

    insertItem: ({state, commit, rootState}, search) => {
        debugger
        let item = {};
        if (!search) {
            Object.assign(item, state.editedItem);
            // Saves in DB
            database.generateId({entity: 'Test'})
                .then(id => {
                    storageDB.uploadImg({imageName: id, file: item.image})
                        .then(url => {
                            item.url = url;
                            item.imgName = id;
                            debugger
                            let store = rootState.users.userStore.imStore;
                            let entit = '';
                            let tableName = 'users';
                            let insertTo = 'insertStoreItem';
                            if (store) {
                                entit = 'items/storeItems';
                                tableName = 'stores';
                            } else {
                                entit = 'items/privateUserItems';
                                insertTo = 'insertPrivateItem';
                            }
                            database.create({entity: `${entit}`, item, id: item.imgName})
                                .then(async () => {
                                    item.id = id
                                    await database.updateUserItem({
                                        entity: tableName, subEntity: 'itemsId', item: {[id]: item.id}
                                    });
                                    commit('resetEditedItem')
                                    commit(insertTo, item)
                                    debugger
                                    console.log(state.itemsPrivate)
                                    debugger
                                })
                        })
                })
        } else {
            debugger
            item = {};
            Object.assign(item, state.editedItem);
            commit('insertFilterItems', item)
        }
    },

    setEditItemWithId: async ({state, commit}, id) => {
        debugger
        let item = {};
        if (state.itemsStore.length && state.itemsStore.find(item => item.id === state.editedItemId)) {
            item = state.itemsStore.find(item => item.id === state.editedItemId);
        } else {
            debugger    //await                                                                     //editedItemId
            item = await database.getById({entity: 'items/privateUserItems', id: id})
            debugger
            console.log(item)
            commit('setEditedItem', item)
            commit('setEditItemId', id)
        }
    },

    setEditItemById: ({state, commit, rootState}, id) => {
        debugger
        let item = {};
        let entit = 'users';
        if (state.itemsStore.length && state.itemsStore.find(item => item.id === state.editedItemId)) {
            item = state.itemsStore.find(item => item.id === state.editedItemId);
            if (rootState.users.userStore.imStore) {
                entit = 'stores';
            }
        } else {
            debugger//await                                                                     //editedItemId
            item = database.getById({entity: 'items/privateUserItems', id: state.editedItemId})
            debugger
            console.log(item)
            commit('setEditedItem', item)
            commit('setEditItemId', id)

        }
        debugger
        item.quantity = 1;
        // commit('setEditedItemCart', item);
        // commit('setMyCartItems', item);

        database.create({entity: 'carts/items', item, id: state.editedItemId})
            .then(async () => {
                // commit('setEditedItem', item);
                await database.updateUser({
                    entiti: entit, subEntity: 'cartItemsId', itemx: {[id]: id}
                });
                debugger
            })
        commit('setEditedItemCart', item);
        commit('setMyCartItems', item);
    },

    getUserDetails: async ({state, commit, rootState}, myParts) => {
        debugger
        let store = rootState.users.userStore.imStore;
        let tableName = 'users';
        let entityDB = 'items/privateUserItems';
        // let items = state.itemsPrivate;
        let items = state.itemsPrivate;
        let myItemsStorage = 'setMyPrivateItems';
        if (store && myParts) {
            tableName = 'stores';
            items = state.itemsStore;
            myItemsStorage = 'setMyStoreItems';
        } else if (store && myParts) {
            tableName = 'stores';
        }

        // const userDetails = await carsDatabase.getCards({entity: 'stores'});
        let subEntity = '';
        const userDetails = await carsDatabase.getCards({entity: `${tableName}`});
        subEntity = userDetails.itemsId;
        if (myParts) {
            debugger
            subEntity = [];
            for (let key in userDetails.PostsId) {
                subEntity.push(key);
            }
            items = rootState.posts.postArray;
            myItemsStorage = 'setMyPostis';
            debugger
            // await rootState.posts.getPosts().then(
            //     res=>{
            entityDB = `posts/`
            // })
        }
        debugger
        let myItems = [];

        // if (state.itemsStore.length > 0) {
        if (items.length > 0) {
            debugger
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < subEntity.length; j++) {
                    if (items[i].id === subEntity[j]) {
                        myItems.push(items[i]);
                    }
                }
            }
            // entityDB = `posts/VW GOLF VR6`

        } else {
            debugger
            const itemas = await database.get({entity: entityDB});
            debugger
            for (let i = 0; i < itemas.length; i++) {
                debugger
                for (let j = 0; j < subEntity.length; j++) {
                    if (itemas[i].imgName === subEntity[j]) {
                        myItems.push(itemas[i]);
                    }
                }
            }
        }
        // commit('setMyStoreItems', myItems)
        debugger
        commit(myItemsStorage, myItems)
    },

    getInfoCards: async ({state, commit}) => {
        debugger
        let items = '';
        commit('resetEditedItem');
        items = await carsDatabase.getCards2({entity: 'items/privateUserItems', itemId: state.editedItemId})
        if (items.length <= 0) {
            items = await carsDatabase.getCards2({entity: 'items/storeItems', itemId: state.editedItemId})
        }
        debugger
        commit('setItemDetails', items)
    },

    calcObjCart: async ({state, commit, dispatch}, options) => {
        debugger
        let totalProduct = 0;
        let totalRestProd = 0;
        let total = 0;
        let x = 0;
        let enti = 'users';
        if (options.store) {
            enti = 'stores'
        }
        // let itemCart = state.cartItems;
        let itemCart = state.myCartItems;
        // this.idItemCart = product;
        for (let i = 0; i < itemCart.length; i++) {

            if (options.productId === itemCart[i].id) {
                // if (options.plus === 1) {
                if (options.plus === 1) {
                    itemCart[i].quantity++;
                    debugger
                    totalProduct += itemCart[i].quantity * itemCart[i].pricePart;
                } else {
                    if (itemCart[i].quantity > 1) {
                        itemCart[i].quantity--;
                        totalProduct = itemCart[i].quantity * itemCart[i].pricePart;
                    }
                }
            } else {
                totalRestProd += itemCart[i].quantity * itemCart[i].pricePart
            }
            debugger
            commit('setCartItems', itemCart)
        }
        debugger
        // if (totalProduct !== 0) {
        if (totalProduct === 0 || totalProduct !== 0) {
            debugger
            x = totalProduct + totalRestProd;
            commit('setCartTotal', x)
            database.createMyTotalCart({entity: `${enti}/${window.user.uid}/cartTotal`, item: x})
                .then(() => {
                    debugger
                    return total = x;
                })
        } else {
            x = dispatch('getCartTotal')
        }
        totalProduct = 0;
        totalRestProd = 0;
        x = 0;
        // database.update({entity: 'carts', id:})
        debugger
    },

    getItemById: async ({state, commit}) => {
        let item = {};
        debugger
        await carsDatabase.getItem({entity: 'items/privateUserItems', id: state.editedItemId});
        debugger
    }
}