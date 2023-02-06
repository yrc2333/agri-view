<!--
 * @Author: Yanc
 * @Date: 2022-09-23 18:08:25
 * @LastEditTime: 2023-02-06 17:29:29
-->
<template>
  <div class="formRender">
    <div class="area-draggable">
      <area-draggable></area-draggable>
    </div>
    <div class="area-render">
      <div class="area-render-header">
        <a-space>
          <a-button type="primary" @click="onSave">保存</a-button>
          <a-button type="outline" @click="onPreview">预览</a-button>
        </a-space>
      </div>
      <area-render></area-render>
    </div>
    <div class="area-setup">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="字段属性">
          <form-item-setup></form-item-setup>
        </a-tab-pane>
        <a-tab-pane key="2" title="表单属性">
          <form-setup></form-setup>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>

  <a-modal v-model:visible="visible" title="预览">
    <formGenerate
      v-if="preViewFrom"
      :cus-form-data="preViewFrom"
    ></formGenerate>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, provide } from "vue";
  import {
    Tabs as ATabs,
    TabPane as ATabPane,
    Button as AButton,
    Space as ASpace,
    Modal as AModal,
  } from "@arco-design/web-vue";
  import areaDraggable from "./area-draggable/area-draggable.vue";
  import areaRender from "./area-render/index.vue";
  import formSetup from "./area-setup/form-setup.vue";
  import formItemSetup from "./area-setup/form-item-setup.vue";
  import formGenerate from "@agriview/form-generate";

  const emit = defineEmits(["onSave", "onPreview"]);

  const customFormStore = reactive({
    widgetForm: {
      list: [],
      config: {
        labelWidth: 100,
        labelPosition: "right",
        size: "small",
        layout: "horizontal",
      },
    },
    selectWidget: {}, // 当前选中项
    selectList: [], // 记录当前选中的数组,便于增删改操作
  });

  provide("customFormStore", customFormStore);

  const onSave = () => {
    emit("onSave", customFormStore.widgetForm);
  };

  const visible = ref(false);
  const preViewFrom = ref();
  const onPreview = () => {
    visible.value = true;
    preViewFrom.value = customFormStore.widgetForm;
  };

  defineExpose({
    customFormStore,
  });
</script>

<style scoped lang="less">
  .formRender {
    display: flex;
    width: 100%;
    height: 100%;

    .area-draggable,
    .area-render,
    .area-setup {
      padding: 8px 12px;
      background-color: #fff;
    }

    .area-draggable {
      flex: 1;
    }

    .area-render {
      flex: 2;
      display: flex;
      flex-direction: column;

      .area-setup-header,
      .area-render-header {
        height: 45px;
      }

      .area-render-header {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }

    .area-setup {
      flex: 1;
    }
  }
</style>
