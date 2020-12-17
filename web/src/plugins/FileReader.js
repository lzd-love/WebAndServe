/*
 * @Author: lzd
 * @Date: 2020-09-23 17:14:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-25 13:47:37
 * @Description: 照下面的用法用
 *function fileChange(event){
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.readFile(file)
		reader.loadend().then((e)=>{
			// console.log(e.target.result)
			let blob = new MyBlob([reader.fileReader.result],{type:"application/octet-stream"});
			blob.downloadByATag("我爱你.txt");
		})
	}
 */
class MyFileReader {
  constructor() {
    this.fileReader = new window.FileReader();
    this.loadend();
  }
  /**
   * @description: 读取文件
   * @param {*} file:file 对象 或者 blob 对象
   * @return {*}
   */
  readFile(file){
    this.fileReader.readAsArrayBuffer(file)
  }
  /**
   * @description: 文件加载完成的时间监听
   * @param {*}
   * @return {*}
   */
  loadend(){
    return new Promise((resolve,reject)=>{
      this.fileReader.addEventListener('loadend', resolve);
      return (resolve,reject)
    })
  }
}

export default MyFileReader;
