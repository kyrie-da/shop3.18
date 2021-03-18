<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加组件 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        show: false, //控制add组件的显示和隐藏
        title: "", //控制add组件的标题
        isAdd: true, //控制add组件是添加还是编辑
      },
    };
  },
  components: {
    vAdd,
    vList,
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加管理员";
      this.info.isAdd = true;
    },
    edit(uid) {
      this.info.show = true;
      this.info.title = "编辑管理员";
      this.info.isAdd = false;
      this.$refs.add.getDetail(uid);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 10px 10px;
}
</style>