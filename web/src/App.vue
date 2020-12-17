<!--
 * @Author: lzd
 * @Date: 2020-09-07 14:15:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 11:05:02
 * @Description: content description
-->
<template>
  <div id="app" class="skin-original">
    <Header v-if="!isLogin" />
    <Navabar v-if="!isLogin" />
    <UpdateProgress v-if="!isLogin" />
    <transition name="el-fade-in-linear">
      <keep-alive include="StatusList">
        <router-view class="bottom-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    Header: () => import("./views/header/Header"),
    Navabar: () => import("./views/navabar/Navabar"),
    UpdateProgress: () => import("./views/update_progress/UpdateProgress")
  },
  computed: {
    isLogin() {
      return this.$route.name == "login";
    }
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  margin: 0;
  background: inherit;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  font-size: 14px;
}

body,
div {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 2px;
  background-color: inherit;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: inherit;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #414779;
}
/*定义最上方和最下方的按钮*/
::-webkit-scrollbar-button {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.bottom-view {
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 11vw;
  right: 0;
  background: rgba(55, 64, 72, 0.2);
  padding: 30px 15px 10px 15px;
  overflow-x: hidden;
  display: flex;
}
</style>
