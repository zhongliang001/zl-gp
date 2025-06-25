<script setup lang="ts">
import { usenamespace } from '@zl-gp/hooks'
import { TabsInjectkey, useTabs } from './Tabs'
import type { TabProps } from './types'
import { provide } from 'vue'
defineOptions({
  name: 'ZlTabs'
})

const { namespace } = usenamespace('tab')

const { isMenu = false, closeable = false } = defineProps<TabProps>()

const {
  addChildren,
  children,
  close,
  closePanel,
  dragging,
  dragIndex,
  dragMenuTab,
  dragPanelTab,
  exclude,
  hoverIndex,
  offsetX,
  route,
  routes,
  selName
} = useTabs(isMenu)

provide(TabsInjectkey, {
  addChildren,
  selName
})
</script>
<template>
  <div :class="namespace.className">
    <div class="titles">
      <template v-if="isMenu">
        <div
          class="title"
          :class="[
            {
              sel: route?.name === item?.name,
              hover: hoverIndex === index && hoverIndex !== dragIndex
            }
          ]"
          v-for="(item, index) in routes"
          :key="index"
          @mousedown.prevent="dragMenuTab($event, index, item)"
          :style="
            dragging && dragIndex === index
              ? `transform: translateX(${offsetX}px); z-index: 10;`
              : ''
          ">
          <span>{{ item?.name }}</span>
          <ZlIcon
            v-if="index !== 0 && closeable"
            name="close"
            @click="close($event, item)"></ZlIcon>
        </div>
      </template>
      <template v-else>
        <div
          class="title"
          :class="[
            {
              sel: selName === item,
              hover: hoverIndex === index && hoverIndex !== dragIndex
            }
          ]"
          v-for="(item, index) in children"
          @mousedown.prevent="dragPanelTab($event, index, item)"
          :key="index">
          <span>{{ item }}</span>
          <ZlIcon
            v-if="index !== 0 && closeable"
            name="close"
            @click="closePanel($event, item)"></ZlIcon>
        </div>
      </template>
    </div>
    <div>
      <template v-if="isMenu">
        <router-view v-slot="{ Component }">
          <keep-alive :exclude="exclude">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>
<style lang="css">
@import url(Tabs.scss);
</style>
