<!--
 * @Author: Yanc
 * @Date: 2022-12-05 16:37:04
 * @LastEditTime: 2022-12-27 18:22:51
-->
<template>
  <div class="add-option-box">
    <a-space v-for="(item, index) in opts" :key="index" class="option-item">
      <a-input v-model="item.label" />
      <a-input v-model="item.value" />
      <a-button type="primary" @click="del(index)">
        <template #icon>
          <icon-delete />
        </template>
      </a-button>
    </a-space>
    <a-row class="option-item">
      <a-button size="mini" long type="text" @click="add">新增选项</a-button>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import {
    Input as AInput,
    Space as ASpace,
    Button as AButton,
    Row as ARow,
  } from '@arco-design/web-vue';
  import { IconDelete } from '@arco-design/web-vue/es/icon';

  const opts = reactive([
    { label: 'label1', value: 'value1' },
    { label: 'label2', value: 'value2' },
  ]);

  const del = (index: any) => {
    opts.splice(index);
  };

  const add = () => {
    opts.push({ label: '', value: '' });
  };
</script>

<style scoped lang="less">
  .add-option-box {
    position: relative;

    .option-item {
      margin-bottom: 5px;
    }
  }
</style>
