import firebase from "firebase";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_apiKey}`,
  authDomain: "another-realtime-chat.firebaseapp.com",
  databaseURL: "https://another-realtime-chat.firebaseio.com",
  projectId: "another-realtime-chat",
  storageBucket: "another-realtime-chat.appspot.com",
  messagingSenderId: "425002084325",
  appId: "1:425002084325:web:3b8ea07b932d5f5f9cf10c",
  measurementId: "G-LC4LRG8YWQ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
