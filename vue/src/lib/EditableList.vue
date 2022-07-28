<script setup lang="ts">
import { ref, onMounted, PropType } from 'vue'

import { initListEditable } from '$core/index'

interface IProps<TypeItem = unknown> {
  items: PropType<TypeItem[]>
}
defineProps<IProps>()

const listRef = ref<HTMLDivElement | null>(null)

onMounted(() =>
  initListEditable({
    listEl: listRef.value,
  })
)
</script>

<template>
  <div ref="listRef">
    <div v-for="item in items">
      <slot name="item" v-bind="item"></slot>
    </div>
  </div>
</template>
