<template>
    <v-jumbotron :gradient="gradient" dark>
    <v-container>
      <v-layout>
        <v-flex xs6>
          <v-card flat>
              <v-card-title><h1>Welcome To Stuck Operplow</h1></v-card-title>
              <v-card-text>
                  Each month, over 50 million developers come to Stack Overflow to learn, share their knowledge, and build their careers.<br>
                  <br>
                  Join the world’s largest developer community.
              </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs9 style="margin-left: 50px; margin-top: -10px">
            <v-card class="signbox" color="blue">
                <h3 style="padding-top: 30px">Sign Up Here</h3>
                <v-avatar
                    size="100px"
                    >
                    <i class="fab fa-wolf-pack-battalion fa-5x"></i>
                </v-avatar>
                <v-container>
                    <v-layout>
                        <v-flex xs5>
                            <v-text-field
                                label="Name"
                                v-model="Name"
                            ></v-text-field>
                        </v-flex>
                        <br>
                        <v-flex xs5 style="margin-left: 30px">
                            <v-text-field
                                label="Username"
                                v-model="Username"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs5>
                            <v-text-field
                                label="Email"
                                v-model="Email"
                            ></v-text-field>
                        </v-flex>
                            <br>
                        <v-flex xs5 style="margin-left: 30px">
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
                <v-btn outline color="white" @click="signUp">Sign Up</v-btn>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    data(){
        return {
            gradient: 'to top, #373B44, #4286f4',
            show1: false,
        }
    },
    computed: {
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
        Password: {
            get () {
                return this.$store.state.Password
            },
            set (value) {
                this.$store.commit('setPassword', value)
            }
        }
    },
    methods: {
        ...mapActions([
            'signUp'
        ])
    }
        
}
</script>

<style scoped>
.v-card{
    background-color: transparent !important;
}

.v-card__text{
    text-align: left
}



h3{
    color: black !important
}
</style>
