<template>
    <div id="app">
        <Navigation v-if="currentUser"></Navigation>
      <router-view/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Navigation from './components/Navigation.vue'
    const fb = require('./firebaseConfig.js')

    export default {
        components: { Navigation },
        computed: {
            ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts'])
        }
    }


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
</script>
