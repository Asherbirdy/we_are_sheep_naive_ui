<route lang="yaml">
  meta:
    layout: false
</route>

<script setup lang='ts'>
import { useDevApi } from '@/hook'
const state = ref({
	data: []
})

onMounted(async () => {
	const res = await useDevApi.get()
	state.value.data = res
})
</script>

<template>
  <div>
    <p>{{ state.data }}</p>
    <p>asd</p>
  </div>
</template>
