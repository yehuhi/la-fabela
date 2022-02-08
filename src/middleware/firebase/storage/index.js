import firebaseInstance from '../'

export default {
    uploadImg,
    deleteImg
}

function uploadImg(options) {
    debugger
    return firebaseInstance.firebase.storage().ref().child('images/cards/' + options.imageName).put(options.file) // uploading
        .then(res => {
            debugger
            return res.ref.getDownloadURL() // downloading
                .then(url => {
                    return url
                })
        })
}

function deleteImg(options) {
    return firebaseInstance.firebase.storage().ref().child('images/cards/' + options.imageName).delete()
        .then(() => {
            console.log('מחיקה בוצע בהצלחה')
        }).catch((error) => {
            console.error(error);
        });
}

