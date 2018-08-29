import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import route from './router.js'
import swal from 'sweetalert2'
import {provider, auth} from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname_email:'',
    name: '',
    email: '',
    username: '',
    password: '',
    profile: '',
    post_title: '',
    post_content: '',
    questions: [],
    question: {},
    answers: [],
    token: localStorage.getItem('userToken') || false,
    answer_content: '',
    error: '',
    search: ''
  },
  mutations: {
    setName(state, payload){
      state.name = payload
    },
    setEmail(state, payload){
      state.email = payload
    },
    setUsername(state, payload){
      state.username = payload
    },
    setPassword(state, payload){
      state.password = payload
    },
    setProfile(state, payload){
      state.profile = payload
    },
    setPost_title(state, payload){
      state.post_title = payload
    },
    setPost_content(state, payload){
      state.post_content = payload
    },
    setQuestion(state, payload){
      state.questions = payload
    },
    setUname(state, payload){
      state.uname_email = payload
    },
    setOneQuestion(state, payload){
      state.question = payload
    },
    setAnswers(state, payload){
      state.answers = payload
    },
    setanswer_content(state, payload){
      state.answer_content = payload
    },
    setSearch(state, payload){
      state.search = payload
    }
  },
  actions: {

    loginFb({commit}){
      auth.signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        
        let token = result.credential.accessToken
        axios.post('http://localhost:3000/users/loginfb', {
          fbToken: token
        })
        .then(server => {
          console.log(server)
          localStorage.setItem('userToken', server.data.token)
          localStorage.setItem('user', server.data.id)
          commit('setUname', '')
          commit('setPassword', '')
          swal({
            title: 'succesfully login!',
            type: "success",
          });
          route.push('/dashboard')
          
        })
        .catch(err => {
          console.log(err);
          
        })
      })
      .catch(err => {
        console.log(err);
        
      })
    },
    signUp({commit}){

      let user = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }

      console.log(user);
      

      axios.post('http://localhost:3000/users/register', user)
      .then(() => {
        commit('setName', '')
        commit('setEmail', '')
        commit('setUsername', '')
        commit('setPassword', '')
        swal({
          title: 'succesfully regist!',
          type: "success",
        });
        route.push('/login')
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },

    login({commit}){
      axios.post('http://localhost:3000/users/login',{
        uname_email: this.state.uname_email,
        password: this.state.password
      })
      .then(result => {
        console.log(result)
        localStorage.setItem('userToken', result.data.token)
        localStorage.setItem('user', result.data.id)
        commit('setUname', '')
        commit('setPassword', '')
        swal({
          title: 'succesfully login!',
          type: "success",
        });
        route.push('/dashboard')
      })
      .catch(err => {
        this.state.error = 'Username / Email / Password wrong'
      })
    },

    logout(){
      localStorage.removeItem('userToken')
      localStorage.removeItem('user')
      route.push('/')
    },

    Profile({commit}){
      let token = localStorage.getItem('userToken')
      axios.get('http://localhost:3000/users/profile',{
        headers: {
          token: token
        }
      })
      .then(result => {
        commit('setProfile', result.data.user[0])
        commit('setName', result.data.user[0].name)
        commit('setEmail', result.data.user[0].email)
        commit('setUsername', result.data.user[0].username)
        console.log(this.state.profile, 'and', )

      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },
    
    editProfile(){
      let user = {
        name: this.state.Name,
        username: this.state.Username,
        email: this.state.Password
      }

      axios.post('http://localhost:3000/users/edit-profile', user, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(() => {
        swal({
          title: 'succesfully edit profile!',
          type: "success",
        });
        this.state.profile.name = user.name
        this.state.email = user.email
        this.state.username = user.username
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },

    postQuestion({ dispatch }){
      console.log(this.state.post_title, 'and', this.state.post_content, 'and', this.state.token );
      
      let token = localStorage.getItem('userToken')
      axios.post('http://localhost:3000/question/post', {
        title: this.state.post_title,
        content: this.state.post_content
      }, {
        headers: {
          token: token
        }
      })
      .then(() => {
        swal({
          title: 'succesfully added question!',
          type: "success",
        });
        dispatch('myQuestion')
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },
    myQuestion({commit}){
      axios.get('http://localhost:3000/question/user-question',{
          headers: {
            token: localStorage.getItem('userToken')
          }
        })
        .then(result => {
          console.log(result)
            commit('setQuestion', result.data)

          console.log(this.state.question)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: `${err.message}`,
          })
        })
    },

    allQuestion({ commit }){
      axios.get('http://localhost:3000/question', {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(result => {
        commit('setQuestion', result.data)
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },

    getquestion({commit}, id){
      axios.get(`http://localhost:3000/question/${id}`, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
        .then(result => {
          commit('setOneQuestion', result.data)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: `${err.message}`,
          })
        })
    },

    editQuestion({dispatch}, id){
      let input = {
        title: this.state.question.title,
        content: this.state.question.content
      }
      axios.put(`http://localhost:3000/question/edit/${id}`, input, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
        .then(result => {
          route.push('/dashboard')
          swal({
            title: 'succesfully edit question',
            type: "success",
          });
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: `${err.message}`,
          })
        })
    },

    getallanswers({commit}, id){
      axios.get(`http://localhost:3000/answer/${id}`, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(result => {
        commit('setAnswers', result.data)
        
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    },

    postanswer({dispatch, commit}, id){    
      if(this.state.token){
        axios.post(`http://localhost:3000/answer/create/${id}`, {
          content: this.state.answer_content
        }, {
          headers: {
            token: this.state.token
          }
        })
        .then(result => {
          dispatch('getallanswers', id)
          commit('setanswer_content', '')
          swal({
            title: 'succesfully added answer!',
            type: "success",
          });
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: `${err.message}`,
          })
        })
        
      }  else {
        swal({
          type: 'warning',
          title: 'Oops...',
          text: `please login first`,
        })
        route.push('/login')
      }
      
    },

    editanswer({dispatch}, answer){
      swal({
        title: 'Edit your answer',
        html:
        `<input id="edit_answer" class="swal2-input" type="text" value="${answer.content}"> `,
        focusConfirm: false,
        preConfirm: () => {
          let content = document.getElementById('edit_answer').value
          axios.put(`http://localhost:3000/answer/edit/${answer._id}`, {
            content: content
          }, {
            headers: {
              token: localStorage.getItem('userToken')
            }
          })
          .then(result => {
            dispatch('getallanswers', answer.questionId)
            swal({
              title: 'succesfully edit answer!',
              type: "success",
            });
          })
          .catch(err => {
            swal({
              type: 'error',
              title: 'Oops...',
              text: `${err.message}`,
            })
          })
        }
      })
    },

    upVote({ dispatch }, answer){
      if(this.state.token){
        axios.put(`http://localhost:3000/answer/upvote/${answer._id}`, {}, {
          headers: {
            token: this.state.token
          }
        })
        .then(result => {
          console.log(result);
          dispatch('getallanswers', answer.questionId)
        })
        .catch(err => {
          console.log(err);
          
        })
      } else {
        swal({
          type: 'warning',
          title: 'Oops...',
          text: `please login first`,
        })
        route.push('/login')
      }  
      
    },

    downVote({ dispatch }, answer){
      if(this.state.token){
        axios.put(`http://localhost:3000/answer/downvote/${answer._id}`, {}, {
          headers: {
            token: this.state.token
          }
        })
        .then(result => {
          console.log(result);
          dispatch('getallanswers', answer.questionId)
        })
        .catch(err => {
          console.log(err);
          
        })
      } else {
        swal({
          type: 'warning',
          title: 'Oops...',
          text: `please login first`,
        })
        route.push('/login')
      }  
      
    },

    votesQuestion({ dispatch }, id){
      if(this.state.token) {
        axios.put(`http://localhost:3000/question/votes/${id}`, {}, {
          headers: {
            token: this.state.token
          }
        })
        .then(result => {
          console.log(result);
          dispatch('getquestion', id)
        })
        .catch(err => {
          console.log(err);
          
        })
      } else {
        swal({
          type: 'warning',
          title: 'Oops...',
          text: `please login first`,
        })
        route.push('/login')
      }  
      
    },

    deleteQuestion(context, id){
      axios.delete(`http://localhost:3000/question/delete-question/${id}`,{
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(result => {
        route.push('/dashboard')
        swal({
          title: 'succesfully delete question!',
          type: "success",
        });
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })

    },

    findQuestion({ commit }){
      let search = this.state.search

      axios.get('http://localhost:3000/question/find-question', {
        search: search
      }, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(result => {
        commit('setQuestion', result.data)
        commit('setSearch', '')
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  }
})
