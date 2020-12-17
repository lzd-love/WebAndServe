<!--
 * @Author: lzd
 * @Date: 2020-10-19 09:43:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 17:19:17
 * @Description: content description
-->
<template>
  <div class="update-progress">
    <div class="progress-box" v-if="isopen" ref="box">
      <div class="title">
        <div class="title-text">更新列表</div>
        <div class="title-btn el-icon-minus" @click="closeClick"></div>
      </div>
      <div class="content">
        <div class="item" v-for="(item,index) in progressEquipments" :key="index+'progress'">
          <div class="item-title">
            <div class="item-name">花卉市场</div>
            <div class="item-app">Xshell.exe:v1.0</div>
          </div>
          <div class="item-progress">
            <el-progress
              :percentage="80"
              :color="customColorMethod"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
    <el-badge ref="btn" v-if="!isopen" :value="3" class="badge">
      <div size="small" class="badge-btn" @click="openClick">更</div>
    </el-badge>
  </div>
</template>

<script>
export default {
  name: "UpdateProgress",
  components: {},
  data() {
    return {
      isopen: false,
      progressEquipments: [
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
        {
          name: "花卉市场",
          progress: "100",
          appName: "Xshell.exe",
          appVersion: "v1.0",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    openClick() {
      let el = this.$refs.btn.$el || this.$refs.btn;
      el.classList.add("invisible");
      setTimeout(() => {
        this.isopen = true;
      }, 250);
    },
    closeClick() {
      let el = this.$refs.box.$el || this.$refs.box;
      el.classList.add("invisible");
      setTimeout(() => {
        this.isopen = false;
      }, 250);
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style lang="less" scoped>
.progress-box {
  z-index: 10;
  position: fixed;
  right: 16px;
  bottom: 10px;
  height: calc(100% - 100px);
  width: 330px;
  background: black;
  box-shadow: 0 0 15px 1px white;
  border-radius: 10px;
  padding: 15px;
  background: #133744ed;
  color: var(--main-color);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px 15px 10px 15px;
    background: #133744ed;
    border-bottom: 1px solid var(--sub-color);
    border-radius: 10px;
  }
  .title-btn {
    cursor: pointer;
  }
  .content{
    margin-top: 30px;
    height: calc(100% - 30px);
    overflow-x: hidden;
  }
}
.badge {
  z-index: 10;
  position: fixed;
  right: 16px;
  bottom: 10px;
  ::-webkit-scrollbar-thumb {
    background: inherit;
  }
  .badge-btn {
    color: white;
    background: #416d79;
    box-shadow: 0 0 15px 1px white;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  /deep/ .el-popover {
    background: transparent;
  }
}
.invisible {
  opacity: 0;
  transition-duration: 0.25s;
  transform: translate(45%, 50%) scale(0.1);
}
.item {
  padding: 10px 0;
  border-bottom: 1px solid var(--sub-color);
  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &:nth-last-child(1) {
    border: none;
  }
  .item-progress{
    margin-top: 5px;
  }
}
/*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: rgb(47, 255, 82);
// }
/deep/ .el-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/deep/ .el-progress__text{
  color: var(--main-color);
}
</style>
