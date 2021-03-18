<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
  </div>
</template>

<script>
// 导出两个辅助函数
import { mapActions, mapGetters } from "vuex";
import { delMenu } from "../../../utils/req";
import {successAlert} from "../../../utils/alerts.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      "tableData": "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      "reqMenuList": "menu/menuListActions",
    }),
    // 修改列表数据
    edit(id) {
      // console.log(id);
      // 传递自定义事件
      this.$emit("edit", id);

    },
    del(id) {
      // 弹出是否要删除的对话框
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delMenu({id}).then(res=>{
          //  调用列表请求方法  达到删除时同时刷新
          //  console.log(res);
                successAlert(res.data.msg)
           this.reqMenuList();
     
         })
        // console.log(22);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style> 