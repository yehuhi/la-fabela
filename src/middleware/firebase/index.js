import firebase from "firebase/compat";

firebase.initializeApp({
    apiKey: "AIzaSyB-cRcBfXci3DW60ySKZH-zt-g5JVMZ2aw",
    authDomain: "la-fabela.firebaseapp.com",
    projectId: "la-fabela",
    storageBucket: "la-fabela.appspot.com",
    messagingSenderId: "159781369090",
    appId: "1:159781369090:web:95b42b90c8bd9c04a73e1b",
    databaseURL: "https://la-fabela-default-rtdb.europe-west1.firebasedatabase.app/"
});

var storage = firebase.storage();


export default {
    firebase,
    storage
};