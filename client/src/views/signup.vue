<template>
  <div class="about">
    <navbar></navbar>
    <jumbotron></jumbotron>
    <v-container>
      <v-layout>
        <questionlist :questions="questions" :route="route"></questionlist> 
        <router-view></router-view>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import jumbotron from '../components/signupBox.vue'
import {mapState, mapActions} from 'vuex'
import questionlist from '@/components/question-list.vue'

export default {
  components: {
    navbar,
    jumbotron,
    questionlist
  },
  methods: {
    ...mapActions([
      'allQuestion'
    ])
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  created() {
    this.allQuestion()
  },
  data(){
    return {
      route: '/question/'
    }
  }

}
</script>
