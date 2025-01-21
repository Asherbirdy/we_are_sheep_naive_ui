<script setup lang='ts'>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NFloatButton, NIcon } from 'naive-ui'
</script>

<template>
  <n-float-button
    :right="0"
    :bottom="10"
  >
    <n-icon>
      <CashIcon />
    </n-icon>
  </n-float-button>
</template>
