const firebase = require('firebase/app');

// firebase services
require('firebase/auth');
require('firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyABr6Z9iTrM62xpqWWnno-P2fiPVMBj5eA',
  authDomain: 'mitranetra-1234.firebaseapp.com',
  databaseURL: 'https://mitranetra-1234.firebaseio.com',
  projectId: 'mitranetra-1234',
  storageBucket: 'mitranetra-1234.appspot.com',
  messagingSenderId: '10603497416',
  appId: '1:10603497416:web:db504911852f1f519122fd',
  measurementId: 'G-KRXRPY012G',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export default firebase;
module.exports = firebase;
