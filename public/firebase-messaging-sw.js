// firebase-messaging-sw.js
// import firebase from "firebase/app";
// import "firebase/messaging"
// import {getMessaging} from "firebase/messaging";

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

try {
    firebase.initializeApp({
        apiKey: "AIzaSyB-cRcBfXci3DW60ySKZH-zt-g5JVMZ2aw",
        authDomain: "la-fabela.firebaseapp.com",
        projectId: "la-fabela",
        storageBucket: "la-fabela.appspot.com",
        messagingSenderId: "159781369090",
        appId: "1:159781369090:web:95b42b90c8bd9c04a73e1b",
        databaseURL: "https://la-fabela-default-rtdb.europe-west1.firebasedatabase.app/"
    });

    const messaging = firebase.messaging();
    // messaging.setBackgroundMessageHandler(function (payload) {
    messaging.onBackgroundMessage(function (payload) {
        debugger
        const title = payload.data.userName;
        let iconPath = 'https://media.istockphoto.com/vectors/vector-car-spares-concept-with-disk-brake-vector-id488844774?k=20&m=488844774&s=612x612&w=0&h=yiL4mnkFFAN5TNrqfOX-0WskE20mBSahOXTRye6xo3o=';
        console.log(payload, 'messaging-sw');
        const options = {
            title: payload.notification.title,
            body: payload.notification.body,
            icon: "https://media.istockphoto.com/vectors/vector-car-spares-concept-with-disk-brake-vector-id488844774?k=20&m=488844774&s=612x612&w=0&h=yiL4mnkFFAN5TNrqfOX-0WskE20mBSahOXTRye6xo3o=",
            link: `https://la-fabela.web.app/#/insta/${id}`
        };
        return self.registration.showNotification(title, options, iconPath);
    })
} catch (err) {
    console.error()
}

