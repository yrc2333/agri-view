/*
 * @Author: Yanc
 * @LastEditTime: 2023-02-04 21:53:20
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vitejs/plugin-vue-jsx";
