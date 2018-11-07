/* eslint-disable */
<template>
    <div id="login">
    	<transition name="fade">
    		<div v-if="performingRequest" class="loading">
    			<p>Loading...</p>
    		</div>
    	</transition>
        <section>

            <div class="col1">
	                <h1>Playground</h1>
	                <p style="margin-bottom:10px;">Welcome to the <a href="https://github.com/ktw4071" target="_blank">Taewoo Kim</a>'s Playground! social media web app powered by <a href="https://vuejs.org/" target="_blank">Vue.js</a> and <a href="https://firebase.google.com/" target="_blank">Firebase</a>.
	                    Come visit my Github to check out more projects like this!</p>
	                    <a href="https://github.com/ktw4071" target="_blank"><img  style="margin-top: 15px"align="top" src="../assets/icon-github.png" height="65px" width="65px"></a>
	                    <a href="https://www.linkedin.com/in/taewookimit" target="_blank"><img  style="margin-left: 15px" align="top" src="../assets/linkedin_logo.png" height="90px" width="90px"></a>
	                    <a href="mailto:taewookimit@gmail.com" target="_blank"><img  style="margin-top: 23px; margin-left: 13px;"align="top" src="../assets/email.png" height="50px" width="50x"></a>
            </div>
            <!-- <p>test</p> -->
                 <div class="col2" :class="{ 'signup-form': !showLoginForm  }">
              	  	<form v-if="showLoginForm" @submit.prevent>
	                    <h1>Welcome Back</h1>

	                    <label for="email1">Email</label>
	                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

	                    <label for="password1">Password</label>
	                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

	                    <button @click="login" class="button">Log In</button>

	                    <div class="extras">
	                        <a @click="togglePasswordReset">Forgot Password</a>
	                        <a @click="toggleForm">Create an Account</a>
	                    </div>

            		</form>

	                <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
					    <h1>Get Started</h1>


					    <label for="name">Name</label>
					    <input v-model.trim="signupForm.name" type="text" placeholder="Enter your name" id="name" />

					    <label for="title">Company</label>
					    <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

					    <label for="email2">Email</label>
					    <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

					    <label for="password2">Password</label>
					    <input v-model.trim="signupForm.password" type="password" placeholder="We don't save your password :-)" id="password2" />

					    <button @click="signup" class="button">Sign Up</button>

					    <div class="extras">
					        <a @click="toggleForm">Back to Log In</a>
					    </div>
					</form>

					<form style="margin-top: 80px" v-if="showForgotPassword" @submit.prevent class="password-reset">
	                	<div v-if="!passwordResetSuccess">
	                		<h1>Reset Password</h1>
	                		<p>We will send you an email to reset your passwords</p>

	                		<label for="email3">Email</label>
	                		<input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3">

	                		<button @click="resetPassword" class="button">Submit</button>

	                		<div class="extras">
	                			<a @click="togglePasswordReset">Back to Log In</a>
	                		</div>
	                	</div>
	                	<div v-else>
	                		<h1>Email Sent</h1>
	                		<p>Check your email for a Link to reset your password</p>
	                		<button @click="togglePasswordReset" class="button">Back to Login</button>
	                	</div>
	                </form>	        

					<transition name="fade">
			    		<div v-if="errorMsg != ''" class="error-msg">
			    			<p>{{errorMsg}}</p>
			    		</div>
			    	</transition>

			    	<form>
			    	<a href="https://vuejs.org/" target="_blank"><img  style=" margin-top: 40px; " align="top" src="../assets/vuejs_logo.png" height="90px" width="90px"></a>
	                <a href="https://firebase.google.com/" target="_blank"><img  style=" margin-top: 52px"align="top" src="../assets/firebase.png" height="65px" width="65px"></a>
	            	</form>
            </div>
        </section>
    </div>
</template>

<script>
	const fb = require('../firebaseConfig.js')

    export default {
    	data(){
    		return {
    			loginForm: {
    				email: '',
    				password: ''
    			},
    			signupForm: {
    				name: '',
    				title: '',
    				email: '',
    				password: ''
    			},
    			passwordForm: {
    				email: ''
    			},

    			showLoginForm: true,
    			performingRequest: false,
    			errorMsg: '',
    			showForgotPassword: false,
    			passwordResetSuccess: false
    		}
    	},

    	methods: {
    		login(){
				fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
						console.log("LOGGINED: " + user.user)
						this.$store.commit('setCurrentUser', user.user)
						console.log("this.$store.state.currentUser.uid: " + this.$store.state.currentUser.uid)
						this.$store.dispatch('fetchUserProfile')
						console.log("this.$store.state.userProfile.uid: " + this.$store.state.userProfile.name)
						this.$router.push('/dashboard')
					}).catch(err => {
					console.log("login" + err)
					this.performingRequest = false
					this.errorMsg =err.message
				})
			},
			signup(){
				this.performingRequest = true

				fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
					this.$store.commit('setCurrentUser', user.user)

					fb.usersCollection.doc(user.user.uid).set({
						name: this.signupForm.name,
						title: this.signupForm.title
					}).then(() => {
						this.$store.dispatch('fetchUserProfile')
						this.performingRequest = false
						this.$router.push('/dashboard')
					}).then(() => {
						 fb.userPicturesCollection.doc(user.user.uid).set({
						 	img_array: []
						 })
					})
					.catch(err => {
						console.log("sign1" + err)
					})
				}).catch(err => {
					console.log("sign2" + err)
					this.performingRequest = false
					this.errorMsg =err.message
				})
			},
			toggleForm(){
				this.showLoginForm = !this.showLoginForm
				this.errorMsg = ''
			},
			togglePasswordReset(){
				this.showLoginForm = !this.showLoginForm
				this.showForgotPassword = !this.showForgotPassword
				this.errorMsg = ''
			},
			resetPassword(){
				this.performingRequest = true
				this.errorMsg = ''

				fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
					this.performingRequest = false
					this.passwordResetSuccess = true
					this.passwordForm.email = ''
					this.errorMsg = ''
				}).catch(err => {
					console.log("resetpwd err: " + err)
					this.performingRequest = false
					this.errorMsg = err.message
				})				
			}
    	}
    }
</script>