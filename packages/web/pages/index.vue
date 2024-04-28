<template>
  <div class="flex justify-center items-center bg-login bg-cover w-screen h-screen">
    <div class="w-80 h-auto">
      <Login v-if="isLogin"/>
      <Register v-else/>
    </div>
  </div>
</template>

<script setup>

import Login from "~/components/login.vue";
import Register from "~/components/register.vue";
import {isLogin} from "@/api/login.js";
</script>
