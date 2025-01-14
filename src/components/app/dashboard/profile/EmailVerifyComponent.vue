<script setup lang='ts'>
import { useStorage } from '@vueuse/core'
import { useIntervalFn } from '@vueuse/core'
import { NButton } from 'naive-ui'

// 設定倒數時間
const state = ref({
	countDownTime: 60, // 設定倒數時間
	countDown: 0 // 倒數器
})

// 在localStorage的倒數器
const countdownInLocalStorage = useStorage('emailVerificationCountdown', 0)

// 倒數器
const { pause, resume } = useIntervalFn(() => {
	if (countdownInLocalStorage.value <= 0) {
		pause()
		return
	}
	countdownInLocalStorage.value--
}, 1000, { immediate: false })

// 發送驗證碼
const sendEmailVerification = async (sec: number) => {
	state.value.countDown = sec
	countdownInLocalStorage.value = sec
	resume()
}

// 恢復倒數器 在onMounted使用
const restoreCounter = () => {
	if (countdownInLocalStorage.value > 0) {
		state.value.countDown = countdownInLocalStorage.value
		resume()
	}
}

// 倒數按鈕是否要 disabled
const isEmailVerificationButtonDisabled = computed(() => {
	return state.value.countDown > 0
})

// 監測 倒數按鈕是否要 disabled
watch(countdownInLocalStorage, (newVal) => {
	state.value.countDown = newVal
})

// 恢復未倒數的倒數器
onMounted(() => restoreCounter())
</script>

<template>
  <n-button
    type="primary"
    ghost
    :disabled="isEmailVerificationButtonDisabled"
    @click="sendEmailVerification(state.countDownTime)"
  >
    {{
      state.countDown > 0
        ? `${state.countDown} 秒`
        : '傳送驗證碼'
    }}
  </n-button>
</template>
