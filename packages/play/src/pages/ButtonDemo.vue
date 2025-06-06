<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonInstance } from 'zl-gp'

const ref1 = ref<ButtonInstance>()
if (ref1.value) {
  ref1.value.eventHandler(new MouseEvent('click'))
}
</script>
<template>
  <zl-button ref="ref1" name="test" type="primary">primary</zl-button>
  <zl-button name="test" type="success">success</zl-button>
  <zl-button name="test" type="danger">danger</zl-button>
  <zl-button name="test" type="warning">warning</zl-button>
  <zl-button name="test" type="info">info</zl-button>
  <zl-button name="test" type="light">light</zl-button>
  <zl-button name="test" type="dark">dark</zl-button>
  <zl-button name="test" type="secondary">secondary</zl-button>
</template>
