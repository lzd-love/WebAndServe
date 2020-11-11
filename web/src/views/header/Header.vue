<!--
 * @Author: lzd
 * @Date: 2020-10-19 09:43:44
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-19 15:20:05
 * @Description: content description
-->
<template>
  <div class="header">
    <div class="top-view">
      <div class="system-name">JQ管理系统</div>
      <div class="top-view-right btn-box">
        <!-- <div class="btn">
          <span class="btn-icon iconfont icon-update"></span>
          <span class="btn-name">版本管理</span>
        </div>-->
        <div class="btn">
          <span class="btn-icon el-icon-user"></span>
          <el-dropdown @command="dropdownCommand">
            <span class="btn-name">admin</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="logout" command="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      selectCommandMap: new Map([["logout", "logout"]])
    };
  },
  computed: {},
  watch: {},
  methods: {
    dropdownCommand(command) {
      // console.log(command)
      let funName = this.selectCommandMap.get(command);
      funName && this[funName]();
    },
    logout() {
      this.$confirm("确定退出登录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push({
            path: "/"
          });
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.top-view {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(33, 50, 66, 0.45);
  padding: 0 30px;
  box-shadow: 0 1px 5px var(--light-borer-bottom);
  border-bottom: 1px solid #376974;
}
.system-name {
  color: var(--main-color);
  font-size: 28px;
}
.top-view-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.btn-box {
  height: 85px;
  font-size: 20px;
  & /deep/ .el-dropdown {
    color: inherit;
    font-size: inherit;
  }
  .display();
  justify-content: flex-end;
}
.btn {
  .display();
  color: var(--main-color);
  position: relative;
  &:hover {
    color: var(--light-green);
    cursor: pointer;
  }
  & > span {
    margin-left: 3px;
    display: inline-block;
  }
  .btn-icon {
    margin-left: 5px;
  }
  padding-right: 10px;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 1px;
    position: absolute;
    right: 0;
    top: 0;
    background: var(--main-color);
  }
}
.btn-active {
  color: var(--light-green);
}
.btn:nth-last-child(1) {
  padding-right: 0;
  &::after {
    content: "";
    display: none;
  }
}
</style>
