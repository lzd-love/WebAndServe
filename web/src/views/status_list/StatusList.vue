<!--
 * @Author: lzd
 * @Date: 2020-09-17 09:18:27
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-11 11:13:03
 * @Description: content description
-->
<template>
  <div class="status-list" v-loading="loading">
    <div class="left-view">
      <div
        class="card list-item"
        v-for="(item, index) in statusData"
        :key="index + 'list'"
      >
        <div
          class="card-content"
          :class="item.deviceId == deviceId && pageType ? 'item-active' : ''"
        >
          <div class="list-item-title">
            <div>
              <span>设备编号：</span>
              <span>{{ item.deviceId }}</span>
            </div>
            <div>
              <span>设备名称：</span>
              <span>{{ item.deviceName }}</span>
            </div>
          </div>
          <div class="list-item-consignment">
            <div class="row-label">设备实时信息：</div>
            <div class="row-content">
              <div>
                <span>运行状态：</span>
                <span>{{ item.workState }}</span>
              </div>
              <div>
                <span>设备仿真状态：</span>
                <span>{{ item.curSimState }}</span>
              </div>
              <div>
                <span>授时信息：</span>
                <span>{{ item.curTime }}</span>
              </div>
            </div>
          </div>
          <div class="list-item-trigger">
            <div class="row-label"></div>
            <div class="row-content">
              <div>
                <span>信号开关状态：</span>
                <span>{{ getSwitchStatus(item.signalSwitch) }}</span>
              </div>
              <div>
                <span>AGC功率衰减值：</span>
                <span>{{ item.agc }}</span>
              </div>
              <div>
                <span>经纬高：</span>
                <span
                  >（{{ item.curLong }} , {{ item.curLat }} ,
                  {{ item.curHeight }}）</span
                >
              </div>
            </div>
          </div>
          <div
            class="list-item-trigger"
            v-if="item.appInfo && item.appInfo.length > 0"
          >
            <div class="row-label">软件版本信息：</div>
            <div class="row-content">
              <div
                v-for="(zitem, zindex) in item.appInfo"
                :key="zindex + 'appInfo'"
              >
                <span>{{ zitem.appName }}：</span>
                <span>{{ zitem.appVersion }}</span>
              </div>
            </div>
          </div>
          <div class="control-box" @click="frameShow = !frameShow">
            <div
              :class="
                item.deviceId == deviceId && 3 == pageType ? 'btn-active' : ''
              "
              @click="changePageType(3, item.deviceId)"
              class="btn"
            >
              <span class="btn-icon iconfont icon-ecs-running"></span>
              <span class="btn-name">运行状态</span>
            </div>
            <div
              class="btn"
              :class="
                item.deviceId == deviceId && 1 == pageType ? 'btn-active' : ''
              "
              @click="changePageType(1, item.deviceId)"
            >
              <span class="btn-icon iconfont icon-shezhi"></span>
              <span class="btn-name">设备设置</span>
            </div>
            <div
              class="btn"
              :class="
                item.deviceId == deviceId && 2 == pageType ? 'btn-active' : ''
              "
              @click="changePageType(2, item.deviceId)"
            >
              <span class="btn-icon iconfont icon-jilu"></span>
              <span class="btn-name">探测记录</span>
            </div>
            <div
              :class="
                item.deviceId == deviceId && 4 == pageType ? 'btn-active' : ''
              "
              @click="changePageType(4, item.deviceId)"
              class="btn"
            >
              <span class="btn-icon iconfont icon-rizhi"></span>
              <span class="btn-name">日志下载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in" duration="100" v-if="deviceId && pageType">
      <div class="right-view">
        <div class="card">
          <div class="card-content">
            <component :is="pageTage" :HardWareSN="deviceId"></component>
          </div>
        </div>
      </div>
    </transition>
    <div class="badge">
      <el-popover placement="right" trigger="click" class="btn">
        <el-table
          :data="offlineData"
          border
          height="500"
          :header-cell-style="{ textAlign: 'left' }"
          :cell-style="{ textAlign: 'left' }"
        >
          <el-table-column
            property="deviceId"
            width="100"
            label="设备编号"
          ></el-table-column>
          <el-table-column
            property="deviceName"
            width="100"
            label="设备名称"
          ></el-table-column>
          <el-table-column property="address" label="设备位置" width="220">
            <template slot-scope="scope">
              <span
                >({{ scope.row.curLong }},{{ scope.row.curLat }},{{
                  scope.row.curHeight
                }})</span
              >
            </template>
          </el-table-column>
        </el-table>

        <el-badge
          :value="offlineData.length"
          class="item"
          slot="reference"
          v-if="offlineData.length > 0"
        >
          <el-button size="small" class="badge-btn">离线列表</el-button>
        </el-badge>
      </el-popover>
    </div>
  </div>
