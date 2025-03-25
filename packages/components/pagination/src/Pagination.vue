<script lang="ts" setup>
import { ref } from 'vue'
import { usePagination, type PaginationProps } from './Pagination'
defineOptions({
  name: 'ZlPagination'
})

const { total = 1 } = defineProps<PaginationProps>()

const currenPageNum = ref(1)

const { gto, next, prev, selPage } = usePagination(currenPageNum, {
  total
})
</script>
<template>
  <div>
    <ZlButton @click="gto(1)">&lt;&lt;</ZlButton>
    <ZlButton @click="prev">&lt;</ZlButton>
    <ZlButton
      v-for="num in total"
      :key="num"
      :class="[{ red: num === currenPageNum }]"
      @click="selPage(num)"
    >
      {{ num }}
    </ZlButton>
    <ZlButton @click="next">&gt;</ZlButton>
    <ZlButton @click="gto(total)">&gt;&gt;</ZlButton>
  </div>
</template>
<style lang="css">
.red {
  background-color: red;
}
</style>
