import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')
const menu = ()=>import('../pages/menu/menu')
const home = ()=>import('../pages/home/home')
const role = ()=>import('../pages/role/role')
const manager = ()=>import('../pages/manager/manager')
const cate = ()=>import('../pages/cate/cate')
const spec = ()=>import('../pages/spec/spec')
export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path:'/',
      component:index,
      children:[
        {
          path:'home',
          component:home,
          name:'首页'
        },
        
        {
          path:'menu',
          component:menu,
          name:'菜单',
          
        },
        {
          path:'role',
          component:role,
          name:'角色',
          
        },
        {
          path:'manager',
          component:manager,
          name:'管理员',
          
        },
        {
          path:'cate',
          component:cate,
          name:'商品分类',
        },
        {
          path:'spec',
          component:spec,
          name:'商品规格',
        },
        
        
        // {
        //   path:'',
        //   redirect:'/home'
        // },
      ]
    },
    // {
    //   path:'*',
    //   redirect:'/login'
    // }

  ]
})
