/*
 * @Author: lzd
 * @Date: 2020-09-07 02:18:37
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-17 10:29:56
 * @Description: content description
 */

export default {
  components: {},
  data() {
    return {
      config: null
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  beforeMount() {
    try {
      let config = require("@config/" + this.$options.name + ".config.js");
      config && (this.config = config.default);
    } catch (e) {
      console.log("未找到" + this.$options.name + "组件的config配置文件");
    }
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
