<template>
  <el-result
      icon="warning"
      title="404提示"
      sub-title="你找的页面走丢了~"
      class="bg-white"
  >
    <template #extra>
      <el-button type="primary" @click="$router.push('/manage')">返回首页</el-button>
    </template>
  </el-result>
</template>

<script setup>

</script>
