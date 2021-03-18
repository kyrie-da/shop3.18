<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template v-slot="prop">
          <el-tag v-for="(item,index) in prop.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
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
import {delSpec} from "../../../utils/req";
import {successAlert} from "../../../utils/alerts";
export default {
  computed: {
    ...mapGetters({
      tableData: "spec/specList",
      count: "spec/count",
    }),
  },

  methods: {
    ...mapActions({
      reqSpecList: "spec/specListActions",
      reqCount: "spec/countActions",
      reqPage: "spec/pageActions",
    }),
    // 页码
    Page(page) {
      // 请求页码
      this.reqPage(page),
        // 请求管理员列表
        this.reqSpecList();
    },
    edit(id){
      this.$emit('edit',id)
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          // 发起删除规格请求
          delSpec({ id }).then((res) => {
            // 已经删除成功
            successAlert(res.data.msg);
            this.reqSpecList();
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
    this.reqSpecList(), this.reqCount();
  },
};
</script>

<style>
</style>