import firebase from 'firebase'
import 'firebase/firestore'

const  config = {
    apiKey: "AIzaSyCUhG0TBAbYLuyLBeC6TWCt8E4X4nI_8Tc",
    authDomain: "vuejs-beea9.firebaseapp.com",
    databaseURL: "https://vuejs-beea9.firebaseio.com",
    projectId: "vuejs-beea9",
    storageBucket: "gs://vuejs-beea9.appspot.com",
    messagingSenderId: "478227863483"
  };

firebase.initializeApp(config)

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