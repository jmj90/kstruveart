import firebase from 'firebase'

// import admin from 'firebase-admin';

const FIREBASE_SECRET = process.env.FIREBASE_SECRET

var config = {
  apiKey: "AIzaSyDM_3-3xpwt5F4OAquJnrT_gzXmJSpjFUY",
  authDomain: "kstruve-fineart.firebaseapp.com",
  databaseURL: "https://kstruve-fineart.firebaseio.com",
  projectId: "kstruve-fineart",
  storageBucket: "kstruve-fineart.appspot.com",
  messagingSenderId: "121487753961"
};
firebase.initializeApp(config);


// admin.initializeApp({
//   credential: admin.credential.cert({
//    projectId: 'kstruve-fineart',
//    clientEmail: 'jakej.dev@gmail.com',
//    privateKey: FIREBASE_SECRET
//  }),
//   databaseURL: "https://kstruve-fineart.firebaseio.com"
// });


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();



export default firebase
