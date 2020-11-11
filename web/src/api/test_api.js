/*
 * @Author: lzd
 * @Date: 2020-09-06 18:34:53
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-21 16:54:33
 * @Description: content description
 */
import axios from "axios";

class Api {
  testAplicationProxy(data) {
    return axios.post("/api", data || {});
  }
  downloadFile() {
    return axios({
      method: "post",
      url: "api/user/",
      data: {
        firstName: "Fred",
        lastName: "Flintstone"
      },
      responseType: "blob"
    })
      .then(response => {
        download(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function download(data) {
  if (!data) {
    return;
  }
  let blob = new Blob([data]);
  let fileName = "excel.xls";
  if ("download" in document.createElement("a")) {
    // 不是IE浏览器
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 下载完成移除元素
    window.URL.revokeObjectURL(url); // 释放掉blob对象
  } else {
    // IE 10+
    window.navigator.msSaveBlob(blob, fileName);
  }
}
export default new Api();
