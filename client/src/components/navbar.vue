<template>
    <div class="navbar">
        <v-toolbar>
            <v-toolbar-title style="margin-left:50px"><i class="fab fa-wolf-pack-battalion fa-2x"></i></v-toolbar-title>
            <v-layout justify-center style="margin-left: 40px"> 
                <v-flex xs9>
                    <v-text-field
                        hide-details
                        placeholder="Search Here"
                        single-line
                        v-model="search"
                    ></v-text-field>
                </v-flex>
                <v-btn flat @click="findQuestion"><v-icon>search</v-icon></v-btn>
            </v-layout>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn class="nav-but" flat to="/">Home</v-btn>
            <v-btn class="nav-but" flat v-if="!token" to="/login">Login</v-btn>
            <v-btn class="nav-but" flat to="/dashboard" v-if="token">
                <v-icon>account_circle</v-icon>
            </v-btn>
            <v-btn class="nav-but" flat v-if="token" @click="logout"> Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
        let token = localStorage.getItem('userToken') || false

        return {
            token: token
        }
    },
    methods: {
        ...mapActions([
            'logout', 'findQuestion'
        ])
    },
    computed: {
        search: {
            get () {
                return this.$store.state.search
            },
            set (value) {
                this.$store.commit('setSearch', value)
            }
        }
    }
}
</script>

<style>
.navbar{
    background-color: white
}
.nav-but {
    color: black !important;
}
</style>