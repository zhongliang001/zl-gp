<script lang="ts" setup>
import { ref } from 'vue'
import { Form } from 'zl-gp'

const data = ref({
  a: '1',
  b: '',
  c: '',
  d: ''
})

const form = ref<Form | null>(null)

const click = () => {
  // if (form.value) {
  //   form.value.reset()
  // }
  console.log('---')
}
</script>
<template>
  <zl-form ref="form" v-model="data">
    <zl-row>
      <zl-col>
        <zl-form-item label="判断收否字符串" prop="a">
          <zl-input
            name="test"
            placeholder="请输入"
            type="text"
            pattern="^[A-Za-z]+$"
            v-model="data.a"
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
            pattern="/^[A-Za-z]+$/"
            v-model="data.c"
          ></zl-input>
        </zl-form-item>
      </zl-col>
      <zl-col>
        <zl-form-item label="hi1" prop="d">
          <zl-input name="test" placeholder="请输入" type="text" v-model="data.d"></zl-input>
        </zl-form-item>
      </zl-col>
    </zl-row>
    <zl-button native-type="submit" @click="click">clear</zl-button>
  </zl-form>
</template>
