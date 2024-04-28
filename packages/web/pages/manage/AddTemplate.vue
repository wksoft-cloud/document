<script setup>
import {data} from "@/api/client.js";
import {ref} from "vue";
import {mailTmp} from "@/api/mail.js";
import {ElMessage} from "element-plus";
import {QuillEditor} from "@vueup/vue-quill";
import {useRouter} from "vue-router";
let tmpForm = ref({
  title: "",
  desc: "",
  detail: "",
  subject: "",
  replyTo: ""
})
const myQuillEditor = ref()
const formRef = ref()
const $router = useRouter()
const validateTitle = (rule,value,callback)=>{
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateDesc = (rule,value,callback)=>{
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateDetail = (rule,value,callback)=>{
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateSubject = (rule,value,callback)=>{
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateReplyTo = (rule,value,callback)=>{
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const rules = {
  title:[{ validator:validateTitle, trigger: 'change'}],
  desc:[{ validator:validateDesc, trigger: 'change'}],
  detail:[{ validator:validateDetail, trigger: 'change'}],
  subject:[{ validator:validateSubject, trigger: 'change'}],
  replyTo: [{ validator:validateReplyTo, trigger: 'change'}]
}
const confirmCreate = async ()=>{
  const res = await mailTmp(tmpForm.value)
  if (res.status===200){
    ElMessage({
      type:'success',
      message:res.message
    })
    await $router.push('/about/mailTemplate')
  }
}
const cancel = ()=>{
// 清空收集的数据
  Object.assign(tmpForm, {title:'', desc: '', detail: '', subject: '', replyTo: ''})
// 清除上一次校验的结果
  formRef.value.resetFields()
  // clearContent()
  myQuillEditor.value.setContents('')
}
</script>

<template>
<div class="bg-white rounded-lg p-4 min-h-[80vh]">
  <div class="mb-4">
    <h1>添加模版</h1>
  </div>
  <div class="flex justify-center items-center">
  <el-form :model="tmpForm" :rules="rules" ref="formRef" style="width: 500px">
    <el-form-item label="标题" prop="title" label-width="70px">
      <el-input class="w-[418px]" v-model="tmpForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="desc" label-width="70px">
      <el-input class="w-[418px]" v-model="tmpForm.desc" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item label="邮箱主题" prop="subject" label-width="70px">
      <el-input class="w-[418px]" v-model="tmpForm.subject" placeholder="请输入邮箱主题"></el-input>
    </el-form-item>
    <el-form-item label="回复邮箱" prop="replyTo" label-width="70px">
      <el-input  class="w-[418px]" v-model="tmpForm.replyTo" placeholder="请输入回复邮箱"></el-input>
    </el-form-item>
    <el-form-item label="内容"  label-width="70px">
      <QuillEditor
          style="width:418px;height: 260px"
          ref="myQuillEditor"
          theme="snow"
          v-model:content="tmpForm.detail"
          :options="data.editorOption"
          contentType="html"/>
    </el-form-item>
    <el-form-item>
      <div class="w-full flex justify-center items-center">
        <el-button type="primary" @click="confirmCreate">添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>