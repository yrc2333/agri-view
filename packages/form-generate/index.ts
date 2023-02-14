/*
 * @Author: Yanc
 * @LastEditTime: 2023-02-13 17:38:52
 */
import { App } from "vue";
import formGenerate from "./src/index.vue";

formGenerate.install = function (Vue: App) {
  Vue.component(formGenerate.name, formGenerate);
};

export default formGenerate;
