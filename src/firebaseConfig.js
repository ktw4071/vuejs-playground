import firebase from 'firebase'
import 'firebase/firestore'

const config = require('./firebaseConfig_Credentials.js')

// Create firebaseConfig_Credentials.js that contains the following for Firebase API Config

// const  config = {
//     apiKey: "Your API Key",
//     authDomain: "Your Domain",
//     databaseURL: "Your Database",
//     projectId: "Your Project ID",
//     storageBucket: "Your Bucket",
//     messagingSenderId: "Your Sender ID"
//   };
// export {
// 	config
// }

firebase.initializeApp(config.config)

//database reference
const db = firebase.firestore()

//arrayUnion
// const au = firebase.firestore.FieldValue.arrayUnion

//authentication reference
const auth = firebase.auth()
const currentUser = auth.currentUser

//storage reference
const storage = firebase.storage()
const storageRef = storage.ref()


const settings = {
	timestampsInSnapshots: true
}

db.settings(settings)


const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const picturesCollection = db.collection('pictures')
const userPicturesCollection = db.collection('user_pictures')

export {
	firebase,
	db,
	auth,
	storageRef,
	currentUser,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection,
	picturesCollection,
	userPicturesCollection
}