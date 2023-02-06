<!--
 * @Author: Yanc
 * @Date: 2022-09-20 14:53:51
 * @LastEditTime: 2022-12-27 20:00:13
-->
<template>
  <div class="form-item-setup">
    <a-form :model="customFormStore.selectWidget" layout="vertical">
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

      <template
        v-if="
          ['treeSelect', 'select'].includes(customFormStore.selectWidget.type)
        "
      >
        <a-form-item>
          <a-radio-group v-model="isStatiType" type="button" size="mini">
            <a-radio :value="true">静态数据</a-radio>
            <a-radio :value="false">远端数据</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item v-show="isStatiType" label="请输入选项 label - value">
          <add-option></add-option>
        </a-form-item>

        <template v-if="!isStatiType">
          <a-form-item field="label" label="获取选项的远端地址:">
            <a-input
              v-model="customFormStore.selectWidget.remote.url"
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
                  customFormStore.selectWidget.remote.optionMapping.label
                "
                placeholder="key"
              />
              <a-input
                v-model="
                  customFormStore.selectWidget.remote.optionMapping.value
                "
                placeholder="title"
              />
            </a-space>
          </a-form-item>

          <a-form-item v-else field="label" label="配置字段映射:">
            <a-input
              v-model="customFormStore.selectWidget.remote.optionMapping.key"
              placeholder="key"
            />
            <a-input
              v-model="customFormStore.selectWidget.remote.optionMapping.title"
              placeholder="title"
            />
          </a-form-item>
        </template>
      </template>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {
    FormItem as AFormItem,
    Form as AForm,
    Input as AInput,
    Space as ASpace,
    RadioGroup as ARadioGroup,
    Radio as ARadio,
    Switch as ASwitch,
  } from '@arco-design/web-vue';
  import { inject, ref } from 'vue';
  import addOption from './add-option.vue';

  const isStatiType = ref(true);
  const customFormStore = inject('customFormStore') as any;
</script>

<style scoped lang="less"></style>
