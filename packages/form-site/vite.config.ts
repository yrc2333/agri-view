/*
 * @Author: Yanc
 * @Date: 2023-02-04 20:30:33
 * @LastEditTime: 2023-02-17 14:53:35
 */
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: [], // Avoid parsing src/components.  避免解析到src/components
      deep: false,
      resolvers: [ArcoResolver()],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
