import firebaseInstance from '../'
import database from "firebase/database";
import firebase from "firebase/compat";

firebaseInstance.firebase.database().ref(`items`)
    .on('child_changed', (snapshot) => {
        // debugger
    });

function get(options) {
    // return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once(`value`)
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            // המרה ל - firebase
            const arr = [];
            const map = res.val();
            for (const Key in map) {
                const item = map[Key];
                item.id = Key;
                arr.push(item);
            }
            return arr;
        })
}

function create(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.item)
}

function generateId(options) {
    return firebaseInstance.firebase.database().ref(options.entity).push()
        .then(res => {
            console.log(res.key)
            return res.key
        })
}

function createUser(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}`).update(options.item);
}

function updateUser(options) {
    return firebaseInstance.firebase.database()
        .ref(`${options.entity}/${window.user.uid}/${options.subEntity}`).update(options.item);
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.item)
        .then(res => {
            console.log(options.item);
        });
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).remove()
}

function getById(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then((res) => {
            let allobj = res.val()
            for (let obj in allobj) {
                if (obj === options.id) {
                    res = allobj[obj];
                    return res;
                }
            }
        });
}

function getRef(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
}


export default {
    get,
    create,
    remove,
    update,
    getById,
    createUser,
    generateId,
    getRef,
    updateUser
}

// getUserData();
// create();