<!--
 * @Author: lzd
 * @Date: 2020-10-19 16:28:27
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-13 17:04:39
 * @Description: content description
-->
<template>
  <div class="multi-update" v-loading="loading">
    <el-form ref="form" label-width="80px" size="mini">
      <!-- <el-form-item label="更新主体">
        <el-select v-model="selectVal" placeholder="请选择">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-select v-model="selectValbbh" placeholder="请选择">
          <el-option
            v-for="item in selectOptionsbbh"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="列表操作">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-input
          placeholder="请输入内容"
          v-model="search"
          style="width: 320px; margin-left: 35px"
        >
          <template slot="prepend">筛选:</template>
        </el-input>
      </el-form-item>
      <el-form-item label="设备列表" class="eq-list">
        <el-checkbox-group v-model="list">
          <el-checkbox
            :label="item"
            name="list"
            v-for="(item, index) in filterEquipmentList"
            :key="index + 'filterEquipmentList'"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="更新包">
        <el-upload
          class="upload-demo"
          ref="upload"
          :data="{
            length: idList.length + '#',
            deviceId: idList,
            fileLength: fileLength + '#',
          }"
          :action="'http://' + host + '/api' + '/fileUpload'"
          :limit="1"
          accept=".zip"
          :auto-upload="false"
          :on-change="upgrade"
          :before-upload="beforeUpload"
          style="width: 400px"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            :disabled="list.length == 0 || fileLength == 0"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            请上传zip文件，文件避免中文命名
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Api from "@api/HttpApi_jq.js";
export default {
  name: "MultiUpdate",
  components: {},
  data() {
    return {
      search: "",
      fileLength: 0,
      checkAll: false,
      selectVal: "all",
      selectValbbh: "all",
      selectData: [
        { name: "app1", version: ["V1.0", "V1.1"] },
        { name: "app2", version: ["V2.0", "V2.1"] },
      ],
      list: [],
      equOptions: [
        // {
        //   deviceId: 1,
        //   deviceName: "设备1"
        // },
        // {
        //   deviceId: 2,
        //   deviceName: "设备2"
        // },
      ],
      // equipmentList: ["设备1", "设备2", "设备3", "设备4"],
      loading: true,
    };
  },
  computed: {
    equipmentList() {
      return this.equOptions.map((item) => item.deviceName);
    },
    idList() {
      return this.list
        .map((item) => {
          return this.equOptions.find((i) => {
            return i.deviceName == item;
          }).deviceId;
        })
        .join(",");
    },
    selectOptions() {
      let arr = [];
      this.selectData.forEach((item) => {
        arr.push({ label: item.name, value: item.name });
      });
      return arr;
    },
    selectOptionsbbh() {
      let arr = [];
      let find = this.selectData.find((item) => {
        return item.name == this.selectVal;
      });
      if (find) {
        find.version.forEach((item) => {
          arr.push({ label: item, value: item });
        });
      }
      return arr;
    },
    host() {
      return window.location.host;
    },
    filterEquipmentList() {
      let filter = this.equipmentList.filter((item) => {
        return item.indexOf(this.search) > -1;
      });
      return filter;
    },
  },
  watch: {
    selectVal() {
      this.selectValbbh = "";
      this.$set(this, "equOptions", []);
    },
    selectValbbh(val) {
      this.list = [];
      this.checkAll = false;
      val && this.listDataGet();
    },
    list() {
      this.$set(this, "search", "");
    },
  },
  methods: {
    beforeUpload(data) {
      console.log(data);
      // this.$set(this,'fileLength',data.name?data.name.length:0)
    },
    selectDataGet() {
      Api.appVersion().then((res) => {
        this.loading = false;
        this.$set(this, "selectData", res.data);
      });
    },
    listDataGet() {
      // this.loading = true;
      Api.versionControl({
        name: this.selectVal,
        version: this.selectValbbh,
      }).then((res) => {
        this.loading = false;
        this.$set(this, "equOptions", res.data);
      });
    },
    handleCheckAllChange(val) {
      this.list = val ? this.filterEquipmentList : [];
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    isChinese(temp) {
      var re = /[^\u4E00-\u9FA5]/;
      if (re.test(temp)) return false;
      return true;
    },
    getChineseLength(str){
      let charLength = 0;
      for(let i = 0;i<=str.length;i++){
        this.isChinese(str[i])?(charLength+=1):""
      }
      return charLength
    },
    upgrade(data) {
      // console.log(data)
      debugger;
      this.$set(this, "fileLength", data.name ? data.name.length + this.getChineseLength(data.name) : 0);
      if (data.status === "fail") {
        this.$notify({
          message: "更新失败",
          type: "warning",
        });
      } else if (data.status === "success") {
        this.$notify({
          message: this.list.join(",") + "更新中",
          type: "info",
        });
        setTimeout(()=>{
          this.$notify({
            message: this.list.join(",") + "更新完成",
            type: "success",
          })
        },3000)
        this.$set(this, "fileLength", 0);
        // 重置选择，刷新列表
        this.checkAll = false;
        this.list = [];
        this.listDataGet();
      }
    },
  },
  created() {
    this.selectDataGet();
    this.listDataGet();
    this.timer = setInterval(() => {
      this.listDataGet();
    }, 30000);
  },
  mounted() {},
  updated() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style lang="less" scoped>
.multi-update {
  color: var(--main-color);
  text-align: left;
  .upload-demo {
    .el-upload__tip {
    }
  }
}
.list-content {
}
/deep/ .el-input-group__prepend {
  color: black;
}
.eq-list /deep/ .el-checkbox {
  width: 180px;
}
</style>
