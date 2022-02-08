import firebaseInstance from '../'

export default {
    get,
    getMyGroup,
    getTokeno,
    getMyNotifications,
    getGroups,
    create,
    createMyTotalCart,
    remove,
    removeCartId,
    removeNotifications,
    removePost,
    update,
    getById,
    createUser,
    generateId,
    getRef,
    updateUser,
    updatePost,
    getCartIt,
    getSumComm,
    updateUserPost,
    updateUserItem,
    updateCommentsPost,
    updateCommentToComments,
    updateCommentToCommentsPostSum,
    updateSumComments,
    updateUserGroups,
    updateUserToken,
    updateGroups,
    updateNotifications,
    createPost
}

firebaseInstance.firebase.database().ref(`items`)
    .on('child_changed', (snapshot) => {
    });

function get(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
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

function getCartIt(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            const arr = [];
            let item = undefined;
            const map = res.val();
            for (const Key in map) {
                 item = map[Key];
                // item.id = Key;
                arr.push(item);

            }
            if (item === undefined) {
                debugger
                arr.push(map);
            }
            return arr;
        })
}

function getSumComm(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            const arr = [];
            const result = res.val();
            return result;
        })
}

function getMyGroup(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            const arr = [];
            const map = res.val();
            for (const Key in map) {
                const item = map[Key];
                arr.push(item);
            }
            return arr;
        })
}

function getMyNotifications(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            const arr = [];
            const map = res.val();
            for (const Key in map) {
                const item = map[Key];
                arr.push(item);
            }
            return arr;
        })
}

function getTokeno(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            // const arr = [];
            const map = res.val();
            // let item = '';
            // for (const Key in map) {
            //     item = map[Key];
            //     // arr.push(item);
            // }
            return map;
        })
}

function getGroups(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            debugger
            // המרה ל - firebase
            const arro = [];
            const map = res.val();
            for (const Key in map) {
                map[Key].id = Key;
                const item = map[Key];
                arro.push(item);
            }
            return arro;
        })
}

function create(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.item)
}

function createMyTotalCart(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).set(options.item)
}

function createPost(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.post)
}

function generateId(options) {
    // debugger
    return firebaseInstance.firebase.database().ref(options.entity).push()
        .then(res => {
            console.log(res.key)
            return res.key
        })
}

function createUser(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}`).update(options.details);
}

function updateUserItem(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}/${options.subEntity}`).update(options.item);
}

function updateUser(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entiti}/${window.user.uid}/${options.subEntity}`).update(options.itemx);
}

function updateUserPost(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}/${options.subEntity}`).update(options.post);
}

function updateCommentsPost(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.postId}/${options.subEntity}`).update(options.post);
}

function updateCommentToCommentsPostSum(options) {
    // debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.postId}/${options.subEntity}/${options.CommentId}/${options.subEntity2}`).set(options.post);
}

function updateCommentToComments(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.postId}/${options.PostComments}/${options.CommentId}/${options.subEntity}`).update(options.post);
}

function updateSumComments(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).set(options.post);
}

function updateNotifications(options) {
    // debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).update(options.notification);
}

function updateUserToken(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).set(options.token);
}

function updateGroups(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).update(options.post);
}

function updateUserGroups(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}/${options.subEntity}`).update(options.post);
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.item)
        .then(res => {
            // debugger
            console.log(options.item);
        });
}

function updatePost(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.post)
        .then(res => {
            debugger
            console.log(options.post);
        });
}

function remove(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).remove()
}

function removeCartId(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}/${options.subEntity}/${options.id}`).remove()
}

function removeNotifications(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).remove()
}

function removePost(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).remove()
}

function getById(options) {
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then((res) => {
            debugger
            let allobj = res.val()
            for (let obj in allobj) {
                // debugger
                if (obj === options.id) {
                    // debugger
                    res = allobj[obj];
                    debugger
                    return res;
                }
            }
        });
}

function getRef(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
}



