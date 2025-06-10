<template>
  <div>
    <div>
      <zl-switch
        size="large"
        v-model="testData.ch"
        :outside="false"
        active-text="false"
        in-active-text="true"></zl-switch>
    </div>
    <div>
      <zl-switch
        size="large"
        v-model="testData.ch"
        active-text="false"
        in-active-text="true"></zl-switch>
    </div>

    <div>
      <zl-switch
        v-model="testData.ch"
        :outside="false"
        active-text="false"
        in-active-text="true"></zl-switch>
    </div>
    <div>
      <zl-switch v-model="testData.ch" active-text="false" in-active-text="true"></zl-switch>
    </div>
    <div>
      <zl-switch
        size="small"
        v-model="testData.ch"
        :outside="false"
        active-text="1sdqwefsfds"
        in-active-text="true"></zl-switch>
    </div>
    <div>
      <zl-switch
        size="small"
        v-model="testData.ch"
        active-text="false"
        in-active-text="true"></zl-switch>
      {{ testData.ch }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const testData = ref({
  ch: true
})
</script>
