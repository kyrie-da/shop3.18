import axios from 'axios';
import qs from "qs";
import { errorAlert } from './alerts.js'
import store from '../store/index'
import router from '../router'

// 设置基础路径
const baseURL = '/api'

// 设置请求头
// axios.interceptors.request.use(config => {
//     console.group('请求路径为' + config.url);
//     if (config.url!==baseURL+"/api/userlogin") {
//         // 设置请求头  令牌token 
//         config.headers.authorization=store.state.user.token
//         console.log(store);
//     }
//     console.log(config);
//     return config;
// })

// 响应拦截
axios.interceptors.response.use(res => {
    console.group('响应路径为' + res.config.url);
    if (res.data.code !== 200) {
        if (res.data.code == 403) {
            router.push('/login');
            return
        }
        errorAlert(res.data.msg);
        return;
    }
    console.log(res);
    return res;
})

// 添加菜单
export const addMenu = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/menuadd',
        data: qs.stringify(data)
    })
}

// 菜单列表
export const getMenuList = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/menulist',
        params,
    })
}

// 获取一条数据
export const getOneMenu = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/menuinfo',
        params
    })
}

// 编辑菜单
export const updateMenu = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/menuedit',
        data: qs.stringify(data)
    })
}

// 删除菜单
export const delMenu = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/menudelete',
        data: qs.stringify(data)
    })
}

// 角色添加
export const addRole = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/roleadd',
        data: qs.stringify(data)
    })
}

// 获取角色列表
export const getRoleList = () => {
    return axios({
        method: 'get',
        url: baseURL + '/api/rolelist'
    })
}

// 获取一条角色数据详情
export const getOneRole = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/roleinfo',
        params
    })
}

// 修改角色
export const updateRole = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/roleedit',
        data: qs.stringify(data)
    })
}

// 删除角色
export const delRole = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/roledelete',
        data: qs.stringify(data)
    })
}


// 管理员添加
export const addManager = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/useradd',
        data: qs.stringify(data)
    })
}


// 获取管理员列表
export const getManagerList = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/userlist',
        params
    })
}

// 获取管理员总数
export const managerCount = () => {
    return axios({
        method: 'get',
        url: baseURL + '/api/usercount',
    })
}

// 编辑 获取所要编辑的那一条数据
export const getOneManager = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/userinfo',
        params
    })
}

// 修改管理员
export const updateManager = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/useredit',
        data: qs.stringify(data)
    })
}

// 删除角色
export const delManager = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/userdelete',
        data: qs.stringify(data)
    })
}

// 登录
export const reqLogin = (data) => {
    console.log(data);

    return axios({
        method: 'post',
        url: baseURL + '/api/userlogin',
        data: qs.stringify(data)
    })
}

// 添加商品分类
export const addCate = (data) => {
    // 需要使用formdata 来处理带文件的数据
    let form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseURL + '/api/cateadd',
        data: form
    })
}

// 商品列表
export const getCateList = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/catelist',
        params
    })
}

// 编辑 获取所要编辑的那一条数据
export const getOneCate = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/cateinfo',
        params
    })
}

// 修改商品
export const updateCate = (data) => {
    // 需要使用formdata 来处理带文件的数据
    let form = new FormData()
    for (let i in data) {
        form.append(i, data[i])
    }
    return axios({
        method: 'post',
        url: baseURL + '/api/cateedit',
        data: form
    })
}

// 删除商品
export const delCate = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/catedelete',
        data: qs.stringify(data)
    })
}

// 规格属性添加
export const addSpec = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/specsadd',
        data: qs.stringify(data)
    })
}

// 规格列表获取
export const getSpecList = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/specslist',
        params
    })
}

// 获取商品规格总数
export const specCount = () => {
    return axios({
        method: 'get',
        url: baseURL + '/api/specscount',
    })
}

// 编辑 获取所要编辑的那一条数据
export const getOneSpec = (params) => {
    return axios({
        method: 'get',
        url: baseURL + '/api/specsinfo',
        params
    })
}

// 修改规格
export const updateSpec = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/specsedit',
        data: qs.stringify(data)
    })
}

// 删除规格
export const delSpec = (data) => {
    return axios({
        method: 'post',
        url: baseURL + '/api/specsdelete',
        data: qs.stringify(data)
    })
}


