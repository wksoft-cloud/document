<script setup>
import { ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import { IconUsers ,IconUser,IconUserPlus,IconPasswordUser,
  IconUserExclamation,IconUserCog,IconInputSearch,IconUserSearch,
  IconMapSearch,IconMail,IconMailForward,IconMailPlus,IconMailCode,IconMailMinus} from '@tabler/icons-vue';
import {ref} from "vue";
let collapse = ref(false)
</script>
<template>
  <el-aside :style="!collapse?'width:250px':'width:auto'" class="relative" style="overflow: initial">
    <div class="absolute -right-2 top-12 z-10 w-5 h-5 text-center rounded-full bg-white shadow-sm shadow-black" @click="collapse=!collapse">
      <div v-if="!collapse">
        <el-icon color="#333"><ArrowLeft /></el-icon>
      </div>
      <div v-else>
        <el-icon color="#333"><ArrowRight /></el-icon>
      </div>
    </div>
    <el-menu class="h-full bg-slate-50" background-color="rgb(248, 250, 252)" :collapse="collapse" :default-active="$route.path" router>
      <el-sub-menu index="/manage">
        <template #title>
          <IconUserSearch :size="20" stroke-width="1" class="mr-2"/>
          <span>全球搜索</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/manage">
            <IconInputSearch :size="20" stroke-width="1" class="mr-2"/>
            <span>引擎搜索</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/manage/mapSearch">
            <IconMapSearch :size="20" stroke-width="1" class="mr-2"/>
            <span>地图搜索</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
        <el-sub-menu index="/manage/client">
          <template #title>
            <IconUsers  :size="20" stroke-width="1" class="mr-2" />
            <span>客户管理</span>
          </template>
          <el-menu-item-group class="p-0">
              <el-menu-item index="/manage/client">
                <IconUser :size="20" stroke-width="1" class="mr-2"/>
               <span>客户列表</span>
              </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/manage/addClient">
             <IconUserPlus :size="20" stroke-width="1" class="mr-2"/>
              <span>客户添加</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      <el-sub-menu index="/manage/user">
        <template #title>
          <IconUserCog :size="20" stroke-width="1" class="mr-2"/>
          <span>账户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/manage/user">
            <IconUserExclamation :size="20" stroke-width="1" class="mr-2"/>
            <span>账户信息</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/manage/changeUser">
            <IconPasswordUser :size="20" stroke-width="1" class="mr-2"/>
            <span>密码修改</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/manage/mail">
        <template #title>
          <IconMail :size="20" stroke-width="1" class="mr-2"/>
          <span>邮件管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/manage/mail">
            <IconMailForward :size="20" stroke-width="1" class="mr-2"/>
            <span>发送列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="/manage/mailTemplate">
          <template #title>
            <IconMailCode :size="20" stroke-width="1" class="mr-2"/>
            <span>邮件模版</span>
          </template>
          <el-menu-item index="/manage/mailTemplate">
            <IconMailMinus :size="20" stroke-width="1" class="mr-2"/>
            <span>模版列表</span>
          </el-menu-item>
          <el-menu-item index="/manage/addTemplate">
            <IconMailPlus :size="20" stroke-width="1" class="mr-2"/>
            <span>添加模版</span>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>