import { moveElement } from '@zl-gp/utils'
import { remove } from 'lodash-es'
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
  type InjectionKey
} from 'vue'
import type { RouteRecord } from 'vue-router'
import type { TabsContext } from './types'

export const useTabs = (isMenu: boolean) => {
  const instance = getCurrentInstance()
  const route = computed(() => instance?.proxy?.$route)

  const routes: (typeof route)['value'][] = reactive([])

  const exclude: string[] = reactive([])

  const defaultSet = ref(false)

  const selName = reactive<{ name?: string }>({})

  if (isMenu) {
    watch(route, () => {
      if (!routes.some((r) => r?.path === route.value?.path)) {
        routes.push(route.value)
        const compName = getCompName(route.value)
        if (compName) {
          remove(exclude, (i) => i === compName)
        }
      }
    })
  }
  onMounted(() => {
    if (isMenu) {
      const rts: RouteRecord[] | undefined = instance?.proxy?.$router.getRoutes()
      rts?.forEach((croute) => {
        if (croute?.meta._default === true) {
          const resolvedRoute = instance?.proxy?.$router.resolve({ name: croute.name })
          if (resolvedRoute && resolvedRoute.name !== null) {
            defaultSet.value = true
            routes.push(resolvedRoute as (typeof route)['value'])
          }
        }
      })
    } else {
      if (children.length > -1) {
        selName.name = children[0]
      }
    }
  })

  const children = reactive<string[]>([])

  const addChildren = (name: string) => {
    children.push(name)
  }

  const close = (event: Event, item: (typeof route)['value']) => {
    event.stopPropagation()
    const compName = getCompName(item)
    if (compName) {
      exclude.push(compName)
    }
    remove(routes, (i) => i?.path === item?.path)
    if (routes.length > 0 && routes[0] !== undefined) instance?.proxy?.$router.push(routes[0])
  }

  const closePanel = (event: Event, item: string) => {
    event.stopPropagation()
    remove(children, (i) => i === item)
  }

  const getCompName = (item: (typeof route)['value']) => {
    if (item?.matched) {
      const ites = item.matched.filter((ite) => {
        if (ite.name === item.name || ite.path === item.fullPath) {
          return ite
        }
      })
      if (ites) {
        const comp = ites[0].components?.default
        if (typeof comp === 'object' && comp !== null) {
          return (comp as { name?: string }).name || (comp as { __name?: string }).__name
        }
      }
    }
  }

  //tab 拖动
  const dragging = ref(false)
  const dragIndex = ref(-1)
  const startX = ref(0)
  const offsetX = ref(0)
  const hoverIndex = ref(-1)

  const dragMenuTab = (event: MouseEvent, index: number, item: (typeof route)['value']) => {
    if (item) {
      instance?.proxy?.$router.push(item)
    }
    drag(event, index)
  }

  const dragPanelTab = (event: MouseEvent, index: number, item: string) => {
    if (item) {
      selName.name = item
    }
    drag(event, index)
  }

  const drag = (event: MouseEvent, index: number) => {
    if (index === 0 && defaultSet.value) {
      return
    }
    const currentTarget = event.currentTarget as HTMLElement | null
    const defaltWith = currentTarget ? currentTarget.offsetWidth : 0
    dragging.value = true
    dragIndex.value = index
    startX.value = event.clientX
    offsetX.value = 0

    const move = (e: MouseEvent) => {
      if (!dragging.value) return
      offsetX.value = e.clientX - startX.value
      let idx = 0
      if (Math.abs(offsetX.value) > defaltWith) {
        idx = Math.round(offsetX.value / defaltWith)
      }
      if (idx + index > routes.length) {
        hoverIndex.value = routes.length - 1
      } else if (idx + index <= 0) {
        hoverIndex.value = 0
      } else {
        hoverIndex.value = idx + index
      }
    }
    const up = () => {
      if (hoverIndex.value > routes.length) {
        moveElement(routes, index, routes.length - 1)
      } else if (hoverIndex.value <= 0) {
        if (defaultSet.value) {
          moveElement(routes, index, 1)
        } else {
          moveElement(routes, index, 0)
        }
      } else {
        moveElement(routes, index, hoverIndex.value)
      }
      dragging.value = false
      dragIndex.value = -1
      offsetX.value = 0
      hoverIndex.value = -1
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  return {
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
  }
}
export const TabsInjectkey: InjectionKey<TabsContext> = Symbol('TabsInjectkey')
