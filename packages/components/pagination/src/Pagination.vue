<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { usePagination, type Pagination, type PaginationProps } from './Pagination'
import { usenamespace } from '@zl-gp/hooks'

defineOptions({
  name: 'ZlPagination'
})

const { namespace } = usenamespace('pagination')

const { pageNum = 1 } = defineProps<PaginationProps>()

const currentPageNum = ref(1)

const { gto, next, prev, selPage } = usePagination(currentPageNum, { pageNum })

const renderPageItem = (idx: number) => {
  const isCurrent = idx === currentPageNum.value
  return h(
    'span',
    {
      class: { sel: isCurrent },
      onClick: () => selPage(idx)
    },
    idx.toString()
  )
}
defineExpose(
  reactive<Pagination>({
    currentPageNum: currentPageNum
  })
)
</script>
<template>
  <div :class="namespace.className">
    <ZlIcon name="arrow-double-left" :width="10" :height="10" @click="gto(1)" />
    <ZlIcon name="arrow-left" :width="10" :height="10" @click="prev" />
    <template v-for="idx in pageNum" :key="idx">
      <template v-if="pageNum <= 10">
        <component :is="renderPageItem(idx)"></component>
      </template>
      <template v-else>
        <template v-if="currentPageNum < 5 && idx <= 6">
          <component :is="renderPageItem(idx)"></component>
        </template>
        <template v-else-if="currentPageNum >= 5 && idx === 1">
          <component :is="renderPageItem(idx)"></component>
          <span>...</span>
        </template>
        <template
          v-else-if="
            currentPageNum >= 5 &&
            currentPageNum <= pageNum - 5 &&
            idx >= currentPageNum - 2 &&
            idx <= currentPageNum + 2
          "
        >
          <component :is="renderPageItem(idx)"></component>
        </template>
        <template v-else-if="currentPageNum <= pageNum - 5 && idx === pageNum">
          <span>...</span>
        </template>
        <template v-else-if="currentPageNum > pageNum - 5 && idx >= pageNum - 5 && idx !== pageNum">
          <component :is="renderPageItem(idx)"></component>
        </template>
        <template v-if="idx === pageNum">
          <component :is="renderPageItem(idx)"></component>
        </template>
      </template>
    </template>
    <ZlIcon name="arrow-right" :width="10" :height="10" @click="next" />
    <ZlIcon name="arrow-double-right" :width="10" :height="10" @click="gto(pageNum)" />
  </div>
</template>
<style lang="css">
@import url(./Pagination.scss);
</style>
