<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- defaultkey  为自定义默认选中的变量 -->
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultkey"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
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
import { addRole, getOneRole, updateRole } from "../../../utils/req";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alerts";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultkey: [], //默认选中
    };
  },

  computed: {
    //   获取菜单列表，渲染进入树形结构
    ...mapGetters({
      data: "menu/menuList",
    }),
  },
  methods: {
    //   发起菜单列表请求
    ...mapActions({
      reqMenuList: "menu/menuListActions",
      reqRoleList: "role/roleListActions",
    }),

    //   取消  关闭弹窗  恢复初始值
    cancel() {
      (this.info.show = false),
        (this.form = {
          rolename: "",
          menus: "",
          status: 1,
        });
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
    },
    // 点击确定
    confirm() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form.menus);
      // 点击确定按钮时传参为表单内容
      addRole(this.form).then((res) => {
        this.reqRoleList();
        this.cancel();
        successAlert(res.data.msg);
      });
    },
    // 获取角色列表详情
    getDetail(id) {
      //   console.log(id);
      getOneRole({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultkey = JSON.parse(this.form.menus);
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      updateRole(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.reqRoleList();
      });
    },
  },
  // 挂载完成  调用请求菜单列表的方法
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style>
</style>