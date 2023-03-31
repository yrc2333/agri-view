<!--
 * @Author: Yanc
 * @Date: 2022-09-21 16:25:06
 * @LastEditTime: 2023-02-20 17:51:52
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
      <component :is="asyncComponent(itemConfig.type)"></component>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, defineAsyncComponent } from "vue";
  import axios from "axios";

  const props = defineProps<{
    itemConfig?: any;
    value?: any;
  }>();

  const remoteData = ref();

  const asyncComponent = (cpnType) => {
    let cpn;
    switch (cpnType) {
      case "input":
        cpn = () => import("@arco-design/web-vue/es/input");
        break;
      case "select":
        cpn = () => import("@arco-design/web-vue/es/select");
        break;
      case "treeSelect":
        cpn = () => import("@arco-design/web-vue/es/tree-select");
      default:
        return;
    }

    return defineAsyncComponent(cpn);
  };

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
