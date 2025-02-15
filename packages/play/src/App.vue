<template>
  <zl-container>
    <zl-header is="h1">
      <RouterLink to="/button">button</RouterLink>
    </zl-header>
    <zl-main>
      <RouterView />
    </zl-main>
  </zl-container>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
