import { getRoleList } from '../../utils/req'

const state = {
    // 定义初始数据
    roleList: []
}
const mutations = {
    // 将数据操作进去
    changeRoleList(state, data) {
        state.roleList = data
    }
}
const actions = {
    roleListActions(context) {
        // 请求角色列表
        getRoleList().then(res => {
            context.commit('changeRoleList', res.data.list)
        })
    }
}
const getters = {
    roleList(state) {
        return state.roleList
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
