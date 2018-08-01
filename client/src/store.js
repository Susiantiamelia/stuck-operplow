import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import route from './router.js'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Name: '',
    Email: '',
    Username: '',
    Password: '',
    user_profile: '',
    profile: '',
    post_title: '',
    post_content: '',
    question: []
  },
  mutations: {
    setName(state, payload){
      state.Name = payload
    },
    setEmail(state, payload){
      state.Email = payload
    },
    setUsername(state, payload){
      state.Username = payload
    },
    setPassword(state, payload){
      state.Password = payload
    },
    setUser_profile(state, payload){
      state.user_profile = payload
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
      state.question.push(payload)
    }
  },
  actions: {
    signUp({commit}){

      let user = {
        name: this.state.Name,
        username: this.state.Username,
        email: this.state.Email,
        password: this.state.Password
      }

      axios.post('http://localhost:3000/users/register', user)
      .then(result => {
        console.log(result)
        commit('setUser_profile', result.data.user)
        route.push('/login')
      })
    },

    login({ commit }){
      axios.post('http://localhost:3000/users/login',{
        uname_email: this.state.Email,
        password: this.state.Password
      })
      .then(result => {
        console.log(result)
        localStorage.setItem('userToken', result.data.token)
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
    },
    editProfile({commit}){
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
      .then(result => {
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

    postQuestion({ commit }){
      console.log(this.state.post_title, 'and', this.state.post_content)
      axios.post('http://localhost:3000/question/post', {
        title: this.state.post_title,
        content: this.state.post_content
      }, {
        headers: {
          token: localStorage.getItem('userToken')
        }
      })
      .then(result => {
        commit('setQuestion', result.data.question)
        commit('setPost_title', '')
        commit('setPost_content', '')
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
          for(let i = 0; i < result.data.length; i++){
            commit('setQuestion', result.data[i])
          }

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
        for(let i = 0; i < result.data.length; i++){
          commit('setQuestion', result.data[i])
        }
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: `${err.message}`,
        })
      })
    }
  }
})
