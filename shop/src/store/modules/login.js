
const state = {
    // 如果获取了sessionStorage.getItem里面的值  则将其转化为对象，否则则无值  则为空
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}
const mutations = {
    // 将数据操作进去
    changeUser(state, user) {
        state.user = user;
        if(user){
            // 2.同时将用户信息存入sessionStorage中
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user')
        }
    }
}
const actions = {
    userActions(context, user) {
        context.commit('changeUser', user)
    }
}
const getters = {
    user(state) {
        return state.user
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}
