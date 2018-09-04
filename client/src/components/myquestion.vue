<template>
  <v-flex xs8>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card flat>
            <v-avatar size="200px">
              <i class="fas fa-paw fa-6x"></i>
            </v-avatar>
            <br><br>
            <v-text-field label="Title" v-model="question.title"></v-text-field>
            <br><br>
            <v-textarea
              name="input-7-1"
              label="Content"
              v-html="question.content"
            ></v-textarea>
            <v-btn block color="black" dark @click="editQuestion(question._id)">Edit</v-btn>
            <br>
            <h2>Or</h2>
            <br>
            <v-btn block color="black" dark @click="deleteQuestion(question._id)">DELETE</v-btn>
          </v-card>
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
                    <v-btn fab small color="primary" v-if="answer.userId._id == user" @click="editanswer(answer)">
                      <i class="fas fa-pen" style="color: white !important"></i>
                    </v-btn>
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
import { mapState, mapActions} from 'vuex'
export default {
  props: ['id'],
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.getquestion(this.id)
      this.getallanswers(this.id) 
    }
  },
  created() {
    this.id = this.$router.params.id;
    this.getquestion(this.$router.params.id)
    this.getallanswers(this.$router.params.id)
  },
  methods: {
    ...mapActions([
      'getquestion', 'editQuestion', 'getallanswers', 'postanswer', 'editanswer', 'deleteQuestion'
    ])
  },
  computed: {
    ...mapState([
      'answers'
    ]),
    question: {
      get(){
        return this.$store.state.question
      },
      set(value){
        this.$store.commit('setOneQuestion', value)
      }
    },
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

<style scoped>

</style>
