<script setup>
import useUserStore from "@/store/modules/login.js";
import {ref} from "vue";

let userStore = useUserStore()
let userForm = userStore.userInfo.user
</script>

<template>
  <div class="bg-white rounded-lg p-4 min-h-[80vh]">
  <h1>账户信息</h1>
    <div class="flex justify-center items-center w-full">
  <el-form label-position="top" class="w-96">
    <el-form-item label="用户名">
      <el-input class="w-full" readonly v-model="userForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input class="w-full" readonly v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker
          v-model="userForm.createdAt"
          readonly
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
          style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="最近更新">
      <el-date-picker
          v-model="userForm.updatedAt"
          readonly
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
          style="width: 100%"
      />
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>