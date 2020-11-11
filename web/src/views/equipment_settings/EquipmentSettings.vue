<!--
 * @Author: lzd
 * @Date: 2020-09-11 09:04:21
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-30 14:40:09
 * @Description: content description
-->
<template>
  <div class="equipment-settings" v-loading="loading">
    <div class="message-row">
      <div class="message-row-label">信号开关：</div>
      <div class="message-row-content">
        <el-radio-group v-model="formData.signalSwitch">
          <el-radio :label="0">关闭</el-radio>
          <el-radio :label="1">开启</el-radio>
        </el-radio-group>
      </div>
      <div class="message-btn" @click="signalControl">
        设置
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">防御模式：</div>
      <div class="message-row-content">
        <el-radio-group v-model="formData.workMode">
          <el-radio :label="0">手动</el-radio>
          <el-radio :label="1">全自动</el-radio>
        </el-radio-group>
      </div>
      <div class="message-btn" @click="workModeControl">
        设置
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">数据存储设置：</div>
      <div class="message-row-content">
        <el-radio-group v-model="formData.detectDataflag">
          <el-radio :label="0">停止存储</el-radio>
          <el-radio :label="1">开始存储</el-radio>
        </el-radio-group>
      </div>
      <div class="message-btn" @click="surveyDataSave">
        设置
      </div>
    </div>
    <!-- <div class="message-row">
      <div class="message-row-label">agc功率衰减：</div>
      <div class="message-row-content">
        <el-slider class="slider" show-input v-model="power" :max="45" :min="0">
        </el-slider>
        <div class="message-btn" @click="powerControl">
          设置
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Api from "@api/HttpApi_jq.js";
export default {
  name: "EquipmentSettings",
  components: {},
  props: {
    HardWareSN: {}
  },
  data() {
    return {
      signal: ["0"],
      // power: 10,
      formData: {
        detectDataflag: 0,
        signalSwitch: 0,
        workMode: 0
      },
      loading: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    setDataGet() {
      Api.settings({ deviceId: this.HardWareSN }).then(res => {
        this.loading = false;
        // this.formData = res.data;
        this.$set(this, "formData", res.data);
      });
    },
    signalControl() {
      this.loading = true;
      Api.signalControl({
        deviceId: this.HardWareSN,
        signal: 0,
        isOpen: this.formData.signalSwitch
      }).then(res => {
        this.notify(res);
        this.setDataGet();
      });
    },
    workModeControl() {
      this.loading = true;
      Api.workModeControl({
        deviceId: this.HardWareSN,
        workMode: this.formData.workMode
      }).then(res => {
        this.notify(res);
        this.setDataGet();
      });
    },
    surveyDataSave() {
      this.loading = true;
      Api.surveyDataSave({
        deviceId: this.HardWareSN,
        flag: this.formData.detectDataflag
      }).then(res => {
        this.notify(res);
        this.setDataGet();
      });
    },
    powerControl() {
      this.loading = true;
      Api.powerControl({ deviceId: this.HardWareSN, power: this.power }).then(
        res => {
          this.notify(res);
          this.setDataGet();
        }
      );
    },
    notify(res) {
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
    }
  },
  created() {
    this.setDataGet();
    this.timer = setInterval(() => {
      this.setDataGet();
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
.equipment-settings {
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
  min-height: 40px;
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
.slider {
  width: calc(100% - 68px);
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
/deep/ .el-slider__runway.show-input {
  margin-right: 50px;
}
/deep/ .el-slider__input {
  width: 50px;
}
/deep/ .el-input-number__decrease {
  display: none;
}
/deep/ .el-input-number__increase {
  display: none;
}
/deep/ .el-input-number .el-input__inner {
  padding: 0;
}
</style>
