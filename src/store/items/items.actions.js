import database from "../../middleware/firebase/database";
import firebaseDatabase from "../../middleware/firebase/database";
import storageDB from "../../middleware/firebase/storage";
import carsDatabase from "../../middleware/firebase/database/cars";

export default {
    getItems: async ({commit}) => {
        const items = await database.get({entity: 'items'});
        commit('setItems', items)
    },

    deleteItem: async ({state, commit}) => {
        await firebaseDatabase.remove({entity: 'items', id: state.editedItemId})
        await storageDB.deleteImg({imageName: state.editedItemId})

        // const itemId = state.editedItemId;
        commit('deleteItem', state.editedItemId)
        commit('resetEditedItemId')
    },

    updateItem: async ({state, commit}) => {
        const item = {};
        Object.assign(item, state.editedItem)
        item.id = state.editedItemId;
        // Saves in DB
        await database.update({entity: 'items', id: item.id, item})

        // Saves in store
        commit('resetEditedItem')
        commit('resetEditedItemId')
        commit('editedItem', item)
    },

    insertItem: ({state, commit}) => {
        const item = {};
        Object.assign(item, state.editedItem);
        // Saves in DB
        database.generateId({entity: 'Test'})
            .then(id => {
                // debugger
                storageDB.uploadImg({imageName: id, file: item.image})
                    .then(url => {
                        item.url = url;
                        // debugger
                        console.log(url);
                        item.imgName = id
                        database.create({entity: 'items', item, id: item.imgName})
                            .then(async () => {
                                item.id = id
                                await database.updateUser({
                                    entity: 'users',
                                    subEntity: 'itemsId',
                                    item: {[id]: item.id}
                                });
                                commit('resetEditedItem')
                                commit('insertItem', item)
                            })
                    })
            })
    },

    setEditItemById: async ({state, commit}) => {
        let item = {};
        if (state.items.length && state.items.find(item => item.id === state.editedItemId)) {
            item = state.items.find(item => item.id === state.editedItemId);
        } else {
            item = await database.getById({entity: 'items', id: state.editedItemId})
        }
        commit('setEditedItem', item);
    },

    getUserDetails: async ({state, commit}) => {
        const userDetails = await carsDatabase.getCards({entity: 'users'});
        let arr = [];
        let myItems = [];

        if (state.items.length > 0) {
            // for (let key in state.items) {
            //     if (state.items[key].id === userDetails.itemsId) {
            //         arr.push(state.items)
            //     }
            // }
            for (let i = 0; i < state.items.length; i++) {
                for (let j = 0; j < userDetails.itemsId.length; j++) {
                    if (state.items[i].id === userDetails.itemsId[j]) {
                        myItems.push(state.items[i]);
                    }
                }
            }
        } else {
            const items = await database.get({entity: 'items'});
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < userDetails.itemsId.length; j++) {
                    if (items[i].id === userDetails.itemsId[j]) {
                        myItems.push(items[i]);
                    }
                }
            }
        }
        // // debugger
        // let cards = [];
        // // let item = undefined;
        // // for (let key in items) {
        // //     // debugger
        // //     item = items[key];
        // // }
        // // for (let itemKey in item) {
        // //     myItems.push(item[itemKey]);
        // // }
        // for (let i = 0; i < state.myItems.length; i++) {
        //     for (let j = 0; j < myItems.length; j++) {
        //         if (state.myItems[i].id === myItems[j]) {
        //             cards.push(state.myItems[i]);
        //         }
        //     }
        // }
        commit('setMyItems', myItems)
        //
        // arr.push(cards);
        //
        //
        // commit('setEditedItemId', myItems)
        // commit('setItems', myItems)
        // console.log(items)
        // debugger
    },

    getInfoCards: async ({state, commit}) => {
        const items = await carsDatabase.getCards2({entity: 'items', itemId: state.editedItemId})
        commit('setItems', items)
    }

}