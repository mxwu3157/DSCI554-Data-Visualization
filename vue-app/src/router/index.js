import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quarterbacks from '../views/Quarterbacks.vue'
import Donut from '../views/Donut.vue'
import Bars from '../views/Bars.vue'
import Teamperformance1 from '../views/Teamperformance1.vue'
import Teamperformance2 from '../views/Teamperformance2.vue'
// import Choropleth from '../views/Choropleth.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Teamperformance1',
    name: '/Teamperformance1',
    component: Teamperformance1
  },
  {
    path: '/Teamperformance2',
    name: '/Teamperformance2',
    component: Teamperformance2
  },
  {
    path: '/Quarterbacks',
    name: 'Quarterbacks',
    component: Quarterbacks
  },
  {
    path: '/Donut',
    name: 'Donut',
    component: Donut
  },
  {
    path: '/Bars',
    name: 'Bars',
    component: Bars

  }
  // {
  //   path: '/Choropleth',
  //   name: 'Choropleth',
  //   component: Choropleth

  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
