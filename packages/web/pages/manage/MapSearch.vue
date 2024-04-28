<script setup>
import useUserStore from "@/store/modules/login.js";

const userStore = useUserStore()
const userId = userStore.userInfo.user.id
const src = `http://13.213.6.33:8000/?userId=${userId}`
</script>

<template>
  <iframe class="w-full h-full" :src="src">

  </iframe>
</template>