/*
 * @Author: lzd
 * @Date: 2020-09-07 14:15:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 11:37:24
 * @Description: content description
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    progressEquipments: [
      {
        name:"花卉市场",
        progress:"100",
        appName:"Xshell.exe",
        appVersion:"v1.0"
      }
    ] //type object; params:(id,lable)
  },
  getters: {},
  mutations: {
    updateProgressEquipments(state, val) {
      state.equipmentMessage = val;
    }
  },
  actions: {},
});
