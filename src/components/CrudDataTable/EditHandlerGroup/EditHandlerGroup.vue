<script setup lang='ts'>

import {EditHandlerStyle, IEditHandler} from "@/types/datagridview/EditHandlerGroup/EditHandler/IEditHandler";
import EditHandler from "@/components/CrudDataTable/EditHandlerGroup/EditHandler.vue";

interface Props {
  editHandlerList?: IEditHandler[]
}

const props = withDefaults(defineProps<Props>(), {
});


</script>
<template>
  <div class="xidps-container">
    <slot>
      <edit-handler v-for="(editHandler, item) in editHandlerList" :key="item" :handler="editHandler"></edit-handler>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.xidps-container {
  display: flex;
  align-items: flex-start;

  * {
    margin-right: 10px;
  }
}
</style>
