import { getSpecList, specCount } from '../../utils/req'

const state = {
    // 定义初始数据
    specList: [],
    // 每一页的显示记录数
    size: 2,
    // 当前页码
    page: 1,
    // 计算总的数据
    count: 0
}
const mutations = {
    // 将数据操作进去
    changeSpecList(state, data) {
        state.specList = data
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
    specListActions(context) {
        let params = {
            size: context.state.size,
            page: context.state.page,
        }
        // 请求角色列表
        getSpecList(params).then(res => {
            // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
            if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
                // 将页码 进行-1
                let page = context.state.page - 1;
                context.commit('changePage', page);
                // dispatch·进行自调用  specListActions方法 
                context.dispatch('specListActions');
            }
            context.commit('changeSpecList', res.data.list)
            console.log(res);
        }
        )
    },
    // 个数
    countActions(context) {
        specCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    // 页码
    pageActions(context, page) {
        context.commit('changePage', page)
    }
}

const getters = {
    specList(state) {
        return state.specList
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
