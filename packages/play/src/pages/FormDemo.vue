<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance, FormRule } from 'zl-gp'

const data = ref({
  test: '1',
  b: '',
  c: '',
  d: '',
  file: ''
})

const form = ref<FormInstance | null>(null)

const click = () => {
  if (form.value) {
    form.value.reset()
  }
}

const check = () => {
  return true
}

const rule: FormRule[] = [
  {
    name: 'test',
    rules: [
      {
        reg: /^[A-Za-z]+$/,
        message: 'ssss'
      }
    ]
  }
]

const valid = () => {
  if (form.value) {
    form.value.validate()
  }
}
</script>
<template>
  <zl-form ref="form" v-model="data" :rules="rule">
    <zl-row>
      <zl-col>
        <zl-form-item label="判断收否字符串" prop="test">
          <zl-input
            name="www"
            placeholder="请输入"
            type="text"
            v-model="data.test"
            :maxlength="10"
            :clearable="true"
          ></zl-input>
        </zl-form-item>
      </zl-col>
      <zl-col>
        <zl-form-item label="hi1" prop="b">
          <zl-input name="test" placeholder="请输入" type="text" v-model="data.b"></zl-input>
        </zl-form-item>
      </zl-col>
    </zl-row>
    <zl-row>
      <zl-col>
        <zl-form-item label="判断收否字符串" prop="c">
          <zl-input
            name="test"
            placeholder="请输入"
            type="text"
            pattern="^[A-Za-z]+$"
            v-model="data.c"
            :valid="check"
          ></zl-input>
        </zl-form-item>
      </zl-col>
      <zl-col>
        <zl-form-item label="hi1" prop="d">
          <zl-select name="select" v-model="data.d">
            <zl-select-option name="测试1" value="t"></zl-select-option>
            <zl-select-option name="我是" value="t1"></zl-select-option>
            <zl-select-option name="案例1" value="t2"></zl-select-option>
          </zl-select>
        </zl-form-item>
      </zl-col>
    </zl-row>
    <zl-button native-type="button" @click="valid">valid</zl-button>
    <zl-button native-type="button" @click="click">clear</zl-button>
  </zl-form>
</template>
