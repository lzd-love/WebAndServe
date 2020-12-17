/*
 * @Author: lzd
 * @Date: 2020-09-23 16:16:38
 * @LastEditors: lzd
 * @LastEditTime: 2020-11-10 09:16:29
 * @Description: content description
 */

/**
常见的媒体格式类型如下
text/html;charset=UTF-8:HTML格式
text/plain:纯文本格式
text/xml:XML格式
image/gif:gif图片格式
image/jpeg:jpg图片格式
image/png:png图片格式


以application开头的媒体格式类型：
application/xhtml+xml:XHTML格式
application/xml:XML数据格式
application/atom+xml:Atom XML聚合格式
application/json:JSON数据格式
application/pdf:pdf格式
application/msword:Word文档格式
application/octet-stream:二进制流数据（常见的文件下载)
application/x-www-form-urlencoded:表单中默认的encType,表单数据被编码为key/value格式发送到服务器
另外一种常见的媒体格式是上传文件时使用：
application/vnd.ms-excel :xls
application/x-tar :x-tar
multipart/form-data:需要在表单中进行文件上传时，就需要使用该格式
{ type: "" }
 */
class MyBlob {
  constructor(arraybuffer, options) {
    this.a = document.createElement("a");
    this.blob = options
      ? new Blob(arraybuffer, options)
      : new Blob(arraybuffer);
  }
  downloadByATag(name) {
    this.objectUrl = window.URL.createObjectURL(this.blob);
    this.a.setAttribute("href", this.objectUrl);
    name && this.a.setAttribute("download", name);
    this.a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(this.objectUrl);
    }, 10000);
  }
}

export default MyBlob;
