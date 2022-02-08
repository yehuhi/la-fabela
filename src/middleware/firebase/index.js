import firebase from "firebase/compat";
import "firebase/messaging"
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyB-cRcBfXci3DW60ySKZH-zt-g5JVMZ2aw",
    authDomain: "la-fabela.firebaseapp.com",
    databaseURL: "https://la-fabela-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "la-fabela",
    storageBucket: "la-fabela.appspot.com",
    messagingSenderId: "159781369090",
    appId: "1:159781369090:web:95b42b90c8bd9c04a73e1b"
});

const storage = firebase.storage();
const messaging = firebase.messaging();

export default {
    firebase,
    // messaging
};