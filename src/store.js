import Vue from 'vue'
import Vuex from 'vuex'

const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// Prevent navigation is being disappeared after reloading  
fb.auth.onAuthStateChanged(user => {
    if (user) {
    	console.log("UID: " + user.uid)
    	console.log("USER whole: " + user)
    	console.log("JSON TO STRIN for beginning" + JSON.stringify(user))
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
        store.commit('setCurrentUserUID', user.uid)

        //realtime updates from posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
        	let createdByCurrentUser
        	// is the post by the login user?
        	// console.log("-------" + querySnapshot.docs.length)
        	// console.log("+++++++" + querySnapshot.docChanges()[0])
        	// console.log("0000000 " + querySnapshot.docChanges()[0].doc.data().userId)

        	if(querySnapshot.docs.length){
        		createdByCurrentUser = store.state.currentUser.uid == querySnapshot.docChanges()[0].doc.data().userId ? true : false
        	}

        	// add the new post to hiddenposts array
        	if(querySnapshot.docChanges().length !== querySnapshot.docs.length && querySnapshot.docChanges()[0].type == 'added' && !createdByCurrentUser){
        		let post = querySnapshot.docChanges()[0].doc.data()
        		post.id = querySnapshot.docChanges()[0].doc.id

        		store.commit('setHiddenPosts', post)
        	}else {
        		let postsArray = []

				querySnapshot.forEach(doc => {
					let post = doc.data()
					post.id = doc.id
					postsArray.push(post)
				})
				// console.log("beginning array: " + postsArray)
				// console.log("JSON TO STRIN for beginning" + JSON.stringify(postsArray[0]))
				store.commit('setPosts', postsArray)	
        	}
		}) 

		fb.picturesCollection.onSnapshot(querySnapshot => {
			console.log("-------" + querySnapshot.docs.length)
			let picturesArray = []
			querySnapshot.forEach(doc => {
				console.log("data" + doc.data())
				let picture = doc.data()
					console.log("doc id" + doc.id)
					picture.id = doc.id
					console.log("doc id url" + doc.id.img_url)
					picturesArray.push(picture.img_url)
			})
			console.log("What is in picture array? " + picturesArray)
			store.commit('setPictures', picturesArray)
		})

		fb.userPicturesCollection.doc(user.uid).onSnapshot(doc => {
			console.log("user picture array" + doc.data().img_array)
			let user_pictures = []

			doc.data().img_array.forEach(user_picture => {
				user_pictures.push(user_picture)
			})
			// querySnapshot.forEach(doc => {
			// 	console.log("data" + doc.data())
			// 	let picture = doc.data()
			// 		console.log("doc id" + doc.id)
			// 		picture.id = doc.id
			// 		console.log("doc id url" + doc.id.img_url)
			// 		user_pictures.push(picture.img_url)
			// })
			console.log("What is in user picture array? " + user_pictures)
			store.commit('setUserPictures', user_pictures)
		})

		
    }
})


export const store = new Vuex.Store({
	state: {
		currentUser: null,
		userProfile: {},
		posts: [],
		hiddenPosts: [],
		pictures: [],
		user_pictures: [],
		currentUserUID: null
	},
	actions: {
		clearData({commit}){
        		commit('setCurrentUser', null)
        		commit('setUserProfile', {})
        		commit('setPosts', null)
        		commit('setPictures', null)
        		commit('setUserPictures', null)
        	},

        // After learning UID, fecthing Userprofil information using the UID
		fetchUserProfile({commit, state}){
				console.log("Fetch state.currentUser.uid: " + state.currentUser.uid)
				console.log("fb.usersCollection.doc(state.currentUser.uid).get(): " + fb.usersCollection.doc(state.currentUser.uid).get())
				fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
					commit('setUserProfile', res.data())
					console.log("res.data()111: " + res.data());
				}).catch(err => {
					console.log("store" + err)
				})
				// fb.usersCollection.doc(state.currentUser.uid).get().then(function(doc) {
    //             if (doc.exists) {
    //                 console.log("Document data:", doc.data());
    //             } else {
    //                 // doc.data() will be undefined in this case
    //                 console.log("No such document!");
    //             }
	   //          }).catch(function(error) {
	   //              console.log("Error getting document:", error);
	   //          });

			}
		},
	mutations: {
		setCurrentUser(state, val){
			state.currentUser = val
		},
		setCurrentUserUID(state, val){
			state.currentUserUID = val
		},
		setUserProfile(state, val){
			state.userProfile = val
		},
		setPosts(state, val){
			if(val){
				state.posts = val
			}
			else{
				state.posts = []
			}
		},
		setHiddenPosts(state, val){
			if(val){
				if(!state.hiddenPosts.some(x => x.id === val.id)){
					state.hiddenPosts.unshift(val)
				}
			}
			else{
				state.hiddenPosts = []
			}
		},
		setPictures(state, val){
			if(val){
				state.pictures = val
			}
			else{
				state.pictures = []
			}
		},
		setUserPictures(state, val){
			if(val){
				state.user_pictures = val
			}
			else{
				state.user_pictures = []
			}
		}
	}
})