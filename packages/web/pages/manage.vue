<template>
  <el-container class="h-screen">
    <el-header class="mb-1 h-auto">
      <Header/>
    </el-header>
    <el-container class="h-5/6">
      <Aside/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>