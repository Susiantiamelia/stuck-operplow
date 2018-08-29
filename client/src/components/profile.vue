<template>
  <v-flex xs4>
    <v-card>
      <br><br><br>
      <h3>Your Profile</h3>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="Name" v-model="Name"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="Username" v-model="Username"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="Email" v-model="Email"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-btn block color="black" dark @click="editProfile">EDIT</v-btn>
      </v-container>
    </v-card>
    
  </v-flex>
</template>

<script>
import {mapActions} from 'vuex'


export default {
  computed: {
    Name: {
      get () {
        return this.$store.state.name
      },
      set (value) {
        this.$store.commit('setName', value)
      }
    },
    Email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('setEmail', value)
      }
    },
    Username: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('setUsername', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'editProfile'
    ])
  }
};
</script>

<style scoped>
</style>
