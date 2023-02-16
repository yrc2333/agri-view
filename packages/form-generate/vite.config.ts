/*
 * @Author: Yanc
 * @Date: 2023-02-04 20:30:33
 * @LastEditTime: 2023-02-16 17:54:10
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
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "../src"),
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js", // compile template
      },
    ],
    extensions: [".ts", ".js"],
  },
  define: {
    "process.env": {},
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "form-generate",
    },
  },
});
