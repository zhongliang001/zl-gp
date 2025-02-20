<template>
  <zl-container>
    <zl-header is="div">
      <zl-menu flex="column">
        <zl-menu-sub prop="tt" name="butt">
          <zl-menu-item prop="a">
            <RouterLink to="/button">按钮</RouterLink>
          </zl-menu-item>
        </zl-menu-sub>
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
