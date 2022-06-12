import firebase from "firebase";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyBzS3Q4E1kTegQjiWakxlA9VBHL5dLpBIY",
  authDomain: "e-commerce-59032.firebaseapp.com",
  projectId: "e-commerce-59032",
  storageBucket: "e-commerce-59032.appspot.com",
  messagingSenderId: "272863745189",
  appId: "1:272863745189:web:cea09464bacb6cb735e94c",
  measurementId: "G-1S0VBB8H0T",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storge = firebase.storage();
// const limit = db.collection("products").limit()
// // console.log(limit.startAfter(2));
// const dataa = db.collection("products").limit(1).get().then((res) => {
//   res.docs.forEach((e) => {
//    console.log(e.data()); 
//   })
// })

// console.log(dataa);
// export utils/refs
export { db, auth, storge };
