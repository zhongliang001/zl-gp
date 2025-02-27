<template>
  <ZlForm v-model="data">
    <ZlFormItem prop="username" label="用户名">
      <ZlInput
        type="text"
        name="username"
        v-model="data.username"
        placeholder="请输入用户名"
        :width="100"
        :height="30"
        :max="100"
        :maxlength="100"
        :min="1"
        :minlength="3"
        :pattern="/^[a-zA-Z0-9]{3,}$/"
        :readonly="false"
        required="required"
        :disabled="false"
        :step="1"
      />
    </ZlFormItem>
    <ZlButton native-type="submit">submit</ZlButton>
  </ZlForm>
</template>
<script lang="ts" setup>
import { ZlButton, ZlForm, ZlFormItem, ZlInput } from '@zl-gp/components'
const data = {
  username: ''
}
</script>
