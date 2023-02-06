/*
 * @Author: Yanc
 * @LastEditTime: 2023-02-06 17:28:06
 */
import formGenerate from "./src/index.vue";

formGenerate.install = function (Vue: any) {
  Vue.component(formGenerate.name, formGenerate);
};

export default formGenerate;
