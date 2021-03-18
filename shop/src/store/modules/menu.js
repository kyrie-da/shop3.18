import { getMenuList } from '../../utils/req.js'

const state = {
    // 定义初始数据
    menuList: []
}
const mutations = {
    // 将数据操作进去
    changeMenuList(state, data) {
        state.menuList = data
    }
}

const actions = {
    menuListActions(context) {
        // 请求菜单列表
        getMenuList({istree:true}).then(res => {
        // getMenuList().then(res => {
            context.commit('changeMenuList', res.data.list)
            // console.log(res);
        })
    }
}

const getters = {
    menuList(state) {
        return state.menuList
    }

}


export default {
    state,
    mutations,
    actions,
    getters,
    // 子模块 加命名空间
    namespaced: true
}
