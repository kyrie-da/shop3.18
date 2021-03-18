<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择---" value='0' disabled></el-option>
            <el-option label="一级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 遍历图标 -->
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 遍历地址 -->
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="skyblue"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, getOneMenu, updateMenu } from "../../../utils/req";
import {successAlert} from "../../../utils/alerts.js";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: "1", //类型 1目录 2菜单
        url: "",
        status: 1, //状态 1正常 2 禁用
      },
      formLabelWidth: "120px",
      //   图标选项
      icons: ["el-icon-user-solid", "el-icon-s-tools", "el-icon-goods"],
      //   地址选项
      urls: [
        "menu",
        "home",
        "role",
        "manager",
        "cate",
        "spec",
        "goods",
        "vip",
        "banner",
        "seckill",
      ],
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/menuListActions",
    }),
    //   取消
    cancel() {
      this.info.show = false;
      // 点击取消时 值为初始值
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1, //类型 1目录 2菜单
        url: "",
        status: 1, //状态 1正常 2 禁用
      };
    },
    // 添加数据请求发起
    confirm() {
      addMenu(this.form).then(res => {
        // console.log(res);
        successAlert(res.data.msg);
        // 成功后消失
        this.cancel();
        this.reqMenuList();
      });
    },

    
    // 获取菜单详情方法
    getDetail(id) {
      getOneMenu({id}).then(res => {
        this.form = res.data.list;
         this.form.id = id;
      })
    },
    // 修改
    update() {
      updateMenu(this.form).then((res) => {
        // 成功提示
        successAlert(res.data.msg);
        this.cancel();
        // 调用请求数据  达到页面刷新效果
        this.reqMenuList();
      })
    },
  },
  // 挂载完成  获取菜单列表数据
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style>