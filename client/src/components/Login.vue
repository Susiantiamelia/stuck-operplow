<template>
    <div class="dash">
        <navbar></navbar>
        <v-container>
            <v-layout justify-center>
                <v-flex xs5>
                    <v-card color="white">
                    <v-avatar
                    size="150px"
                    >
                    <i class="fab fa-wolf-pack-battalion fa-5x"></i>
                    </v-avatar>
                    <h3>Welcome</h3>
                    <br><br><br>
                    <v-container>
                        <v-layout >
                            <v-flex >
                                <v-text-field
                                    label="Email"
                                    v-model="Email"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                     <v-container>
                        <v-layout >
                            <v-flex>
                                <v-text-field
                                    v-model="Password"
                                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Password"
                                    @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                          <v-btn outline color="black" @click="login">Submit</v-btn>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        

    </div>
</template>

<script>
import navbar from './navbar.vue'
import { mapState, mapActions } from 'vuex'
export default {
     data(){
        return {
            show1: false,
        }
    },
    components: {
        navbar
    },
    methods: {
        ...mapActions([
            'login'
        ])
    },
    computed: {
        Email: {
            get () {
                return this.$store.state.Email
            },
            set (value) {
                this.$store.commit('setEmail', value)
            }
        },
        Password: {
            get () {
                return this.$store.state.Password
            },
            set (value) {
                this.$store.commit('setPassword', value)
            }
        }
    }
}
</script>

<style scoped>
.dash{
    height: 100vh;
    background-color: steelblue
}
</style>
