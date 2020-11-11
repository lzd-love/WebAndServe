<!--
 * @Author: lzd
 * @Date: 2020-10-19 16:50:35
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-03 11:26:54
 * @Description: content description
-->
<template>
  <div class="change-password" v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="80px"
      size="small"
      style="width:350px"
    >
      <el-form-item
        label="旧密码"
        prop="oldPasswd"
        :rules="{ required: true, message: '请输入原有密码', trigger: 'blur' }"
      >
        <el-input type="password" v-model="form.oldPasswd"></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPasswd"
        :rules="[
          { required: true, message: '请输入新的密码', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ]"
      >
        <el-input type="password" v-model="form.newPasswd"></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="comfirmPwd"
        :rules="[
          { required: true, message: '请确认您的密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]"
      >
        <el-input type="password" v-model="form.comfirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!canTrigger" @click="onSubmit"
          >确认更改</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Api from "@api/HttpApi_jq.js";
export default {
  name: "ChangePassword",
  components: {},
  data() {
    return {
      form: {
        oldPasswd: "",
        newPasswd: "",
        comfirmPwd: ""
      },
      loading: false
    };
  },
  computed: {
    canTrigger() {
      return (
        this.form.oldPasswd &&
        this.form.newPasswd &&
        this.form.comfirmPwd &&
        this.form.oldPasswd != this.form.newPasswd &&
        this.form.newPasswd == this.form.comfirmPwd
      );
    }
  },
  watch: {},
  methods: {
    onSubmit() {
      this.loading = true;
      Api.updatePwd({
        userId: Number(window.sessionStorage.getItem("uid")),
        oldPassword: this.$md5(this.form.oldPasswd),
        newPassword: this.$md5(this.form.newPasswd)
      }).then(res => {
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success"
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.msg,
            type: "warning"
          });
        }
        this.resetForm("form");
        this.loading = false;
      });
    },
    validateNewPwd(rule, value, callback) {
      let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/;
      if (!reg.test(value)) {
        callback(new Error("密码建议6-12位数字、字母或字符！"));
      } else if (this.form.oldPasswd == value) {
        callback(new Error("新密码与旧密码不可一致！"));
      } else {
        callback();
      }
    },
    validateComfirmPwd(rule, value, callback) {
      if (this.form.newPasswd !== value) {
        callback(new Error("确认密码与新密码不一致！"));
      } else {
        callback();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
.change-password {
  color: var(--main-color);
  text-align: left;
}
</style>
