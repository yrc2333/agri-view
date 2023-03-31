<!-- eslint-disable vue/no-template-shadow -->
<!--
 * @Author: Yanc
 * @Date: 2022-12-05 16:37:04
 * @LastEditTime: 2023-03-30 09:05:22
-->
<template>
  <a-form
    class="area-render"
    auto-label-width
    :model="formData"
    :size="cusFormStore.widgetForm.config.size"
    :layout="cusFormStore.widgetForm.config.layout"
  >
    <draggable
      v-model="cusFormStore.widgetForm.list"
      item-key="key"
      class="area-render-list"
      style="height: 100%"
      v-bind="{
        group: 'people',
        ghostClass: 'ghost',
      }"
      @add="handleWidgetAdd"
    >
      <template #item="{ element }">
        <div style="width: 100%">
          <!-- 栅格布局 -->
          <template v-if="element.type === 'grid'">
            <div
              class="widget-view"
              @click.stop="
                handleSelectWidget(element, cusFormStore.widgetForm.list)
              "
            >
              <a-row :gutter="10" style="width: 100%">
                <a-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ?? 0"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    item-key="key"
                    class="widget-view"
                    v-bind="{
                      group: 'people',
                      ghostClass: 'ghost',
                    }"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                  >
                    <template #item="{ element: secondEl }">
                      <form-list-item
                        :element="secondEl"
                        @del-element="onDelElement(col.list)"
                        @clone-element="onCloneElement(col.list)"
                        @click.stop="handleSelectWidget(secondEl, col.list)"
                      ></form-list-item>
                    </template>
                  </draggable>
                </a-col>
              </a-row>

              <div
                class="widget-view-action"
                v-if="cusFormStore.selectWidget.key == element.key"
              >
                <!-- 操作 -->
                <a-button
                  size="mini"
                  type="secondary"
                  @click.stop="onCloneElement(element.list)"
                >
                  <template #icon>
                    <icon-copy />
                  </template>
                </a-button>
                <a-button
                  size="mini"
                  status="danger"
                  type="primary"
                  @click.stop="onDelElement(element.list)"
                >
                  <template #icon>
                    <icon-delete />
                  </template>
                </a-button>
              </div>
            </div>
          </template>
          <!-- 无布局组件 -->
          <template v-else>
            <form-list-item
              v-if="element && element.key"
              :element="element"
              @del-element="onDelElement(cusFormStore.widgetForm.list)"
              @clone-element="onCloneElement(cusFormStore.widgetForm.list)"
              @click.stop="
                handleSelectWidget(element, cusFormStore.widgetForm.list)
              "
            />
          </template>
        </div>
      </template>
    </draggable>
  </a-form>
</template>

<script setup lang="ts">
  import { ref, inject } from "vue";
  import draggable from "vuedraggable";
  import formListItem from "./form-list-item.vue";
  import { IconCopy, IconDelete } from "@arco-design/web-vue/es/icon";
  import { cloneDeep } from "lodash-es";

  const formData = ref({});

  const cusFormStore = inject("customFormStore") as any;

  /**
   * 处理往表单顶层托组件的情况
   * @param evt
   */
  function handleWidgetAdd(evt: any) {
    //为拖拽到容器的元素添加唯一 key
    const key = Date.now();
    // 拖放到目标数组后的索引
    const newIndex = evt.newIndex;

    cusFormStore.widgetForm.list[newIndex] = {
      ...cloneDeep(cusFormStore.widgetForm.list[newIndex]),
      key,
    };
  }

  /**
   * 处理往布局组件中拖动的情况
   * @param evt
   * @param row
   * @param colIndex
   */
  function handleWidgetColAdd(evt: any, row: any, colIndex?: any) {
    const key = Date.now();
    const newIndex = evt.newIndex;

    row.columns[colIndex].list[newIndex] = {
      ...cloneDeep(row.columns[colIndex].list[newIndex]),
      key,
    };
  }

  // 选中
  const handleSelectWidget = (element, list) => {
    console.log(
      "%c [ element ]-155",
      "font-size:13px; background:pink; color:#bf2c9f;",
      element
    );
    cusFormStore.selectWidget = element;
    cusFormStore.selectList = list;
  };
  // 复制
  const onCloneElement = (list) => {
    const curIndex = list.findIndex(
      (item: any) => item.key === cusFormStore.selectWidget.key
    );
    const clonedItem = {
      ...list[curIndex],
      key: Date.now(),
    };

    list.splice(curIndex, 0, clonedItem);
  };
  // 删除
  const onDelElement = (valu) => {
    const toDelIndex = cusFormStore.selectList.findIndex(
      (item: any) => item.key === cusFormStore.selectWidget.key
    );

    cusFormStore.selectList.splice(toDelIndex, 1);
  };
</script>

<style lang="less">
  .area-render {
    flex: 1;
    padding: 8px 12px;
    overflow: auto;
    .area-render-list {
      height: 100%;
    }
  }
</style>
