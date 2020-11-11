<!--
 * @Author: lzd
 * @Date: 2020-09-18 11:33:29
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-10 09:31:45
 * @Description: content description
-->
<template>
  <div class="log-record" v-loading="loading">
    <el-table :data="tableData" border height="100%" style="height: 100%;">
      <el-table-column
        prop="time"
        label="时间"
        sortable
        :filters="dateFilterData"
        :filter-method="filterMethon"
      >
        <template slot-scope="scope">
          <div>
            <!-- {{scope.row.sj}} -->
            <div>{{ scope.row.time.split(" ")[0] }}</div>
            <div>{{ scope.row.time.split(" ")[1] }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="fileName"
        label="文件名"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="download-btn" @click="fileDown(scope.row)">下载</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "@api/HttpApi_jq.js";
import MyBlob from "@plugins/Blob.js";
export default {
  name: "LogRecord",
  components: {},
  props: {
    HardWareSN: {}
  },
  data() {
    return {
      loading: true,
      tableData: [
        {
          time: "2020-09-17 16:00:00",
          fileName: "log20201025000000",
          fileSize: "5120"
        },
        {
          time: "2020-09-17 15:00:00",
          fileName: "log20201025000001",
          fileSize: "5120"
        }
      ]
    };
  },
  computed: {
    dateFilterData() {
      let arr = [];
      for (let i = 1; i <= 31; i++) {
        let dateStr = this.$moment();
        let item = dateStr.subtract(31 - i, "days").format("YYYY-MM-DD");
        arr.push({ text: item, value: item });
      }
      return arr.reverse();
    }
  },
  watch: {},
  methods: {
    listGet() {
      Api.historyLog({ deviceId: this.HardWareSN }).then(res => {
        this.loading = false;
        this.$set(this, "tableData", res.data);
      });
    },
    filterMethon(value, row, column) {
      // console.log(value, row, column);
      const property = column["property"];
      return row[property].indexOf(value) > -1;
    },
    fileDown(row) {
      let obj = {
        deviceId: this.HardWareSN,
        fileName: row.fileName
      };
      let dom = event.target;
      !(Array.from(dom.classList).indexOf("disabled") > -1) &&
        (() => {
          this.$confirm("确定要下载该文件吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.$notify({
                type: "info",
                message: row.fileName + "文件下载中!"
              });
              dom.classList.add("disabled");
              setTimeout(() => {
                dom.classList.remove("disabled");
              }, 60000);
              Api.historyLogDownLoad(obj).then(res => {
                // console.log(res);
                let blob = new MyBlob([res.data], {
                  type: "text/plain;"
                });
                let filename = res.headers["content-disposition"]
                  ? res.headers["content-disposition"].split("=")[1]
                  : "";
                if (filename) {
                  this.$notify({
                    type: "success",
                    message: filename + "文件下载成功!"
                  });
                  blob.downloadByATag(filename);
                } else {
                  this.$notify({
                    type: "warning",
                    message: row.fileName + "文件损坏!"
                  });
                }
                dom.classList.remove("disabled");
              });
            })
            .catch(() => {});
        })();
    }
  },
  created() {
    this.listGet();
    this.timer = setInterval(() => {
      this.listGet();
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
.log-record {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: left;
  overflow-x: hidden;
  color: var(--main-color);
}
.download-btn {
  cursor: pointer;
  &:hover {
    color: var(--light-green);
  }
}
.disabled {
  // pointer-events: none; // 设置pointer-events: none;再设置cursor是没有效果的
  cursor: no-drop;
  color: gray;
  &:hover {
    color: gray;
  }
}
</style>
