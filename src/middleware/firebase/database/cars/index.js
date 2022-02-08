import firebaseInstance from '../../';

export default {
    getCards,
    getCards2,
    getItem
}

function getItem(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).once('value')
        .then(res => {
            debugger
            // המרה ל - firebase
            const data = res.val();
            data.id = res.key
            let itemsId = []
            for (let key in data.itemsId) {
                itemsId.push(key)
            }
            data.itemsId = itemsId
            return data;
        }).catch(err)
    {
        console.error(err);
    }
}

function getCards(options, flag) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}`).once('value')
        .then(res => {
            debugger
            // המרה ל - firebase
            const data = res.val();
            if (data) {
                data.id = res.key
                let itemsId = []
                for (let key in data.itemsId) {
                    itemsId.push(key)
                }
                data.itemsId = itemsId
                return data;
            }
            return false;
        })
}

function getCards2(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once('value')
        .then(res => {
            // המרה ל - firebase
            const arr = [];
            const data = res.val();
            for (let key in data) {
                let item = key;
                if (item === options.itemId) {
                    arr.push(data[key]);
                }
            }
            return arr;
        })
}
