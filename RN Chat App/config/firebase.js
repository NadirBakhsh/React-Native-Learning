import * as firebase from 'firebase'
//import * as Facebook from 'expo-facebook';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA3xU8tYGd6hwbvtiOyPSsjuVoQo0rldjo",
    authDomain: "exponativechat.firebaseapp.com",
    databaseURL: "https://exponativechat.firebaseio.com",
    projectId: "exponativechat",
    storageBucket: "exponativechat.appspot.com",
    messagingSenderId: "481094656460",
    appId: "1:481094656460:web:27f40a47f7ffcc74"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

var f_id;
var u_id;


function register(email, password, username) {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then(user => {
            db.collection("users").doc(user.user.uid).set({ email, createdAt: Date.now(), username }).then(() => {
                resolve({ message: "Registration successfully" })
            })
                .catch((e) => {
                    reject(e)
                })
        })
            .catch((e) => {
                reject(e)
            })
    })
}


function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}





function getAllUsers() {
    const arr = []
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((e) => {
            var userId = firebase.auth().currentUser.uid;
            u_id = firebase.auth().currentUser.uid;
            e.forEach((elem) => {
                if (userId !== elem.id) {
                    arr.push({
                        data: elem.data(),
                        _id: elem.id
                    })
                }

            })
            resolve(arr)

        })
    })
}


function logout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  
  }

function getStory() {
    let mystr = []
    return new Promise((resolve, reject) => {
        db.collection("story").get().then((e) => {
            e.forEach((elem) => {
                mystr.push(elem.data())
            })
            resolve(mystr)
        })
    })
}


function addStory(e,name) {
    let currentUser = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
        db.collection("story").doc(currentUser.uid).set({ story: e, createdAt: Date.now(), uid: currentUser.uid, username: name }).then(() => {
            resolve({ message: "Story added" })
        })
            .catch((e) => {
                reject(e)
            })
    })
}


function createRoom(friendId) {
    f_id = friendId
    const userId = firebase.auth().currentUser.uid
    let chatExists = false;

    return new Promise((resolve, reject) => {
        db.collection('chatrooms')
            .where('users.' + userId, '==', true)
            .where('users.' + friendId, '==', true).get().then(snapshot => {
                snapshot.forEach(elem => {
                    chatExists = { data: elem.data(), _id: elem.id };
                })
                if (!chatExists) {
                    const obj = {
                        createdAt: Date.now(),
                        users: {
                            [friendId]: true,
                            [firebase.auth().currentUser.uid]: true
                        }
                    }
                    db.collection('chatrooms').add(obj).then(snapshot => {
                        resolve({ data: obj, _id: snapshot.id })
                    })
                } else {
                    resolve(chatExists);
                }
            })
    })
}




function sendMessageToDb(message, roomId) {
    message[0].createdAt = Date.now();
    message[0]._id = f_id;
    const obj = {
        message,
    }
  db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
}


function getMyUid() {
    let currentUser = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
        db.collection("users").doc(auth.currentUser.uid).get().then((e) => {
            resolve(e.data())
        })
            .catch((e) => {
                reject(e)
            })
    })
}




export {
    register,
    login,
    getAllUsers,
    createRoom,
    sendMessageToDb,
    u_id,
    addStory,
    getStory,
    getMyUid,
    logout
  
}