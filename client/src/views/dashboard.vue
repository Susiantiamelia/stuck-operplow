<template>
    <div class="dashboard">
       <navbar></navbar>
       <v-container>
           <v-layout>
               <profile></profile>
               <post></post>
           </v-layout>
       </v-container>
       <br><br>
       <h2>MY QUESTION</h2>
       <br>
       <v-container>
           <v-layout>
               <questionlist :questions="questions" :route="route"></questionlist>
                <router-view></router-view>
           </v-layout>
       </v-container>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import {mapActions, mapState} from 'vuex'
import dash from '../components/dashboard.vue'
import profile from '@/components/profile.vue'
import post from '@/components/post.vue'
import questionlist from '@/components/question-list.vue'

export default {
    components: {
        dash,
        Navbar,
        profile,
        post,
        questionlist
    },
    methods: {
        ...mapActions([
            'Profile','myQuestion'
        ])
    },
    watch: {
        $route(to, from) {
        this.myQuestion()
        }
    },
    created(){
        let token = localStorage.getItem('userToken')
        if(token){
            this.Profile()
            this.myQuestion()
        } else {
            this.$router.push('/login')
        }
        
    },
    computed: {
        ...mapState([
            'questions'
        ])
    },
    data(){
        return {
            route: '/myquestion/'
        }
        
    }
}
</script>


<style scoped>

</style>
