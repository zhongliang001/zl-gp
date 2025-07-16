<script setup lang="ts">
import { ref } from 'vue'

const data = ref(['1'])
</script>
<template>
  <zl-checkbox name="test" value="1" v-model="data" label="test1"></zl-checkbox>
  <zl-checkbox name="test" value="2" v-model="data" label="test2"></zl-checkbox>
  <zl-checkbox name="test" value="3" v-model="data" :disabled="true" label="test3"></zl-checkbox>

  <zl-checkbox name="test" value="4" skin="tag" v-model="data" label="test4"></zl-checkbox>
  <zl-checkbox
    name="test"
    value="5"
    skin="tag"
    v-model="data"
    :disabled="true"
    label="test5"></zl-checkbox>
  <zl-checkbox name="test" value="6" skin="customize" v-model="data" label="test6">
    <div>Chrome</div>
    <div>由 Google 公司开发的网页浏览器，被大多数人所使用。</div>
  </zl-checkbox>
  <zl-checkbox name="test" value="7" skin="customize" v-model="data" label="test7" :disabled="true">
    <div>Chrome</div>
    <div>由 Google 公司开发的网页浏览器，被大多数人所使用。</div>
  </zl-checkbox>
</template>
