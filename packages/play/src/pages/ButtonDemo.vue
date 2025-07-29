<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonInstance } from 'zl-gp'

const ref1 = ref<ButtonInstance>()
if (ref1.value) {
  ref1.value.eventHandler(new MouseEvent('click'))
}
</script>
<template>
  <zl-container>
    <zl-header>按钮</zl-header>
    <zl-main>
      <div>
        <zl-button ref="ref1" type="primary" size="mini">迷你按钮</zl-button>
        <zl-button name="test" type="primary" size="small">小型按钮</zl-button>
        <zl-button name="test" type="primary" size="large">大型按钮</zl-button>
        <zl-button name="test" type="primary">默认按钮</zl-button>
      </div>
      <div>
        <zl-button ref="ref2" name="test" type="primary">primary</zl-button>
        <zl-button name="test" type="success">success</zl-button>
        <zl-button name="test" type="danger">danger</zl-button>
        <zl-button name="test" type="warning">warning</zl-button>
        <zl-button name="test" type="info">info</zl-button>
        <zl-button name="test" type="light">light</zl-button>
        <zl-button name="test" type="dark">dark</zl-button>
        <zl-button name="test" type="secondary">secondary</zl-button>
      </div>
    </zl-main>
  </zl-container>
</template>
