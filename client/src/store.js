import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import route from './router.js'
import swal from 'sweetalert2'

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
    }
  },
  actions: {
    signUp({commit}){

      let user = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }

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

    login(){
      axios.post('http://localhost:3000/users/login',{
        uname_email: this.state.uname_email,
        password: this.state.password
      })
      .then(result => {
        console.log(result)
        localStorage.setItem('userToken', result.data.token)
        localStorage.setItem('user', result.data.id)
        swal({
          title: 'succesfully login!',
          type: "success",
        });
        route.push('/dashboard')
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
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
      axios.get('http://localhost:3000/question')
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
      axios.get(`http://localhost:3000/question/${id}`)
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
      axios.put(`http://localhost:3000/question/edit/${id}`, input)
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
      axios.get(`http://localhost:3000/answer/${id}`)
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
    }
  }
})
