<!--
 * @Author: Yanc
 * @Date: 2023-03-31 13:40:53
 * @LastEditTime: 2023-03-31 15:18:41
-->
<template>
  <a-modal
    :visible="visible"
    @cancel="emit('update:visible')"
    unmount-on-close
    :body-style="{
      padding: '8px 16px',
    }"
    title="预览"
  >
    <a-scrollbar style="height: 400px; overflow: auto">
      <JsonEditorVue
        class="jse-theme-dark"
        mode="text"
        :model-value="data"
        :navigation-bar="false"
        :status-bar="false"
        :main-menu-bar="false"
        read-only
      ></JsonEditorVue>
    </a-scrollbar>
  </a-modal>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from "vue";
  import {
    Modal as AModal,
    Scrollbar as AScrollbar,
  } from "@arco-design/web-vue";
  import "vanilla-jsoneditor/themes/jse-theme-dark.css"; // dark theme
  const JsonEditorVue = defineAsyncComponent(() => import("json-editor-vue"));

  const emit = defineEmits(["update:visible"]);

  defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  });
</script>

<style scoped lang="less">
  .json-editor {
    height: 500px;
    overflow: auto;
  }
</style>
