<script setup>
import {ref} from "vue";
import useUserStore from "@/store/modules/login.js";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {isLogin} from "@/api/login.js";
import {Lock, User} from "@element-plus/icons-vue";
let $router = useRouter()
let loginForm = ref({
  username:"",
  password:""
})
let userStore = useUserStore()
// let token = userStore.userInfo.token
let formRef = ref()
let automaticLogin = ref(true)
const validateUsername = (rule,value,callback)=>{
  if (!value){
    callback(new Error('请输入正确的用户名'))
  }else{
    callback()
  }
}
const validatePassword = (rule,value,callback)=>{
  if(!value){
    callback(new Error('请输入正确的密码'))
  }else{
    callback()
  }
}
const rules = {
  username:[{ validator: validateUsername, trigger: 'change' }],
  password:[{ validator: validatePassword, trigger: 'change' }]
}
const toRegister = ()=>{
  isLogin.value = false
}
const login = async  ()=>{
  await formRef.value.validate()
  try {
    await userStore.userLogin(loginForm.value)
    ElMessage({
      type:"success",
      message:'登录成功'
    })
    await $router.push({
      path:"/manage"
    })
  }catch (error){
    ElMessage({
      type:'error',
      message:error.message
    })
  }
}
</script>

<template>
  <div class="flex justify-center items-center mb-5">
    <img class="w-16 h-16" src="../public/logo.png" alt="logo"/>
  </div>
  <el-form :rules="rules" :model="loginForm" ref="formRef" class="w-80">
          <h1 class="text-center mb-5 text-lg font-extrabold">一站式出海[登录]</h1>
          <el-form-item prop="username">
            <el-input class="w-80" :prefix-icon="User" size="large" v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="w-80"
                      :prefix-icon="Lock"
                      size="large"
                      v-model="loginForm.password"
                      placeholder="密码"
            ></el-input>
          </el-form-item>
          <div class="w-full">
            <div class="flex justify-between mb-5">
              <div>
                <el-checkbox v-model="automaticLogin">自动登录</el-checkbox>
              </div>
              <div>
                <el-button class="ml-40" link type="primary" @click="toRegister">注册用户</el-button>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button class="w-full" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
</template>