<!--
 * @Author: lzd
 * @Date: 2020-10-19 10:43:53
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-23 16:16:09
 * @Description: content description
-->
<template>
  <div class="navabar">
    <div class="left-view">
      <el-menu
        class="menu-bar"
        :default-active="active"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="transparent"
        text-color="var(--sub-color)"
        active-text-color="var(--nav-active-bar)"
        style="border:none"
        :default-openeds="['3']"
      >
        <el-menu-item index="1">设备管理</el-menu-item>
        <el-menu-item index="2">版本更新</el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="3-1">密码更改</el-menu-item>
          <!-- <el-menu-item index="3-2">子账户管理</el-menu-item> -->
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navabar",
  components: {},
  data() {
    return {
      keyPathMap: new Map([
        ["1", "statuslist"],
        ["2", "multiupdate"],
        ["3-1", "changepassword"]
      ]),
      locationPathname: ""
    };
  },
  computed: {
    pathName() {
      // return location.pathname.replace("/", "")
      return this.locationPathname;
    },
    active() {
      let find = Array.from(this.keyPathMap).find(item => {
        return item[1] == this.pathName;
      });
      return find ? find[0] : "1";
    }
  },
  watch: {
    active(val) {
      console.log(val);
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      let path = this.keyPathMap.get(key);
      if (location.pathname.replace("/", "") != path) {
        this.$router.push({ name: path });
      }
      return key, keyPath;
    }
  },
  created() {
    let that = this;
    this.$set(this, "locationPathname", location.pathname.replace("/", ""));
    window.onpopstate = function() {
      that.$set(that, "locationPathname", location.pathname.replace("/", ""));
    };
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
.left-view {
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
  width: 11vw;
  background: var(--nav-bac-bar);
  font-size: 15px;
  overflow: hidden;
}
/deep/ .el-submenu .el-menu-item {
  min-width: auto;
}
/deep/ .el-menu-item:focus,
/deep/ .el-submenu__title:focus {
  background: transparent !important;
}
/deep/ .el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background: var(--nav-hover) !important;
}
/deep/ .el-menu-item,
/deep/ .el-submenu__title {
  font-size: 15px;
}
/deep/ .el-menu--inline li {
  font-size: 13px;
}
</style>
