<script setup>
import {ArrowDown,SwitchButton} from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/login.js";
import {useRouter} from "vue-router";
import {REMOVE_TOKEN} from "@/utils/userToken.js";
let useStore = useUserStore()
let userInfo = useStore.userInfo
let $router = useRouter()
const logout = ()=>{
  REMOVE_TOKEN()
  $router.push("/")
}
</script>

<template>
    <div class="flex justify-between items-center border-b h-12 px-6">
      <div class="flex justify-between items-center">
        <img src="../public/logo.png" alt="" class="w-5 h-5 mr-2"/>
        <h1 class="font-extrabold text-lg">一站式出海</h1>
      </div>
      <div class="w-30 h-5 text-center">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{userInfo.user.username}}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu class="w-24">
              <el-dropdown-item @click="logout" class="p-2">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</template>