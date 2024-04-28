<script setup>
import {ref} from "vue";
import {addClient} from "@/api/client.js";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

let clientForm = ref({
  website: '',
  title: '',
  desc: '',
  email: '',
  type: 3
})
let formRef = ref()
let $router = useRouter()
const validateWebsite = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入域名'))
  } else {
    callback()
  }
}
const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else {
    callback()
  }
}
const validateTitle = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入标题'))
  } else {
    callback()
  }
}
const validateDesc = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入描述内容'))
  } else {
    callback()
  }
}
const addRules = {
  email: [{validator: validateEmail, trigger: 'change'}],
  website: [{validator: validateWebsite, trigger: 'change'}],
  title: [{validator: validateTitle, trigger: 'change'}],
  desc: [{validator: validateDesc, trigger: 'change'}],
}
const add = async () => {
  await formRef.value.validate()
  let data = {...clientForm.value};
  data.detail = {
    emails: [data.email]
  }
  delete data.email;
  const res = await addClient(data)
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: res.message
    })
    await $router.push('/about/client')
    reset()
  }
  console.log(res, "新增用户")
}
const reset = () => {
// 清空收集的数据
  Object.assign(clientForm, {email: '', website: '', title: '', desc: ''})
// 清除上一次校验的结果
  formRef?.value?.resetFields()
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 min-h-[80vh]">
    <h1>添加客户</h1>
    <div class="flex justify-center items-center w-full">
      <el-form :model="clientForm" :rules="addRules" ref="formRef" label-position="top" class="w-96">
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input class="w-96" v-model="clientForm.email" placeholder="请输入邮箱账号"/>
        </el-form-item>
        <el-form-item label="域名" label-width="70px" prop="website">
          <el-input class="w-96" v-model="clientForm.website" placeholder="请输入域名"/>
        </el-form-item>
        <el-form-item label="标题" label-width="70px" prop="title">
          <el-input class="w-96" v-model="clientForm.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="描述" label-width="70px" prop="desc">
          <el-input type="textarea" rows="5" class="w-96" v-model="clientForm.desc" placeholder="请输入描述内容"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="primary">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>