<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择---" value disabled></el-option>
            <el-option label="一级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 照片上传 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- on:change ele自定义方法  -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="update" v-else >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alerts";
import { addCate, getOneCate ,updateCate} from "../../../utils/req";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      formLabelWidth: "120px",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1, //1正常 2 禁用
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/cateListActions",
    }),
  

    // 自定义方法  修改文件
    changeImg(e) {
      console.log(e);
      //处理上传文件的大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 处理文件后缀名
      let suffix = [".jpg", ".png", ".gif", ".jpeg"];
      //  从后边算起 '.' 开始分割
      let sufNmae = e.name.slice(e.name.lastIndexOf("."));
      // 进行格式判断  .some为遍历数组  即有一个为真即为真
      if (!suffix.some((item) => item == sufNmae)) {
        warningAlert("上传文件格式不正确");
        return;
      }

      // 上传显示的文件  将文件生成url地址并显示
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存入 form.img
      this.form.img = e.raw;
    },
    // 点击取消
    cancel() {
      (this.info.show = false),
        (this.form = {
          pid: 0,
          catename: "",
          img: "",
          status: 1, //1正常 2 禁用
        });
      this.reqCateList();
    },
    // 点击确定
    confirm() {
      addCate(this.form).then((res) => {
        // console.log(res);
        successAlert(res.data.msg);
        this.reqCateList();
        this.cancel();
      });
    },
      // 编辑
    getDetail(id) {
      getOneCate({ id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg+this.form.img;
        console.log(this.imageUrl);
      });
    },
    // 修改
    update(){
        updateCate(this.form).then((res) => {
        // 成功提示
        successAlert(res.data.msg);
        this.cancel();
        // 调用请求数据  达到页面刷新效果
        this.reqCateList();
      })
    },
  },
  //   挂载完成时请求发起
  mounted() {
    this.reqCateList();
  },
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>