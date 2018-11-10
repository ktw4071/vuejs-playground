<template>
	<section>
  <div class="col1">
   
   	<h2 align="center">Pictures from Google</h2><br>

    <div>
    	<el-carousel :interval="4000" type="card" height="400px">
		    <el-carousel-item v-for="picture in pictures_google" :key="picture">
		    	<v-lazy-image v-bind:src="picture" />		      
		    </el-carousel-item>
	  	</el-carousel>
    </div>	
    <br>


    <div class="bigspace"></div>

    <h2 align="center">Pictures from Firebase Storage</h2><br>
    <div>
    	<el-carousel :interval="4000" type="card" height="400px">
		    <el-carousel-item v-for="picture in pictures" :key="picture">
		    	<v-lazy-image v-bind:src="picture" />		      
		    </el-carousel-item>
	  	</el-carousel>
    </div>	

    <div class="bigspace"></div>
    <h2 align="center">Make Your Own Photo Album!</h2><br>


    <div align="center">
      <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
      <el-button @click="$refs.fileInput.click()" type="primary">File</el-button> 
      <el-button @click="userUploadPicture" type="success">Upload picture</el-button> <br><br>

      <div align="center" class="progress_bar" > 
      <el-progress :percentage="loading_process" status="success"></el-progress>
      </div>
    </div>



    
    <br><br>
    
    <div v-if="user_pictures.length">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="user_picture in user_pictures" :key="user_picture">
          <v-lazy-image v-bind:src="user_picture" />         
        </el-carousel-item>
      </el-carousel>
    </div>

    <div v-else>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 3" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>

    </div>  
  
  </div>
  </section>
</template>

<style scoped>

.progress_bar {
  width: 30%;
}

.v-lazy-image {
  width: 100%;
}
.bigspace {
  width: 1px;
  height: 300px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>


<script>
	import {mapState} from 'vuex'
	import VLazyImage from "v-lazy-image"
  import axios from 'axios'

  const fb = require('../firebaseConfig.js')
  // console.log("pictures" + pictures)
 //  console.log("user_pictures" + pictures)
	// console.log("currentUserUID" + pictures)
    export default {
    	data(){
    		return {
    			pictures_google: [
    			"https://assets.rbl.ms/14356454/980x.jpg",
    			"https://images.pexels.com/photos/1039302/pexels-photo-1039302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    			"https://images.pexels.com/photos/547119/pexels-photo-547119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    			"https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    			"https://www.cbc.ca/kidscbc2/content/the_feed/animals_polarbear-min.jpg"
    			],
          selectedFile: null,
          loading_process: 0
    		}
    	},
      components: {
            VLazyImage
      },

      computed: {
    		...mapState(['pictures', 'user_pictures', 'currentUser'])
    	},

      methods: {
        onCurrentUser(){
          // console.log("CLICK UID" + currentUserUID )
          // console.log("pictures" + pictures)
          var forestRef = fb.storageRef.child('images/forest.jpg');
          forestRef.getMetadata().then(function(metadata) {
            // Metadata now contains the metadata for 'images/forest.jpg'
            console.log("META DATA" + metadata)
          }).catch(function(error) {
            // Uh-oh, an error occurred!
          })
        },
        onFileSelected(event){
          this.selectedFile = event.target.files[0]
          console.log(this.selectedFile)
          this.$message({
            showClose: true,
            message: 'File Selected! - ' + this.selectedFile.name,
            type: 'primary'
          })
        },
        onUpload(){
          if(this.selectedFile.name){
            this.$message({
                showClose: true,
                message: 'Select your picture first!',
                type: 'error'
              })
          }
          const fd = new FormData();
          fd.append('image', this.selectedFile, this.selectedFile.name)
          axios.post('https://us-central1-vuejs-beea9.cloudfunctions.net/userUploadFile', fd, {
            // onUploadProgress: progressEvent => {
            //   this.progress_percent = progressEvent.loaded / progressEvent.total
            // }

          })
          .then(res => {
            console.log(res)
            if(res.status == 200){
            //   db.collection("user_pictures").doc(this.CurrentUser.uid).set({
            //   img_url = 
            // })
            

              this.$message({
                showClose: true,
                message: 'Thank you for uploading picture',
                type: 'success'
              })
            }
            else{
              this.$message({
                showClose: true,
                message: 'Oops, Failed to upload picture',
                type: 'error'
              })
            }
          })            
          },
          userUploadPicture(){
            if(this.selectedFile == null){
            this.$message({
                showClose: true,
                message: 'Select your picture first!',
                type: 'error'
              })            
            }

            else{              
              const loading = this.$loading({
                lock: true,
                text: 'Uploading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })

              const ref = fb.storageRef.child('user/' + this.currentUser.uid + '/' + this.selectedFile.name)

              ref.put(this.selectedFile)      
              .then(snapshot => {                
                this.$message({
                  showClose: true,
                  message: 'Thank you for uploading picture',
                  type: 'success'
                })
                loading.close();
                console.log('Uploaded file!');

                snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                  console.log('File available at', downloadURL);              
                  const addImageURL = fb.userPicturesCollection.doc(this.currentUser.uid)
                  addImageURL.update({
                    img_array: fb.firebase.firestore.FieldValue.arrayUnion(downloadURL)
                  })
                })
                .catch(error => {
                  console.log("What is error? : " + error)
                  this.$message({
                  showClose: true,
                  message: 'Oops, Failed to upload picture',
                  type: 'error'
                })
              })
            })              
          }
        }
      }
    }
</script>