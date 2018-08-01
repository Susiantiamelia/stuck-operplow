<template>
    <div class="dash">
        <navbar></navbar>
        <v-container>
            <v-layout>
                <v-flex xs4>
                    <br><br><br>
                    <h3>Your Profile</h3>
                    <v-flex>
                        <v-text-field
                            label="Name"
                            v-model="Name"
                        ></v-text-field>
                    </v-flex>
                    <br><br>
                    <v-flex>
                        <v-text-field
                            label="Username"
                            v-model="Username"
                        ></v-text-field>
                    </v-flex>
                    <br><br>
                    <v-flex>
                        <v-text-field
                            label="Email"
                            v-model="Email"
                        ></v-text-field>
                    </v-flex>
                    <v-btn outline color="black" @click="editProfile">Edit</v-btn>
                </v-flex>
                <v-flex xs8 style="margin-left: 90px;">
                    <br><br><br>
                    <h3>Ask some question here</h3>
                    <br><br><br>
                    <v-flex>
                        <v-text-field
                            label="Title"
                            v-model="post_title"
                        ></v-text-field>
                    </v-flex>
                    <wysiwyg v-model="post_content"/>
                    <v-btn outline color="black" @click="postQuestion">Post</v-btn>
                    <br><br><br>
                    <v-flex>
                        <v-btn class="but-choose" flat @click="myQuestion">My Question</v-btn>
                        <v-btn class="but-choose" flat @click="allQuestion">All Question</v-btn>
                        <v-container  v-for="(question, index) in question" :key="index" style="border-bottom: 1px solid grey">
                            <v-layout row wrap>
                                <v-flex xs2 style="padding-left: 20px">
                                    <i class="fas fa-paw fa-6x"></i>
                                </v-flex>
                                <v-flex xs8>
                                    <v-card flat>
                                            <div class="content">
                                                <h3 class="headline mb-0">{{ question.title }}</h3>
                                                <br>
                                                <div>{{ question.content }}</div>
                                            </div>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import navbar from './navbar.vue'
import {mapActions, mapState} from 'vuex'
export default {
    components: {
        navbar
    },
    methods: {
        ...mapActions([
            'Profile', 'editProfile', 'postQuestion', 'myQuestion', 'allQuestion'
        ])
    },
    created(){
        this.Profile()
    },
    computed:{
        ...mapState([
            'profile', 'question'
        ]),
        Name: {
            get () {
                return this.$store.state.Name
            },
            set (value) {
                this.$store.commit('setName', value)
            }
        },
        Email: {
            get () {
                return this.$store.state.Email
            },
            set (value) {
                this.$store.commit('setEmail', value)
            }
        },
        Username: {
            get () {
                return this.$store.state.Username
            },
            set (value) {
                this.$store.commit('setUsername', value)
            }
        },
        post_title: {
            get () {
                return this.$store.state.post_title
            },
            set (value) {
                this.$store.commit('setPost_title', value)
            }
        },
        post_content: {
            get () {
                return this.$store.state.post_content
            },
            set (value) {
                this.$store.commit('setPost_content', value)
            }
        }
    }
}
</script>

<style scoped>
.but-choose{
    color: black !important;
}

.content{
    text-align: left !important
}
</style>
