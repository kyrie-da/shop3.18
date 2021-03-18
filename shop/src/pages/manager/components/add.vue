<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择---" value="0" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
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
import { mapActions, mapGetters } from "vuex";
import { addManager, getOneManager, updateManager } from "../../../utils/req";
import { successAlert } from "../../../utils/alerts";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/roleListActions",
      reqManagerList: "manager/managerListActions",
      reqCount: "manager/countActions",
    }),
    //   点击取消的时候  弹框消失  数据恢复初始
    cancel() {
      this.info.show = false;
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 点击确定时 数据请求发起
    confirm() {
      addManager(this.form).then((res) => {
        // console.log(res);
        successAlert(res.data.msg);
        // 成功后消失
        this.cancel();
        this.reqManagerList();
        this.reqCount();
      });
    },
    getDetail(uid) {
      getOneManager({ uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update() {
      updateManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.reqManagerList();
      });
    },
  },
  mounted() {
    // 挂载完成时  调用角色列表请求方法
    this.reqRoleList();
  },
};
</script>

<style>
</style>