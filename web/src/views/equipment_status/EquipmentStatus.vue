<!--
 * @Author: lzd
 * @Date: 2020-09-11 09:04:21
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-30 14:39:57
 * @Description: content description
-->
<template>
  <div class="equipment-status" v-loading="loading">
    <div class="message-row message-box">
      <div class="message-row-label">GPS相关信息：</div>
      <div class="message-row-content">
        <div class="message-row">
          <div class="message-row-label">星历更新时间：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gpsEphTime"
                ref="EletrigParaInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">更新状态：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gpsEphState"
                ref="MagtrigParaOneInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">获取星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gpsVisible"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">仿真星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gpsSimSat"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-row message-box">
      <div class="message-row-label">GLO相关信息：</div>
      <div class="message-row-content">
        <div class="message-row">
          <div class="message-row-label">星历更新时间：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gloEphTime"
                ref="EletrigParaInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">更新状态：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gloEphState"
                ref="MagtrigParaOneInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">获取星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gloVisible"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">仿真星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.gloSimSat"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-row message-box">
      <div class="message-row-label">BDS相关信息：</div>
      <div class="message-row-content">
        <div class="message-row">
          <div class="message-row-label">星历更新时间：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.bdsEphTime"
                ref="EletrigParaInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">更新状态：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.bdsEphState"
                ref="MagtrigParaOneInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">获取星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.bdsVisible"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
        <div class="message-row">
          <div class="message-row-label">仿真星数：</div>
        </div>
        <div class="message-row">
          <div class="message-row-content">
            <div class="adc-input-box">
              <el-input
                disabled
                v-model="equData.bdsSimSat"
                ref="MagtrigParaSecInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@api/HttpApi_jq.js";
export default {
  name: "EquipmentStatus",
  components: {},
  props: {
    HardWareSN: {}
  },
  data() {
    return {
      equData: {
        gpsEphTime: "2020-10-24 16:52:33",
        gloEphTime: "2020-10-24 16:52:33",
        bdsEphTime: "2020-10-24 16:52:33",
        gpsEphState: "获取",
        gloEphState: "获取",
        bdsEphState: "获取",
        gpsVisible: "8",
        gloVisible: "8",
        bdsVisible: "8",
        gpsSimSat: "9",
        gloSimSat: "9",
        bdsSimSat: "9"
      },
      loading: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    dataGet() {
      Api.device({ deviceId: this.HardWareSN }).then(res => {
        this.loading = false;
        this.$set(this, "equData", res.data);
      });
    }
  },
  created() {
    this.dataGet();
    this.timer = setInterval(() => {
      this.dataGet();
    }, 60000);
  },
  mounted() {},
  updated() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-status {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: left;
  overflow-x: hidden;
  color: var(--main-color);
}
.message-row {
  .display();
  justify-content: flex-start;
  padding: 0 10px;
  height: 40px;
  margin: 5px 0;
}
.message-row-label {
  width: 140px;
}
.message-row-content {
  flex: auto;
  .display();
  justify-content: flex-start;
}
.message-box {
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: flex-start;
  height: auto;
  & > .message-row-content {
    border: 1px solid var(--light-border-bottom);
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 15px;
  }
  .message-row {
    margin: 0;
    padding: 0;
    height: 30px;
  }
  .message-row:nth-child(even) {
    margin-bottom: 30px;
  }
  .message-row:nth-last-child(1) {
    margin-bottom: 20px;
  }
}
.ip-input {
  width: 120px !important;
}
.message-btn {
  margin-left: 20px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 0 10px;
  background: var(--submit-color);
  overflow: hidden;
  &:hover {
    background: var(--bac-active);
  }
}
/deep/ .el-switch__label {
  color: var(--main-color);
}
/deep/ .el-switch__label.is-active {
  color: var(--light-border-bottom);
}
/deep/ .el-input {
  width: auto;
}
/deep/ .el-input__inner {
  background-color: transparent;
  color: var(--main-color);
  border: none;
  // padding: 0;
  height: 40px;
  border-bottom: 1px solid var(--light-border-bottom);
  border-radius: 0;
}
/deep/ .el-form-item {
  margin: 0;
}
.ip-row /deep/ .el-form-item__content {
  .display();
  justify-content: flex-start;
}
.adc-input-box {
  display: flex;
  align-items: center;
  & /deep/ input {
    width: 150px !important;
    padding: 0 5px;
    margin-left: 10px;
  }
}
/deep/ .el-radio {
  color: inherit;
}
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: var(--light-green);
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  background: var(--light-green);
}
/deep/ .el-input.is-disabled .el-input__inner {
  cursor: auto;
}
</style>
