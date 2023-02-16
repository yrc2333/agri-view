<!--
 * @Author: Yanc
 * @Date: 2022-09-21 16:25:06
 * @LastEditTime: 2023-02-16 18:15:49
-->
<template>
  <div class="generate-item">
    <a-form-item
      :field="itemConfig.filedName"
      :rules="[
        {
          required: itemConfig.required,
          message: `${itemConfig.label}是必填项`,
        },
      ]"
      validate-trigger="input"
      :label="itemConfig.label"
    >
      <a-input
        v-if="itemConfig.type === 'input'"
        v-model="dataModel"
        allow-clear
        :placeholder="itemConfig.placeholder"
      />
      <a-select
        v-if="itemConfig.type === 'select'"
        v-model="dataModel"
        allow-clear
        :placeholder="itemConfig.placeholder"
        :options="itemConfig.options.staticOptions"
        :field-names="itemConfig?.fieldNames"
      />
      <a-tree-select
        v-if="itemConfig.type === 'treeSelect'"
        v-model="dataModel"
        :data="
          props.itemConfig?.remote?.url
            ? remoteData
            : itemConfig.options.staticOptions
        "
        :allow-search="true"
        :filter-tree-node="filterTreeNode"
        allow-clear
        :placeholder="itemConfig.placeholder"
        :field-names="itemConfig?.remote?.optionMapping ?? undefined"
        :selectable="itemConfig?.selectable ?? true"
      />
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from "vue";
  import {
    FormItem as AFormItem,
    TreeSelect as ATreeSelect,
    Select as ASelect,
    Input as AInput,
  } from "@arco-design/web-vue";
  import axios from "axios";

  const props = defineProps<{
    itemConfig?: any;
    value: any;
  }>();

  const remoteData = ref();

  onMounted(async () => {
    const reqConfig = props.itemConfig.remote;

    if (!reqConfig) return;
    if (reqConfig.method === "get") {
      remoteData.value = await axios.get(reqConfig.url, {
        params: reqConfig.param,
      });
    } else if (reqConfig.method === "post") {
      remoteData.value = await axios.post(reqConfig.url, reqConfig.param);
    }
  });

  const emit = defineEmits<{
    (event: "update:value", value: any): void;
  }>();

  const dataModel = ref(props.itemConfig?.defaultValue);

  function filterTreeNode(searchValue, nodeData) {
    return (
      nodeData[props.itemConfig.remote?.optionMapping?.title ?? "title"]
        .toLowerCase()
        .indexOf(searchValue.toLowerCase()) > -1
    );
  }
  watch(
    () => props.value,
    () => {
      dataModel.value = props.value;
    },
    { deep: true, immediate: true }
  );

  watch(dataModel, () => {
    emit("update:value", dataModel.value);
  });
</script>

<style scoped lang="less"></style>
