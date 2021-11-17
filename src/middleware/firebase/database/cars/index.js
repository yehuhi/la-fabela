import firebaseInstance from '../../';

function getCards(options, flag) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}`).once('value')
        .then(res => {
            // המרה ל - firebase
            const data = res.val();
            data.id = res.key
            let itemsId = []
            for (let key in  data.itemsId) {
                itemsId.push(key)
            }
                // let itemx = data[key]
                // itemx.id = key;
                // let itemUser = data[key];
                // // debugger
                // if (!flag && (itemx.id === window.user.uid)) {
                //     arr.push(item);
                // }
                // if (flag && (itemx.id === window.user.uid)) {
                //     arr.push(itemUser);
                // }
            // }
            // debugger
            data.itemsId = itemsId
            return data;
        })
}

function getCards2(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once('value')
        .then(res => {
            // debugger
            // המרה ל - firebase
            const arr = [];
            const data = res.val();
            for (let key in data) {
                let item = key;
                if (item === options.itemId) {
                    arr.push(data[key]);
                }
                // arr.push(item);
            }
            return arr;
        })
}

export default {
    getCards,
    getCards2
}
