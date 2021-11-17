import firebaseInstance from '../'

let refX = '';

function uploadImg(options) {
    // let imagRef = await firebaseInstance.firebase.storage().ref().child('images')
    // let specificImg = await imagRef.child(`cards/` + options.imageName).put(options.file)
    // specificImg.ref.getDownloadURL()
    //     .then((url) => {
    //         console.log(url)
    //         return url;
    //     })
    return firebaseInstance.firebase.storage().ref().child('images/cards/' + options.imageName).put(options.file) // uploading
        .then(res => {
            // debugger
            return res.ref.getDownloadURL() // downloading
                .then(url => {
                    return url
                })
        })
}

function deleteImg(options) {
    // debugger
    return firebaseInstance.firebase.storage().ref().child('images/cards/' + options.imageName).delete()
        .then(() => {
            console.log('מחיקה בוצע בהצלחה')
        }).catch((error) => {
            console.error(error);
        });
}

export default {
    uploadImg,
    deleteImg
}