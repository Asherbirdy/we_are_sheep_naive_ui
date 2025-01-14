<script setup lang='ts'>
import { NCard } from 'naive-ui'
</script>

<template>
  <div class="flex justify-center items-center">
    <n-space
      vertical
      justify="center"
    >
      <n-card
        title="驗證Email"
        class="min-w-[290px]"
      >
        Card Content
        <template #footer>
          #footer
        </template>
        <template #action>
          #action
        </template>
      </n-card>
    </n-space>
  </div>
</template>
