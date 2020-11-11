/*
 * @Author: lzd
 * @Date: 2020-10-26 14:44:48
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-02 14:14:26
 * @Description: content description
 */
import axios from "axios";

class Api {
  constructor() {
    this.baseUrl = "/api";
    // this.baseUrl = "http://10.129.41.91:7080";
  }

  /**
   * @description: 登录
   * @param  {userName,passWord}
   * @return {*}
   */
  login(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/login", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 修改密码
   * @param {userId,oldPassword,newPassword}
   * @return {*}
   */
  updatePwd(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/updatePwd", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 设备详情
   * @param {deviceId}
   * @return {*}
   */
  device(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/singalDevice", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 设备设置查询
   * @param {deviceId}
   * @return {*}
   */
  settings(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/settings", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 信号开关
   * @param {deviceId,signal,isOpen}
   * @return {*}
   */
  signalControl(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/signalControl", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 功率设置
   * @param {deviceId,power}
   * @return {*}
   */
  powerControl(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/powerControl", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 防御模式设置
   * @param {deviceId,workMode}
   * @return {*}
   */
  workModeControl(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/workModeControl", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 探测数据存储设置
   * @param {deviceId,flag}
   * @return {*}
   */
  surveyDataSave(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/surveyDataSave", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 日志查询
   * @param {deviceId}
   * @return {*}
   */
  historyLog(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/historyRecord", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 日志下载
   * @param {deviceId,fileName}
   * @return {*}
   */
  historyLogDownLoad(data) {
    const instant = axios.create({
      withCredentials: true,
      timeout: 600000
    });
    return new Promise((resolve, reject) => {
      instant
        .post(this.baseUrl + "/historyDownLoad", data || {}, {
          responseType: "blob",
          timeout: 60000
        })
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  /**
   * @description: 探测记录查询
   * @param {deviceId}
   * @return {*}
   */
  survey(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/surveyRecord", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 探测记录下载
   * @param {deviceId,fileName}
   * @return {*}
   */
  surveyDownLoad(data) {
    const instant = axios.create({
      withCredentials: true,
      timeout: 600000
    });
    return new Promise((resolve, reject) => {
      instant
        .post(this.baseUrl + "/surveyDownLoad", data || {}, {
          responseType: "blob",
          timeout: 60000
        })
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  /**
   * @description: 更新主体查询
   * @param {*}
   * @return {*}
   */
  appVersion(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/appVersion", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 更新主体下可选列表查询
   * @param {name,version}
   * @return {*}
   */
  versionControl(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/versionControl", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

export default new Api();
