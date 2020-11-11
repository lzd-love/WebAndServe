/*
 * @Author: lzd
 * @Date: 2020-09-22 09:03:47
 * @LastEditors: lzd
 * @LastEditTime: 2020-10-13 10:59:48
 * @Description: content description
 */
import axios from "axios";

// axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     let token = window.sessionStorage.getItem("token");
//     if (token) {
//       config.headers.accessToken = token; //将token放到请求头发送给服务器
//       return config;
//       //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//       // config.headers['accessToken'] = Token;
//     }
//   },
//   function(error) {
//     // Do something with request error
//     console.log(error)
//     // return Promise.reject(error);
//   }
// );
//做个路由拦截

class Api {
  constructor() {
    this.baseUrl = "/api";
    // this.baseUrl = "http://10.129.41.91:7080";
  }

  /** 登录 /login/NormalLogin
        post:{
            username,  {用户名} //
            password   {密码} //
        }
        return:{
            status,    {状态} //success（成功），fail（失败）
            rank,       {token} //
            msg        {返回信息} //
        }
    */
  login(data) {
    return axios.post(this.baseUrl + "/login/NormalLogin", data || {});
  }

  /** 探测记录 /proberecord/NormalDetect
        post:{
            HardWareSN,  {用户名} //设备sn码
        }
        return:{
            data:[{
                time, {时间} // YYYY-MM-DD HH:mm:ss 格式   列表按时间排序，发生时间更晚的排在前面
                direction, {方位} // 请转化为文字描述，并将类型种类与前端进行说明
                type,   {类型} // 如 疑似闪电 之类文字信息
                id, {记录id} // 记录id 可通过 该id 进行对应记录的文件下载
            }]
        }
    */
  probeRecord(data) {
    return axios.post(this.baseUrl + "/proberecord/NormalDetect", data || {});
  }

  /**文件地址请求 /datafile/EmitFile
        post:{
            HardWareSN,  {用户名} //设备sn码
        }
        return:{"data":[
            {
            "DataTime":  时间，4
            "FileType": 文件类型,      // "EletrigFile"-电场通道文件类型、"MagtrigOneFile"-磁场通道1号文件类型、"MagtrigSecFile"-磁场通道2号文件类型
            "FileName":文件名
            }，
            {
            "DataTime":  时间，
            "FileType": 文件类型,
            "FileName":文件名
            }]
        }
    */
  datafileEmitFile(data) {
    return axios.post(this.baseUrl + "/datafile/EmitFile", data || {});
  }

  /** 设备探测记录项信息获取 /download
        post:{
            HardWareSN, {硬件序列码} //设备sn码
            filename,  {fileid} // 对应/proberecord协议的记录id
        }
        return:{
            binary
        }
    */
  download(data, type) {
    //type Eletrig 电，MagtrigOne 磁1，MagtrigSec 磁2
    const instant = axios.create({
      withCredentials: true,
      timeout: 600000
    });
    return instant.post(
      this.baseUrl + "/download/" + (type ? type : ""),
      data || {},
      {
        responseType: "blob",
        timeout: 60000
      }
    );
  }

  /** 设备更新包上传 /upload/LinuxApp
        post:{
            HardWareSN,  {硬件序列码} //设备sn码
            binary  {文件流} //文件流
        }
        return:{
            status,    {状态} //success（成功），fail（失败）
            msg        {返回信息} //
        }
    */

  /** 设备设置项信息查询 /devicesettings/ParaConfig
        post:{
            HardWareSN,  {硬件序列码} //设备sn码
        }
        return:{
            operatingMode,  {设备工作模式} // 停止工作（0） 配置模式（1），正常工作（2）
            TriggerMode,    {触发模式}  // 能量（1），阈值（2）
            EletrigPara,    {电场路通道参数}
            MagtrigParaOne, {磁场路1号通道参数}
            MagtrigParaSec, {磁场路2号通道参数}
            DataBitTranflag, {数据位数转换标志} //32位（1），24位（2）
        }
    */
  deviceSettings(data) {
    return axios.post(this.baseUrl + "/devicesettings/ParaConfig", data || {});
  }

  /** 设备设置 /devicesettings/Seting
        post:{
            HardWareSN,  {用户名} // 设备sn码
            setKey，    {设置项} // 与/devicesettings协议的对象键值对应
            setVal, {设置的值} // 为对应的键设置值
        }
        return:{
            status, {返回结果} // success（成功），fail（失败）
            msg,    {提示信息} // 字符串，如 “更改成功”
        }
    */
  deviceSettingsSet(data) {
    return axios.post(this.baseUrl + "/devicesettings/Seting", data || {});
  }

  /** 设备调试项信息获取 /equipmentdebugging
        post:{
            HardWareSN,  {用户名} // 设备sn码
        }
        return:{
            timingInformation, {授时信息校验结果}
            signalFrequency,    {内部校验信号平路}
        }
    */
  equipmentDebugging(data) {
    return axios.post(this.baseUrl + "/equipmentdebugging", data || {});
  }

  /** 设备调试项信息获取 /equipmentdebugging/check
        post:{
            HardWareSN,  {用户名} // 设备sn码
            checkItem    {校验项} // 与/equipmentdebugging协议的对象键值对应
        }
        return:{
            status, {返回结果} // success（成功），fail（失败）
            msg    {提示信息} // 字符串，如 “校验成功”
        }
    */
  equipmentDebuggingCheck(data) {
    return axios.post(this.baseUrl + "/equipmentdebugging/check", data || {});
  }
}

export default new Api();
