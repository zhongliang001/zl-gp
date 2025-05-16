<script setup lang="ts">
import { ref } from 'vue'
import type { FileInput } from 'zl-gp'

const fileInput = ref<FileInput | null>(null)
</script>
<template>
  <zl-file-input type="primary" ref="fileInput" name="ss" :multiple="true"></zl-file-input>
</template>
