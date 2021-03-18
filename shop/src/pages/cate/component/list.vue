<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="rolename" label="图片">
        <!-- 使用插槽作用域 -->
        <template v-slot="prop">
          <img :src="$preImg+prop.row.img" alt v-if="prop.row.img" />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {delCate} from "../../../utils/req";
import {successAlert} from "../../../utils/alerts";
export default {
  computed: {
    ...mapGetters({
      tableData: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/cateListActions",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id){
      // 弹出是否要删除的对话框
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delCate({id}).then(res=>{
          //  调用列表请求方法  达到删除时同时刷新
          //  console.log(res);
                successAlert(res.data.msg)
           this.reqCateList();
     
         })
        // console.log(22);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    }
  },
  mounted() {
    this.reqCateList();
  },
};
</script>

<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>