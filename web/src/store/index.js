/*
 * @Author: lzd
 * @Date: 2020-09-07 14:15:07
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-10 15:46:20
 * @Description: content description
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    equipmentMessage: {} //type object; params:(id,lable)
  },
  mutations: {
    setEquipmentMessage(state, val) {
      state.equipmentMessage = val;
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
