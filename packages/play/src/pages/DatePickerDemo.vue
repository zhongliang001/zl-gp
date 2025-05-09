<script lang="ts" setup></script>
<template>
  <zl-form>
    <zl-row :columns="2">
      <zl-col>
        <zl-form-item prop="s" label="日期选择器">
          <zl-date-picker format="YYYYMMDD" weekStart="monday"></zl-date-picker>
        </zl-form-item>
      </zl-col>
    </zl-row>
  </zl-form>
</template>
