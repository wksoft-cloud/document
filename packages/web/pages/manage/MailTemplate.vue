<template>
  <div class="bg-white rounded-lg px-4 pt-4 min-h-[80vh]" v-if="mailData.length" v-loading="loading">
    <h1 class="mb-5">模版列表</h1>
    <el-table :data="mailData" border ref="tableRef">
      <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="标题" prop="title" align="center"></el-table-column>
      <el-table-column label="描述" prop="desc" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template #default="{row}">
          <div>{{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
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
          :hide-on-single-page="mailData.length<=mailPage.pageSize"
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
<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {createTmpVisible, mailTmp, mailTmplist} from "@/api/mail.js";
import {data} from "@/api/client.js";
import {QuillEditor} from "@vueup/vue-quill";
import {Plus} from "@element-plus/icons-vue";
import {loading} from "@/utils/loading.js";
import {dayjs} from "element-plus";

let mailData = ref([])
let table = ref([])
let tableRef = ref()
let mailPage = ref({
  pageSize: 10,
  current: 1
})
let total = ref(0)
const getMailTmp = async () => {
  const res = await mailTmplist(mailPage.value)
  mailData.value = res.data.list
  total.value = res.data.total
  console.log(res, '邮件模版列表')
}
const handleCurrentChange = (page)=>{
  mailPage.value.current = page
  getMailTmp()
}
// const handSizeChange = (size)=>{
//   mailPage.value.pageSize = size
// }
onUpdated(()=>{
 table.value = mailData.value
  console.log(mailData.value)
})
onMounted(() => {
  getMailTmp()
  console.log(table.value)
})
</script>