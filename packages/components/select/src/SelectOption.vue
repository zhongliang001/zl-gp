<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import type { SelectOptionProps } from './SelectOption'
import { SelectInjectKey } from './Select'

defineOptions({
  name: 'ZlSelectOption'
})
const { name, value } = defineProps<SelectOptionProps>()
const selectContext = inject(SelectInjectKey)

onMounted(() => {
  const addOption = selectContext?.addOption
  if (addOption) {
    addOption({
      name: name,
      value: value,
      info: name,
      filter: false
    })
  }
})
</script>
