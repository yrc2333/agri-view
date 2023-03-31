<!--
 * @Author: Yanc
 * @Date: 2022-09-21 16:25:06
 * @LastEditTime: 2023-03-31 15:07:18
-->
<template>
  <div class="form-generate">
    <a-form
      ref="generatedForm"
      :model="formModel"
      :size="formJson.config.size"
      auto-label-width
      :label-align="formJson.config.labelPosition"
      :style="{
        width: formJson.config.width,
        height: formJson.config.height,
      }"
    >
      <template v-for="(originListItem, index) in formJson.list" :key="index">
        <template v-if="originListItem.type === 'grid'">
          <a-row>
            <a-col
              v-for="(colItem, colIndex) in originListItem.columns"
              :span="colItem.span ?? 0"
              :key="colIndex"
            >
              <generate-item
                v-for="(formItem, index) in colItem.list"
                v-model:value="formModel[colItem.filedName]"
                :item-config="formItem"
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
  import generateItem from "./generate-item.vue";

  const props = defineProps({
    formJson: {
      type: Object,
      default: () => ({
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: "right",
          size: "small",
          layout: "horizontal",
        },
      }),
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
      props.formJson.list.map((item: any) => {
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
