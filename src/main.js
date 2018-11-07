import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store.js'
import ElementUI from 'element-ui'
import { Bar, Line } from 'vue-chartjs'
// import VLazyImage from "v-lazy-image";

const fb = require('./firebaseConfig.js')
import './assets/scss/app.scss'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
// Vue.use(VLazyImage)

Vue.config.productionTip = false
 
// handle page reloads

let app

fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})


// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import { store } from './store.js'
// const fb = require('./firebaseConfig.js')
// import './assets/scss/app.scss'

// Vue.config.productionTip = false

// // handle page reloads
// let app
// fb.auth.onAuthStateChanged(user => {
//     if (!app) {
//         app = new Vue({
//             el: '#app',
//             router,
//             store,
//             render: h => h(App)
//         })
//     }
// })

// new Vue({
//     el: '#app',
//     router,
//     store,
//     render: h => h(App)
// })
