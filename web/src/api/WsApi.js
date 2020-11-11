/*
 * @Author: lzd
 * @Date: 2020-09-21 17:05:30
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-26 15:41:44
 * @Description: content description
 */

class wsApi {
  constructor() {
    this.baseUrl = "ws://" + location.host + "/ws";
    // this.baseUrl = "ws://10.129.41.91:7090";
    this.status = null;
    this.resolve = null;
  }
  start(resolve) {
    this.resolve = resolve;
    this.status = 1; //0关，1开
    this.websocket.onmessage = res => {
      resolve(res);
    };
    this.websocket.onopen = message => {
      console.log(message);
    };
    this.websocket.onerror = evnt => {
      console.log("发生错误", evnt);
    };
    this.websocket.onclose = evnt => {
      console.log("连接断开", evnt);
      //连接关闭启动定时任务 五秒后在创建
      this.reConnection();
    };
  }
  close() {
    this.status = 0;
    this.websocket.close();
  }
  reConnection() {
    setTimeout(() => {
      this.status && this.start(this.resolve);
    }, 1000);
  }

  devicestatus(resolve) {
    //Online Offline
    // const url = "/Devicestatus";
    const url = "";
    this.websocket = new WebSocket(this.baseUrl + url);
    this.start(resolve);
  }
}
export default new wsApi();
