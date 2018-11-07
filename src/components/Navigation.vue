<template>
    <header>
        <section>

            <div class="col1">
                <!-- <router-link to="dashboard"><h3>Playground</h3></router-link> -->
               <!--  <ul class="inline">
                    <li><router-link to="charts" class="button">Charts</router-link></li>
                    <li><router-link to="dashboard" class="button">Dashboard</router-link></li>
                    <li><router-link to="settings"  class="button">Settings</router-link></li>
                    <li><button @click="logout" class="button_nav">Logout</button></li>
                </ul> -->



                 <el-row>
                    <router-link  to="dashboard"><h3>Playground</h3></router-link>

                    <el-popover style="margin-left: 5vw" placement="right" width="800" trigger="click" >
                      <el-table :data="gridData">
                        <el-table-column width="120" property="date" label="Date"></el-table-column>
                        <el-table-column width="150" property="task" label="Task"></el-table-column>
                        <el-table-column width="400" property="description" label="Description"></el-table-column>
                        <el-table-column width="100" property="process" label="Process"></el-table-column>
                      </el-table>
                      <el-button type="success" slot="reference">Work History</el-button>
                    </el-popover>

                    <ul class="inline">
                        <li><router-link to="Pictures"><el-button type="primary">Pictures</el-button></router-link></li>
                        <li><router-link to="charts"><el-button type="primary">Charts</el-button></router-link></li>
                        <li><router-link to="dashboard"><el-button type="primary">Dashboard</el-button></router-link></li>
                        <li><router-link to="settings"><el-button type="primary">Settings</el-button></router-link></li>
                        <li><router-link to="charts"><el-button @click="logout" type="danger">Logout</el-button></router-link></li>
                    </ul>
                </el-row>
            </div>
           
        </section>
    </header>
</template>



<script>
	import { mapState } from 'vuex'
    


    const fb = require('../firebaseConfig.js')
    export default {
        data() {
          return {
            gridData: [
            {
              date: 'To be done',
              task: 'To be done',
              description: 'Pagination, Input dataset in charts, Cardview posting with picture, Progress bar on image upload, Drawable navigation bar on the side, CRM style dashboard menu, PWA',
              process: 'To be done'
            },
            {
              date: '2018-10-24',
              task: 'Project Start',
              description: 'Learning about VueJS Framework, and started working with tutorial',
              process: 'Complete'
            }, {
              date: '2018-10-25',
              task: 'Authentication',
              description: 'Firebase Authentication using Email, fixing errors',
              process: 'Complete'
            }, {
              date: '2018-10-26',
              task: 'Firestore - NoSQL Database',
              description: 'Posting on Dashboard, understanding about Vuex(State management library)',
              process: 'Complete'
            }, {
              date: '2018-10-27',
              task: 'Adding Features',
              description: 'View Full posting, Adding comment, Likes',
              process: 'Complete'
            },
            {
              date: '2018-10-28',
              task: 'Adding Plugins',
              description: 'Using plugins - Chartjs, Element-UI, Reading pictures from Storage',
              process: 'Complete'
            },
            {
              date: '2018-10-29',
              task: 'Image Upload',
              description: 'Using NodeJS routing function on Firebase hosting. ImageMagic, Thumbnail, Axios. Uploading images and resizing images were successful. However Firebase storage does not have good documentation for response metadata. This leads to missing information about DownloadURL for uploaded images. Without knowing DownloadURL, image URLs cannot be saved in database to refer the images',
              process: 'Stopped'
            },
            {
              date: '2018-10-30',
              task: 'Photo Album',
              description: 'Instead of using NodeJS routing function, Front-end handled uploading images/saving URL to database as it needs to be by referring API. Downnside is that image resizing cannot be done at serve side.',
              process: 'Complete'
            }]
          };
        },
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    // console.log(err)
                })
            }
        }
    }
</script>