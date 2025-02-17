<script setup lang="ts">
import { NSpace } from 'naive-ui'
</script>
<template>
  <div>
    <n-space
      vertical
      class="mx-[5%]"
    >
      <router-view />
    </n-space>
  </div>
</template>