</template>

<script>
import mixins from "@plugins/mixins.js";
// import MyBlob from "@plugins/Blob.js";
import websocketApi from "@api/WsApi.js";
export default {
  mixins: [mixins],
  name: "StatusList",
  components: {
    EquipmentSettings: () =>
      import("../equipment_settings/EquipmentSettings.vue"),
    EquipmentStatus: () => import("../equipment_status/EquipmentStatus.vue"),
    ProbeRecord: () => import("../probe_record/ProbeRecord.vue"),
    LogRecord: () => import("../log_record/LogRecord.vue")
  },
  data() {
    return {
      loading: true,
      selectOptions: [
        {
          value: "/upload/LinuxApp",
          label: "LinuxApp"
        }
      ],
      selectVal: "",
      pageMap: new Map([
        [1, "EquipmentSettings"],
        [2, "ProbeRecord"],
        [3, "EquipmentStatus"],
        [4, "LogRecord"]
      ]),
      frameShow: true,
      ss: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
      pageType: null,
      deviceId: null,
      statusData: [
        {
          deviceId: 1,
          deviceSn: "123456",
          deviceName: "设备1",
          workState: "运行中",
          curTime: "2020-10-24 16:30:05",
          curLong: "12.874306",
          curLat: "28.232434",
          curHeight: "80.65",
          signalSwitch: "1",
          curSimState: "仿真完成",
          agc: "30",
          appInfo: [
            {
              appName: "测试",
              appVersion: "v1.1"
            }
          ]
        }
      ],
      offlineData: [
        {
          deviceId: 2,
          deviceSn: "543264",
          deviceName: "设备2",
          curLong: "12.874306",
          curLat: "28.232434",
          curHeight: "80.65"
        }
      ]
    };
  },
  computed: {
    host() {
      return window.location.host;
    },
    pageTage() {
      return this.pageMap.get(this.pageType);
    },
    deviceIdToFalse() {
      return this.offlineData.find(item => {
        return item.deviceId == this.deviceId;
      });
    }
  },
  watch: {
    deviceIdToFalse(val) {
      if (val) {
        this.deviceId = false;
      }
    },
    pageTage(val) {
      console.log(val);
    }
  },
  methods: {
    getSwitchStatus(val) {
      return val == 1 ? "开启" : "关闭";
    },
    upgrade(data) {
      if (data.status === "fail") {
        this.$notify({
          title: "警告",
          message: "上传失败",
          type: "warning"
        });
      } else if (data.status === "success") {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success"
        });
      }
    },
    dealGrade(file) {
      let blob = new Blob([file]);
      console.log(file, blob);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changePageType(pageType, deviceId) {
      this.pageType =
        this.pageType == pageType && this.deviceId == deviceId
          ? null
          : pageType;
      this.deviceId = deviceId;
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
    },
    websocketStart() {
      let that = this;
      websocketApi.devicestatus(function(res) {
        that.loading = false;
        const data = JSON.parse(res.data);
        if (data.onLine) {
          that.$set(that, "statusData", data.onLine);
        }
        if (data.offLine) {
          that.$set(that, "offlineData", data.offLine);
        }
      });
    },
    timeConversion(str) {
      if (!str) return;
      let getVal =
        str.slice(0, 4) +
        "-" +
        str.slice(4, 6) +
        "-" +
        str.slice(6, 8) +
        " " +
        str.slice(8, 10) +
        ":" +
        str.slice(10, 12) +
        ":" +
        str.slice(12);
      return getVal;
    }
  },
  created() {
    this.websocketStart();
  },
  mounted() {
    websocketApi.close();
    this.websocketStart();
    this.timer = setInterval(() => {
      if (websocketApi.status) {
        clearInterval(this.timer);
      } else {
        this.websocketStart();
      }
    }, 3000);
  },
  updated() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
    websocketApi.close();
  }
};
</script>

