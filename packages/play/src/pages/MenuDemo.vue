<template>
  <zl-menu flex="row">
    <zl-menu-item to="/" prop="tes0">首页</zl-menu-item>
    <zl-menu-item to="/TransInfo" prop="tes">交易信息</zl-menu-item>
    <zl-menu-item to="/QrtzJobDetails" prop="tes1">定时任务</zl-menu-item>
    <zl-menu-item to="/PickStock" prop="tes2">收藏股票</zl-menu-item>
    <zl-menu-sub prop="tj" name="统计数据">
      <zl-menu-item to="/StockDaily" prop="tes3">DMA金叉数据</zl-menu-item>
      <zl-menu-item to="/QueryKdjGold" prop="tes4">KDJ金叉数据</zl-menu-item>
    </zl-menu-sub>
  </zl-menu>
</template>
