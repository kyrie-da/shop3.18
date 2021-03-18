import { getManagerList, managerCount } from '../../utils/req'

const state = {
    // 定义初始数据
    managerList: [],
    // 每一页的显示记录数
    size: 2,
    // 当前页码
    page: 1,
    // 计算总的数据
    count: 0
}
const mutations = {
    // 将数据操作进去
    changeManagerList(state, data) {
        state.managerList = data
    },
    //修改当前页码数
    changePage(state, page) {
        state.page = page
    },
    // 修改总记录数
    changeCount(state, num) {
        state.count = num
    },


}
const actions = {
    managerListActions(context) {
        let params = {
            size: context.state.size,
            page: context.state.page,
        }
        // 请求角色列表
        getManagerList(params).then(res => {
            // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
            if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
                // 将页码 进行-1
                let page = context.state.page - 1;
                context.commit('changePage', page);
                // dispatch·进行自调用  managerListActions方法 
                context.dispatch('managerListActions');
                return;
            }
            context.commit('changeManagerList', res.data.list)
        })
    },
    // 个数
    countActions(context) {
        managerCount().then(res => {
            // 管理员的总数
            context.commit('changeCount', res.data.list[0].total)
            // console.log(res);
        })
    },
    // 页码
    pageActions(context, page) {
        context.commit('changePage', page)
    }
}

const getters = {
    managerList(state) {
        return state.managerList
    },
    count(state) {
        return state.count
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
