import { getCateList } from "../../utils/req";
const state = {
    cateList: [],
    size:'',

}
const mutations = {
    // 将数据操作进去
    changeCateList(state, data) {
        state.cateList = data
    }
}
const actions = {
    cateListActions(context) {
        getCateList({istree:true}).then(res => {
            context.commit('changeCateList', res.data.list)
        })
    }
}

const getters = {
    cateList(state) {
        
        return state.cateList
        
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
