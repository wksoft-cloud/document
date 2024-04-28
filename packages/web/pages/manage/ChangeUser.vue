<script setup>
import useUserStore from "@/store/modules/login.js";
import {ref} from "vue";
import {updateUser} from "@/api/user.js";
import {GET_TOKEN} from "@/utils/userToken.js";
import {ElMessage} from "element-plus";

let userStore = useUserStore()
let userForm = userStore.userInfo.user
let updateForm = ref({
  clientId:0,
  password:'',
  endTime:''
})
const preserve = async ()=>{
  updateForm.value.clientId = userForm.id
  updateForm.value.password = userForm.password
  updateForm.value.endTime = userForm.endTime
  await updateUser(updateForm.value)
  const userInfo = JSON.parse(GET_TOKEN())
  userInfo.user.password = updateForm.value.password
  localStorage.setItem('USERINFO',JSON.stringify(userInfo))
  ElMessage({
    type:'success',
    message:'密码修改成功'
  })
}
const reset = ()=>{
  const userInfo = JSON.parse(GET_TOKEN())
  userForm.password = userInfo.user.password
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 min-h-[80vh]">
    <h1>密码修改</h1>
    <div class="flex justify-center items-center">
      <el-form label-position="top" class="w-96">
        <el-form-item label="用户名">
          <el-input class="w-full" disabled v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="w-full" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="preserve">保存</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>