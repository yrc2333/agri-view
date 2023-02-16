<!-- eslint-disable vue/no-template-shadow -->
<!--
 * @Author: Yanc
 * @Date: 2022-12-05 16:37:04
 * @LastEditTime: 2023-02-16 17:56:59
-->
<template>
  <div class="area-render">
    <a-form
      :model="formData"
      :size="cusFormStore.widgetForm.config.size"
      :layout="cusFormStore.widgetForm.config.layout"
    >
      <draggable
        v-model="cusFormStore.widgetForm.list"
        item-key="key"
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
              <a-row
                class="widget-view"
                style="width: 100%"
                @click.stop="
                  handleSelectWidget(element, cusFormStore.widgetForm.list)
                "
              >
                <a-col flex="1">
                  <a-row>
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
                        @add="handleWidgetAdd($event, element, colIndex)"
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
                </a-col>
                <a-col flex="100px">
                  <a-space v-if="cusFormStore.selectWidget.key == element.key">
                    <!-- 操作 -->
                    <a-button
                      size="small"
                      type="secondary"
                      @click.stop="onCloneElement(element.list)"
                    >
                      <template #icon>
                        <icon-copy />
                      </template>
                    </a-button>
                    <a-button
                      size="small"
                      status="danger"
                      type="primary"
                      @click.stop="onDelElement(element.list)"
                    >
                      <template #icon>
                        <icon-delete />
                      </template>
                    </a-button>
                  </a-space>
                </a-col>
              </a-row>
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
  </div>
</template>

<script setup lang="ts">
  import { ref, inject } from "vue";
  import draggable from "vuedraggable";
  import {
    Space as ASpace,
    Form as AForm,
    Row as ARow,
    Col as ACol,
    Button as AButton,
  } from "@arco-design/web-vue";
  import formListItem from "./form-list-item.vue";
  import { IconCopy, IconDelete } from "@arco-design/web-vue/es/icon";

  const formData = ref({});

  const cusFormStore = inject("customFormStore") as any;

  function handleWidgetAdd(evt: any, element?: any, colIndex?: any) {
    //为拖拽到容器的元素添加唯一 key
    const key = Date.now();
    // 拖放到目标数组后的索引
    const newIndex = evt.newIndex;

    const to = evt.to;
    console.log(to);

    // 拖放目标是布局组件
    if (element) {
      element.columns[colIndex].list[newIndex] = {
        ...element.columns[colIndex].list[newIndex],
        key,
      };
    } else {
      cusFormStore.widgetForm.list[newIndex] = {
        ...cusFormStore.widgetForm.list[newIndex],
        options: {
          ...cusFormStore.widgetForm.list[newIndex].options,
        },
        key,
      };
    }
  }

  // 选中
  const handleSelectWidget = (element, list) => {
    cusFormStore.selectWidget = element;
    cusFormStore.selectList = list;

    console.log(list);
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
    console.log(
      "%c [ valu ]-166",
      "font-size:13px; background:pink; color:#bf2c9f;",
      valu
    );
    const toDelIndex = cusFormStore.selectList.findIndex(
      (item: any) => item.key === cusFormStore.selectWidget.key
    );

    cusFormStore.selectList.splice(toDelIndex, 1);
  };
</script>

<style scoped lang="less">
  .area-render {
    flex: 1;
    padding: 8px 12px;
  }
</style>
