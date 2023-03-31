<!--
 * @Author: Yanc
 * @Date: 2022-09-20 14:53:51
 * @LastEditTime: 2023-03-29 17:45:10
-->
<template>
  <div class="form-item-setup">
    <a-form :model="customFormStore.selectWidget" layout="vertical">
      <template
        v-if="
          !['treeSelect', 'select', 'grid'].includes(
            customFormStore.selectWidget.type
          )
        "
      >
        <a-form-item field="label" label="标题">
          <a-input
            v-model="customFormStore.selectWidget.label"
            placeholder="请输入字段标题"
          />
        </a-form-item>
        <a-form-item field="filedName" label="字段标识">
          <a-input
            v-model="customFormStore.selectWidget.filedName"
            placeholder="请输入字段标识"
          />
        </a-form-item>
        <a-form-item field="required" label="是否必填">
          <a-switch v-model="customFormStore.selectWidget.required" />
        </a-form-item>

        <a-form-item field="defaultValue" label="默认值">
          <a-input
            v-model="customFormStore.selectWidget.defaultValue"
            placeholder="请输入字段默认值"
          />
        </a-form-item>
      </template>
      <!-- 布局 -->

      <template
        v-else-if="['grid'].includes(customFormStore.selectWidget.type)"
      >
        <a-button
          @click="
            customFormStore.selectWidget.columns.push({
              span: 12,
              list: [],
            })
          "
          >新增布局容器</a-button
        >

        <a-form-item
          v-for="(item, index) in customFormStore.selectWidget.columns"
          field="label"
          :label="`布局容器${index + 1}`"
        >
          <a-row :gutter="10">
            <a-col :span="4"> span</a-col>
            <a-col :span="12">
              <a-input-number
                :max="24"
                :min="0"
                v-model="item.span"
              ></a-input-number
            ></a-col>

            <a-col :span="8"
              ><a-button
                status="danger"
                @click="customFormStore.selectWidget.columns.splice(index, 1)"
              >
                删除</a-button
              ></a-col
            >
          </a-row>
        </a-form-item>
      </template>

      <!-- 选项类表单项 配置选项 -->
      <template
        v-if="
          ['treeSelect', 'select'].includes(customFormStore.selectWidget.type)
        "
      >
        <a-tabs default-active-key="2">
          <a-tab-pane key="1" title="添加静态数据">
            <a-form-item label="请输入选项 label - value">
              <add-option></add-option>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" title="设置远端数据">
            <a-form-item field="label" label="获取选项的远端地址:">
              <a-input
                v-model="customFormStore.selectWidget.options.remoteOptions.url"
                placeholder="请输入远端请求地址"
              />
            </a-form-item>

            <a-form-item
              v-if="customFormStore.selectWidget.type !== 'treeSelect'"
              field="label"
              label="配置字段映射:"
            >
              <a-space>
                <a-input
                  v-model="
                    customFormStore.selectWidget.options.remoteOptions
                      .optionMapping.label
                  "
                  placeholder="key"
                />
                <a-input
                  v-model="
                    customFormStore.selectWidget.options.remoteOptions
                      .optionMapping.value
                  "
                  placeholder="title"
                />
              </a-space>
            </a-form-item>

            <a-form-item v-else field="label" label="配置字段映射:">
              <a-input
                v-model="
                  customFormStore.selectWidget.options.remoteOptions
                    .optionMapping.key
                "
                placeholder="key"
              />
              <a-input
                v-model="
                  customFormStore.selectWidget.options.remoteOptions
                    .optionMapping.title
                "
                placeholder="title"
              />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { inject, ref } from "vue";
  import addOption from "./add-option.vue";
  import {
    Row as ARow,
    Col as ACol,
    Button as AButton,
  } from "@arco-design/web-vue";

  const customFormStore = inject("customFormStore") as any;
</script>

<style scoped lang="less">
  .form-item-setup {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
