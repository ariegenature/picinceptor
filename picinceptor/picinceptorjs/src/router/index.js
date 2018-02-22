import Vue from 'vue'
import Router from 'vue-router'
import ContributePage from '@/components/ContributePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/contribute',
      name: 'contribute',
      component: ContributePage
    },
    {
      path: '/',
      redirect: '/contribute'
    }

  ]
})
