<!--
 * @Author: Yanc
 * @Date: 2023-03-31 13:40:53
 * @LastEditTime: 2023-03-31 15:07:45
-->
<template>
  <a-modal
    :visible="visible"
    @cancel="emit('update:visible')"
    unmount-on-close
    title="预览"
  >
    <formGenerate :form-json="data"></formGenerate>
  </a-modal>
</template>

<script setup lang="ts">
  import formGenerate from "@agri-view/form-generate";
  import { Modal as AModal } from "@arco-design/web-vue";

  const emit = defineEmits(["update:visible"]);

  defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  });
</script>

<style scoped lang="less"></style>
