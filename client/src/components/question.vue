<template>
  <v-flex xs8>
    <v-container>
      <v-layout justify-center>
        <v-flex>
          <v-avatar size="200px">
                <i class="fas fa-paw fa-6x"></i>
          </v-avatar>
          <br><br>
          <h1>{{ question.title }}</h1>
          <br><br>
          <p v-html="question.content"></p>
          <v-badge>
            <span slot="badge">{{ question.votes.length }}</span>
              <v-btn fab small flat @click="votesQuestion(question._id)">
                <i class="fas fa-heart fa-2x"></i>
              </v-btn>
          </v-badge>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout justify-center>
        <v-flex xs10>
          <v-card flat>
            <v-card-title>
              <h3>Answers Here</h3>
            </v-card-title>
            <v-container>
              <v-flex>
                <wysiwyg  label=" Write your answer here" v-model="answer_content"/>
              </v-flex>
            </v-container>
            <v-container>
              <v-btn block color="black" dark @click="postanswer(id)">Submit</v-btn>
            </v-container>
            <br><br>
            <v-card-title>
              <h4>Answers:</h4>
            </v-card-title>
            <v-container v-for="(answer,index) in answers" :key="index" style="border-bottom: 1px solid lightgrey">
              <v-layout>
                <v-flex xs12>
                  <v-card flat>
                    <v-card-title>
                      <h4>{{ answer.userId.name }}</h4>                                            
                    </v-card-title>
                    <p v-html="answer.content"></p>
                    <v-badge left>
                      <span slot="badge">{{ answer.votesUp.length }}</span>
                       <v-btn fab small @click="upVote(answer)">
                        <i class="far fa-thumbs-up"></i>
                      </v-btn>
                    </v-badge>
                    <v-btn fab small color="primary" v-if="answer.userId._id == user" @click="editanswer(answer)">
                      <i class="fas fa-pen" style="color: white !important"></i>
                    </v-btn>
                    <v-badge>
                      <span slot="badge">{{ answer.votesDown.length }}</span>
                       <v-btn fab small @click="downVote(answer)">
                        <i class="far fa-thumbs-down"></i>
                      </v-btn>
                    </v-badge>
                  </v-card>                                    
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  props: ['id'],
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.getquestion(this.id)
      this.getallanswers(this.id)      
    }
  },
  methods: {
    ...mapActions([
      'getquestion', 'getallanswers', 'postanswer', 'editanswer', 'upVote', 'downVote', 'votesQuestion'
    ])
  },
  computed: {
    ...mapState([
      'question', 'answers'
    ]),
    answer_content: {
      get(){
        return this.$store.state.answer_content
      },

      set(value){
        this.$store.commit('setanswer_content', value)
      }
    },
    
  },
  data(){
    return{
      user: localStorage.getItem('user')
    }
  }
}
</script>
