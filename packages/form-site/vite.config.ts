/*
 * @Author: Yanc
 * @Date: 2023-02-04 20:30:33
 * @LastEditTime: 2023-02-17 16:05:54
 */
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  root: resolve(__dirname),
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
  build: {
    outDir: resolve(__dirname, "./dist"),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
