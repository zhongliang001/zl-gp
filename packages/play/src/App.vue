<template>
  <zl-container>
    <zl-header is="h1">
      <zl-menu>
        <zl-menu-item prop="a">
          <RouterLink to="/button">button</RouterLink>
        </zl-menu-item>
        <zl-menu-item prop="b">
          <RouterLink to="/button">button</RouterLink>
        </zl-menu-item>
      </zl-menu>
    </zl-header>
    <zl-main>
      <RouterView />
    </zl-main>
  </zl-container>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
