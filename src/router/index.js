import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Home from '@/Home'
import Hello from '@/Hello'

.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    }
  ]
})
