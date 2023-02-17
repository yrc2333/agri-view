<!-- eslint-disable vue/no-mutating-props -->
<template>
  <a-form-item
    v-if="element"
    class="widget-view"
    :class="{
      active: cusFormStore.selectWidget.key == element.key,
    }"
    :label="element.label"
    :required="element.required"
  >
    <a-row style="width: 100%" :gutter="20">
      <a-col flex="1">
        <template v-if="element.type == 'input'">
          <a-input
            v-model="element.defaultValue"
            :placeholder="element.placeholder"
          ></a-input>
        </template>

        <template v-if="element.type == 'select'">
          <a-select
            v-model="element.defaultValue"
            :placeholder="element.placeholder"
          >
          </a-select>
        </template>

        <template v-if="element.type == 'treeSelect'">
          <a-tree-select
            v-model="element.defaultValue"
            clearable
            :placeholder="element.placeholder"
          >
          </a-tree-select>
        </template>
      </a-col>

      <a-col flex="100px">
        <a-space v-if="cusFormStore.selectWidget.key == element.key">
          <!-- 操作 -->
          <a-button size="small" type="secondary" @click="cloneElement">
            <template #icon>
              <icon-copy />
            </template>
          </a-button>
          <a-button
            size="small"
            status="danger"
            type="primary"
            @click="delElement"
          >
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form-item>
</template>

<script setup lang="ts">
  import { inject } from "vue";
  import { IconCopy, IconDelete } from "@arco-design/web-vue/es/icon";

  defineProps<{
    element: any;
  }>();

  const emit = defineEmits(["cloneElement", "delElement"]);

  const cusFormStore = inject("customFormStore") as any;

  /**
   * 删除
   */
  const delElement = () => {
    // cusFormStore.widgetForm.list.splice(
    //   cusFormStore.widgetForm.list.findIndex(
    //     (item: any) => item.key === cusFormStore.selectWidget.key
    //   ),
    //   1
    // );

    emit("delElement");
  };
  /**
   * 复制
   */
  const cloneElement = () => {
    // const curIndex = cusFormStore.widgetForm.list.findIndex(
    //   (item: any) => item.key === cusFormStore.selectWidget.key
    // );

    // const clonedItem = {
    //   ...cusFormStore.widgetForm.list[curIndex],
    //   key: Date.now(),
    // };

    // cusFormStore.widgetForm.list.splice(curIndex, 0, clonedItem);
    emit("cloneElement");
  };
</script>

<style lang="less">
  .widget-view {
    position: relative;
    padding: 8px 16px;
    min-height: 50px;
    background-color: rgba(236, 245, 255, 0.3);
    outline: 1px dashed rgba(170, 170, 170, 0.7);

    .widget-view-action {
      position: absolute;
      top: 0;
      right: 2px;
      z-index: 9;
      display: flex;
      align-items: center;
      justify-items: center;
      height: 100%;

      .widget-view-icon {
        cursor: pointer;
      }
    }

    &:hover {
      background: #ecf5ff;
      outline: 1px solid #409eff;
      outline-offset: 0;

      &.active {
        border: 1px solid #409eff;
        outline: 2px solid #409eff;
        outline-offset: 0;
      }
    }

    &.active {
      border: 1px solid #409eff;
      outline: 2px solid #409eff;
    }

    &.ghost {
      box-sizing: border-box;
      height: 3px;
      padding: 0;
      overflow: hidden;
      font-size: 0;
      background: #f56c6c;
      border: 2px solid #f56c6c;
      outline-width: 0;
      content: "";
    }
  }
</style>
