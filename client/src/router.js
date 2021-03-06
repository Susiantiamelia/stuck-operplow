import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import dashboard from './views/dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/signup.vue'),
      children: [
        {
          path: '/question/:id',
          name: 'question',
          props: true,
          component: () => import('./components/question.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      children: [
        {
          path: '/myquestion/:id',
          name: 'myquestion',
          props: true,
          component: () => import('./components/myquestion.vue')
        }
      ]
    }
  ]
})
