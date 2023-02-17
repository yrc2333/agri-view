<template>
  <div class="areaDraggable">
    <a-row> 基础组件</a-row>
    <draggable
      :list="basicComponents"
      :disabled="!enabled"
      item-key="type"
      class="list-group"
      v-bind="{
        group: { name: 'people', pull: 'clone', put: false },
        sort: false,
        ghostClass: 'ghost',
      }"
    >
      <!-- :move="checkMove"
      @end="handleMoveEnd"
      @start="handleMoveStart" -->

      <template #item="{ element }">
        <li
          :key="element"
          class="form-edit-widget-label"
          :class="{ 'no-put': element.type == 'divider' }"
        >
          <a>
            <i class="icon iconfont"></i>
            <span>{{ element.type }}</span>
          </a>
        </li>
      </template>
    </draggable>

    <a-row>布局组件</a-row>

    <draggable
      :list="layoutComponents"
      :disabled="!enabled"
      item-key="type"
      class="list-group"
      v-bind="{
        group: { name: 'people', pull: 'clone', put: false },
        sort: false,
        ghostClass: 'ghost',
      }"
    >
      <!-- :move="checkMove"
      @end="handleMoveEnd"
      @start="handleMoveStart" -->

      <template #item="{ element }">
        <li
          :key="element"
          class="form-edit-widget-label"
          :class="{ 'no-put': element.type == 'divider' }"
        >
          <a>
            <i class="icon iconfont"></i>
            <span>{{ element.type }}</span>
          </a>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import draggable from "vuedraggable";
  import { basicComponents, layoutComponents } from "./componentsConfig";

  defineProps({
    preview: {
      type: Boolean,
      default: false,
    },
    generateCode: {
      type: Boolean,
      default: false,
    },
    generateJson: {
      type: Boolean,
      default: false,
    },
    upload: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    basicFields: {
      type: Array,
      default: () => [
        "input",
        "textarea",
        "number",
        "radio",
        "checkbox",
        "time",
        "date",
        "rate",
        "color",
        "select",
        "switch",
        "slider",
        "text",
      ],
    },
    advanceFields: {
      type: Array,
      default: () => ["blank", "imgupload", "editor", "cascader"],
    },
    layoutFields: {
      type: Array,
      default: () => ["grid"],
    },
  });

  const enabled = ref(true);
  // function handleMoveEnd(evt: any) {
  //   // console.log('end', evt);
  // }

  // function handleMoveStart({ oldIndex }: any) {
  //   // console.log('start', oldIndex);
  // }

  // function checkMove(e: any) {
  //   // window.console.log(`Future index: ${e.draggedContext.futureIndex}`);
  // }
</script>

<style scoped lang="less">
  .areaDraggable {
    height: 100%;
    display: flex;
    flex-direction: column;

    .list-group {
      padding: 0 12px;
      padding-bottom: 8px;
      font-size: 13px;

      ul {
        position: relative;
        margin: 0;
        padding: 0 10px 10px;
        overflow: hidden;
      }

      .form-edit-widget-label {
        position: relative;
        left: 0;
        display: block;
        float: left;
        width: 48%;
        margin: 1%;
        overflow: hidden;
        color: #333;
        font-size: 12px;
        line-height: 26px;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 1px solid #f4f6fc;

        &:hover {
          color: red;
        }

        & > a {
          display: block;
          background: #f4f6fc;
          border: 1px solid #f4f6fc;
          cursor: move;

          .icon {
            display: inline-block;
            margin-right: 6px;
            margin-left: 8px;
            font-size: 14px;
            vertical-align: middle;
          }

          span {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }

    .ghost {
      background: #c8ebfb;
      opacity: 0.5;
    }

    .not-draggable {
      cursor: no-drop;
    }
  }
</style>
