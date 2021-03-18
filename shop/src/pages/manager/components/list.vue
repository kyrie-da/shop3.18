<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="2"
      :total="count"
      @current-change="Page"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delManager } from "../../../utils/req";
import { successAlert } from "../../../utils/alerts";
export default {
  computed: {
    ...mapGetters({
      tableData: "manager/managerList",
      count: "manager/count",
    }),
  },
  methods: {
    ...mapActions({
      reqManagerList: "manager/managerListActions",
      reqCount: "manager/countActions",
      reqPage: "manager/pageActions",
    }),
    // 当前页数
    Page(page) {
      // 请求页码
      this.reqPage(page),
        // 请求管理员列表
        this.reqManagerList();
    },
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除角色
    del(uid) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发起删除角色请求
          delManager({ uid }).then((res) => {
            // 已经删除成功
            successAlert(res.data.msg);
            this.reqManagerList();
            this.reqCount();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqManagerList();
    // 请求总数
    this.reqCount();
  },
};
</script>

<style>
</style>