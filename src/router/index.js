import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserList from '@/components/UserList'
import Good from '@/components/3d/Good'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },{
      path:'/good',
      name:'Good',
      component: Good
    }
  ]
})
