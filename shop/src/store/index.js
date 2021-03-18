import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入模块
import {state,mutations,getters} from "./mutation";
import actions from "./actions";
import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import login from './modules/login'
import cate from './modules/cate'
import spec from './modules/spec'

const store = new Vuex.Store( {
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manager,
        login,
        cate,
        spec
    }

})
export default store