<style scoped lang="less">
@import url("@assets/less/mixins.less");
.system-btn {
  display: flex;
  align-items: center;
  color: var(--main-color);
  font-size: 16px;
}
.system-administrator {
  display: flex;
  align-items: center;
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
/deep/ .el-submenu__title {
  font-size: 12px;
  color: var(--main-color) !important;
  font-size: 16px;
}
/deep/ .menu-bar > li {
  border-bottom: 1px solid #928f84;
}
/deep/ .menu-bar > li:nth-last-child(1) {
  border-bottom: none;
}
.card {
  background: linear-gradient(var(--light-blue), var(--light-blue)) left top,
    linear-gradient(var(--light-blue), var(--light-blue)) left top,
    linear-gradient(var(--light-blue), var(--light-blue)) right top,
    linear-gradient(var(--light-blue), var(--light-blue)) right top,
    linear-gradient(var(--light-blue), var(--light-blue)) right bottom,
    linear-gradient(var(--light-blue), var(--light-blue)) right bottom,
    linear-gradient(var(--light-blue), var(--light-blue)) left bottom,
    linear-gradient(var(--light-blue), var(--light-blue)) left bottom;
  background-repeat: no-repeat;
  background-size: 1px 20px, 20px 1px;
  width: 100%;
  height: auto;
  padding: 2px;
}
.card-content {
  color: var(--sub-color);
  background: rgba(33, 50, 66, 0.2);
  padding: 20px;
}
.list-item .card-content {
  & > div {
    .display();
    justify-content: flex-start;
    margin-bottom: 15px;
    &:nth-last-child(2) {
      margin-bottom: 0px;
    }
  }
}
.list-item {
  position: relative;
  margin-bottom: 10px;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
}
.list-item-title {
  font-weight: bold;
  font-size: 15px;
  & > div {
    // width: 150px;
    margin-right: 23px;
    text-align: left;
  }
}
.row-content {
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -8px;
    left: -5px;
    right: 0;
    border-top: 1px dotted gray;
  }
}
.control-box {
  position: absolute;
  right: 20px;
  top: 22px;
  .display();
  & > .btn {
    width: 110px;
    text-align: center;
  }
}
.item-active .control-box {
  background: inherit;
}
.row-label {
  width: 110px;
  text-align: left;
}
.row-content {
  width: calc(100% - 150px);
  .display();
  justify-content: flex-start;

  & > div {
    padding: 0 20px;
    position: relative;
    &::after {
      content: "";
      display: block;
      height: 100%;
      width: 1px;
      position: absolute;
      top: 0;
      right: 0;
      background: var(--main-color);
    }
    &:nth-child(1)::before {
      content: "";
      display: block;
      height: 100%;
      width: 1px;
      position: absolute;
      top: 0;
      left: 0;
      background: var(--main-color);
    }
  }
}
.left-view {
  width: 100%;
  height: 100%;
}
.right-view {
  width: 800px;
  height: 100%;
  overflow: hidden;
  padding-left: 50px;
  & > .card {
    height: 100%;
  }
  .card-content {
    height: 100%;
  }
}
.item-active {
  background: var(--bac-active);
}
.badge {
  position: fixed;
  left: calc(15px + 11vw);
  bottom: 10px;
  & .el-dialog__wrapper {
    background-image: linear-gradient(
      to bottom right,
      #4acea9,
      rgb(70, 96, 144),
      #53c3a1
    );
  }
  ::-webkit-scrollbar-thumb {
    background: inherit;
  }
  .badge-btn {
    color: white;
    background: #416d79;
  }
  /deep/ .el-popover {
    background: transparent;
  }
}
.disabled {
  // pointer-events: none; // 设置pointer-events: none;再设置cursor是没有效果的
  cursor: no-drop !important;
  color: gray;
  &:hover {
    color: gray;
  }
}
</style>
