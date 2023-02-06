/*
 * @Author: Yanc
 * @LastEditTime: 2023-02-04 20:17:03
 */
import formDesign from "./src/index.vue";

formDesign.install = function (Vue: any) {
  Vue.component(formDesign.name, formDesign);
};

export default formDesign;
