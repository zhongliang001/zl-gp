<template>
  <zl-container>
    <zl-header is="div">
      <zl-menu flex="row">
        <zl-menu-sub prop="tt" name="comp">
          <zl-menu-item to="/button" prop="button">按钮</zl-menu-item>
          <zl-menu-item to="/row" prop="row">row</zl-menu-item>
          <zl-menu-item to="/form" prop="form">form</zl-menu-item>
          <zl-menu-item to="/table" prop="table">table</zl-menu-item>
          <zl-menu-item to="/select" prop="select">select</zl-menu-item>
          <zl-menu-item to="/icon" prop="icon">icon</zl-menu-item>
          <zl-menu-item to="/card" prop="card">card</zl-menu-item>
          <zl-menu-item to="/menu" prop="menu">menu</zl-menu-item>
          <zl-menu-item to="/fileInput" prop="fileInput">fileInput</zl-menu-item>
        </zl-menu-sub>
      </zl-menu>
    </zl-header>
    <zl-main>
      <RouterView />
    </zl-main>
  </zl-container>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
