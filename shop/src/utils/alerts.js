import Vue from "vue";
const vm = new Vue();

// 成功消息弹窗
export const successAlert=(msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}
// 错误消息弹窗
export const errorAlert=(msg)=>{
    vm.$message.error(msg);
}
// 警告弹窗
export const warningAlert=(msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
}

