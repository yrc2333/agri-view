<!--
 * @Author: Yanc
 * @Date: 2022-09-21 16:25:06
 * @LastEditTime: 2023-02-06 18:14:28
-->
<template>
  <div class="form-generate">
    <a-form
      ref="generatedForm"
      :model="formModel"
      :size="cusFormData.config.size"
      :label-align="cusFormData.config.labelPosition"
      :style="{
        width: cusFormData.config.width,
        height: cusFormData.config.height,
      }"
    >
      <template
        v-for="(originListItem, index) in cusFormData.list"
        :key="index"
      >
        <template v-if="originListItem.type === 'grid'">
          <a-row
            v-for="(rowItem, rowIndex) in originListItem.columns"
            :key="rowIndex"
          >
            <a-col
              v-for="(colItem, colIndex) in rowItem.list"
              :span="rowItem.span ?? 0"
              :key="colIndex"
            >
              <generate-item
                v-model:value="formModel[colItem.filedName]"
                :item-config="colItem"
              ></generate-item>
            </a-col>
          </a-row>
        </template>
        <template v-else>
          <generate-item
            v-model:value="formModel[originListItem.filedName]"
            :item-config="originListItem"
          ></generate-item>
        </template>
      </template>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from "vue";
  import {
    Form as AForm,
    Row as ARow,
    Col as ACol,
  } from "@arco-design/web-vue";
  import generateItem from "./generate-item.vue";

  const props = defineProps({
    cusFormData: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });

  const formModel = reactive(
    Object.fromEntries(
      props.cusFormData.list.map((item: any) => {
        return [item.filedName, item.defaultValue];
      })
    )
  );

  Object.keys(formModel).forEach((key) => {
    const value = props.value[key];
    if (value !== undefined) formModel[key] = props.value[key];
  });

  const generatedForm = ref();

  const verifyForm = async () => {
    const verifiedRes = await generatedForm.value.validate();
    return verifiedRes;
  };

  defineExpose({
    formModel,
    verifyForm,
  });
</script>

<style scoped lang="less"></style>
