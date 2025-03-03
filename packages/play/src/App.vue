<template>
  <zl-container>
    <zl-header is="div">
      <zl-menu flex="row">
        <zl-menu-sub prop="tt" name="comp">
          <zl-menu-item prop="button">
            <RouterLink to="/button">按钮</RouterLink>
          </zl-menu-item>
          <zl-menu-item prop="row">
            <RouterLink to="/row">layout</RouterLink>
          </zl-menu-item>
          <zl-menu-item prop="form">
            <RouterLink to="/form">form</RouterLink>
          </zl-menu-item>
          <zl-menu-item prop="table">
            <RouterLink to="/table">table</RouterLink>
          </zl-menu-item>
          <zl-menu-item prop="select">
            <RouterLink to="/select">select</RouterLink>
          </zl-menu-item>
          <zl-menu-item prop="icon">
            <RouterLink to="/icon">icon</RouterLink>
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
