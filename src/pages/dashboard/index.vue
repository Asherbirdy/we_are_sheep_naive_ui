<script setup lang='ts'>

import { useQuery } from '@tanstack/vue-query'

import { QueryKeyEnum } from '@/enums'
import { useUserApi } from '@/hook'

const { data, isLoading } = useQuery({
	queryKey: [QueryKeyEnum.userShowMe],
	queryFn: () => useUserApi.showMe()
})

</script>

<template>
  <div>{{ isLoading ? 'loading' : data }}</div>
</template>
