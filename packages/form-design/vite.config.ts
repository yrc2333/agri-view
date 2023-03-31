/*
 * @Author: Yanc
 * @Date: 2023-02-04 20:30:33
 * @LastEditTime: 2023-03-31 15:29:30
 */
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  server: {
    port: 7777,
  },
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
  build: {
    rollupOptions: {
      external: [
        "vue",
        "@agri-view/form-generate",
        "@arco-design/web-vue",
        "vuedraggable",
        "vanilla-jsoneditor",
        "json-editor-vue",
      ],
    },
    outDir: resolve(__dirname, "./dist"),
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "form-design",
      fileName: "form-design",
    },
  },
});
