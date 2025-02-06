<script setup lang='ts'>
import { NButton, NTabs, NTabPane, NModal, NCarousel, NInput } from 'naive-ui'

const message = useMessage()

const state = ref({
	data: {
		note: ''
		// age: 18
	},
	url: 'https://www.asdasasas.com',
	status: {
		modal: false,
		isInput: true
	}
})

const onPositiveClick = () => {
	navigator.clipboard.writeText(state.value.url)
	message.success('複製網址成功')
}

const onCreateAccount = () => {
	state.value.status.modal = true
}
</script>

<template>
  <div>
    <n-tabs
      type="segment"
      animated
    >
      <n-tab-pane
        name="createAccount"
        tab="開戶"
      >
        <p class="text-center font-bold">
          開戶規則
        </p>
        <n-carousel show-arrow>
          <img
            class="w-full h-60 object-cover"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          >
          <img
            class="w-full h-60 object-cover"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          >
          <img
            class="w-full h-60 object-cover"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
          >
          <img
            class="w-full h-60 object-cover"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          >
        </n-carousel>
        <n-button
          type="primary"
          block
          @click="onCreateAccount"
        >
          開戶
        </n-button>
      </n-tab-pane>
      <n-tab-pane
        name="createAccountStatus"
        tab="開戶狀態"
      >
        Hey Jude
      </n-tab-pane>
    </n-tabs>
    <n-modal
      v-model:show="state.status.modal"
      :mask-closable="false"
      preset="dialog"
      title="Dialog"
      content="Are you sure?"
    >
      <div v-if="state.status.isInput">
        <n-input
          v-model:value="state.data.note"
          placeholder="要開戶給哪位朋友"
        />
        <n-button
          type="primary"
          block
          @click="state.status.isInput = false"
        >
          開戶
        </n-button>
      </div>
      <div v-else>
        <p>
          將網址傳給對方就能開戶
        </p>
        <p>
          網址：https://www.google.com
        </p>
        <n-button
          type="primary"
          block
          @click="onPositiveClick"
        >
          複製網址
        </n-button>
      </div>
    </n-modal>
  </div>
</template>