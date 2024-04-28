<script setup>
import {mailList} from "@/api/mail.js";
import {onMounted, ref} from "vue";
import {dayjs} from "element-plus";
import {loading} from "@/utils/loading.js";

let mailPage = ref({
  pageSize: 10,
  current: 1
})
let total = ref(0)
let tableData = ref([])
const getMailList = async () => {
  const res = await mailList(mailPage.value)
  tableData.value = res.data.list
  total.value = res.data.total
  console.log(res, '邮件列表')
}
const handleCurrentChange = (page) => {
  mailPage.value.current = page
  getMailList()
}
onMounted(() => {
  getMailList()
})
</script>

<template>
  <div class="h-auto bg-white rounded-lg p-4 min-h-[80vh]" v-if="tableData.length">
    <div class="p-2">
      <h1>发送列表</h1>
    </div>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
      <el-table-column label="发送时间" align="center">
        <template #default="{row}">
          <div>{{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template #default="{row}">
          <div>{{ dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center items-center pt-6">
      <el-pagination
          v-model:current-page="mailPage.current"
          :page-size="mailPage.pageSize"
          layout="slot, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          :hide-on-single-page="tableData.length<=mailPage.pageSize"
      >
        <template #default>
          <span>共 {{ total }} 条</span>
        </template>
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <el-empty description="无数据" />
  </div>
</template>