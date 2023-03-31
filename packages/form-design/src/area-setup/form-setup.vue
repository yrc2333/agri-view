<!--
 * @Author: Yanc
 * @Date: 2022-12-05 16:37:04
 * @LastEditTime: 2023-03-31 13:37:45
-->
<template>
  <div class="form-setup">
    <a-form :model="cusFormStore.widgetForm.config" layout="vertical">
      <a-form-item field="layout" label="表单布局">
        <a-radio-group
          v-model="cusFormStore.widgetForm.config.layout"
          type="button"
        >
          <a-radio value="horizontal">horizontal</a-radio>
          <a-radio value="vertical">vertical</a-radio>
          <!-- <a-radio value="inline">inline</a-radio> -->
        </a-radio-group>
      </a-form-item>

      <a-form-item field="labelPosition" label="标签对齐方式">
        <a-radio-group
          v-model="cusFormStore.widgetForm.config.labelPosition"
          type="button"
        >
          <a-radio value="right">right</a-radio>
          <a-radio value="left">left</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item field="size" label="表单大小">
        <a-radio-group
          v-model="cusFormStore.widgetForm.config.size"
          type="button"
        >
          <a-radio value="mini">mini</a-radio>
          <a-radio value="small">small</a-radio>
          <a-radio value="medium">medium</a-radio>
          <a-radio value="large">large</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- <a-form-item field="labelWidth" label="标签宽度">
        <a-input-number
          v-model="cusFormStore.widgetForm.config.labelWidth"
          mode="button"
          placeholder="please enter your username..."
        />
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { inject } from "vue";

  const cusFormStore = inject("customFormStore") as any;
</script>

<style scoped lang="less">
  .form-setup {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
