<template>
  <v-flex xs8 style="margin-left: 90px;">
    <v-card>
      <br><br><br>
      <h3>Ask some question here</h3>
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="Title" v-model="post_title"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <wysiwyg v-model="post_content"/>
        </v-layout>
      </v-container>
      <v-container>
        <v-btn  block color="black" dark @click="postQuestion">Post</v-btn>
      </v-container>
    </v-card>  
  </v-flex>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  computed: {
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
  },
  methods: {
    ...mapActions([
      'postQuestion'
    ])
  }
}
</script>

<style scoped>

</style>
