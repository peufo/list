<script setup lang="ts">
import { ref } from 'vue'

import fakeItems from './items'
import EditableList from '$lib/EditableList.vue'

defineProps<{ msg: string }>()

const items = ref(fakeItems)
</script>

<template>
  <h1>{{ msg }}</h1>
  <EditableList :items="items">
    <template #item="{ name }">
      <span>{{ name }}</span>
    </template>
  </EditableList>
</template>
