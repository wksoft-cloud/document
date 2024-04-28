<script setup>

import {googleCrawl, googleSearch} from "@/api/search.js";
import {onMounted, ref} from "vue";
import {addClient} from "@/api/client.js";
import {ElMessage} from "element-plus";
import {Plus, Refresh} from "@element-plus/icons-vue";
import {options} from '@/utils/searchSelect.js'
import useUserStore from "@/store/modules/login.js";
// import {loading} from "@/utils/loading.js";

let loading = ref(false)
let searchForm = ref({
  keyword:''
})
let multipleTableRef = ref()
let searchPage = ref({
  page: 1,
  num: 10
})
let disabled = ref(true)
let total = ref(500)
let tableData = ref([])
let crawlForm = ref({
  sites:[]
})
let clientForm = ref({
  profile: {},
  website: "string",
  title: "string",
  desc: "string",
  detail: {},
  type:1
})
let selectClient = ref([])
let showTip = ref(true)
const search = async ()=>{
  const endTime = new Date(useUserStore().userInfo.user.endTime).getTime();
  const newTime = new Date().getTime()
  const time = endTime - newTime
  if (time>0){
    loading.value = true
    if (searchForm.value.keyword===''){
      ElMessage({
        type:"error",
        message:'请输入关键词'
      })
      return
    }
    googleSearch({keyword:`${searchForm.value.keyword} LTD site:${selectValue.value.site} intitle:"our team" -careers -jobs`,page:searchPage.value.page,num:searchPage.value.num}).then((res)=>{
      if (res.status===200){
        tableData.value = res.data;
        disabled.value = false;
        loading.value = false
        console.log(res,'搜索结果')
      }else{
        ElMessage({
          type:'error',
          message:res.message
        })
        loading.value = false
      }
    }).catch((err)=>{
      ElMessage({
        type:'error',
        message:err.message
      })
      loading.value = false
      console.log(err,'搜索错误')
    })
  }else{
    ElMessage({
      type:'error',
      message:'账号到期'
    })
  }
}
const addClients = async (row)=>{
  loading.value = true;
  crawlForm.value.sites.push(row.link)
  const res = await googleCrawl(crawlForm.value)
  console.log(res,'搜索')
  clientForm.value.website = row.displayLink
  clientForm.value.title = row.title
  clientForm.value.desc = row.snippet
  clientForm.value.profile = row
  let obj = {
    emails:[],
    linkedinLinks:[],
    twitterLinks:[],
    url:''
  }
  res.data.map((item)=>{
    obj.emails = [...obj.emails,...item.emails];
    obj.emails = Array.from(new Set(obj.emails))
    obj.linkedinLinks = [...obj.linkedinLinks,...item.linkedinLinks];
    obj.twitterLinks = [...obj.twitterLinks,...item.twitterLinks];
    obj.url = item.url
  })
  clientForm.value.detail = obj
  const result = await addClient(clientForm.value)
  if (result.status === 200){
    ElMessage({
      type:"success",
      message:result.message
    })
    loading.value = false;
  }
  console.log(row,'每一行数据')
  console.log(result,'添加客户结果')
}
const select =  (data)=>{
  selectClient.value = data
  console.log(data,"单选")
}
const selectAll = (data)=>{
  selectClient.value = data
  // selectClient.value.forEach((item)=>{
  //   // console.log(item)
  // })
  console.log(Object.fromEntries(data.entries()),"全选")
  console.log(data,'全选')
}
const batchAdd = async (item)=>{
  crawlForm.value.sites.push(item.link)
  const res = await googleCrawl(crawlForm.value)
  // console.log(res,'搜索')
  clientForm.value.website = item.displayLink
  clientForm.value.title = item.title;
  clientForm.value.desc = item.snippet;
  clientForm.value.profile = item
  clientForm.value.detail = res.data[0]
  await addClient(clientForm.value)
  // console.log(result,'添加结果')
}
const addAllClient = async ()=>{
  loading.value = true
  if (selectClient?.value?.length){
    await Promise.all(
        selectClient.value.map( async (item)=>{
          await batchAdd(item)
        })
    ).then(()=>{
      ElMessage({
        type:'success',
        grouping: true,
        message:'添加成功'
      })
      multipleTableRef.value.clearSelection()
      loading.value = false
    }).catch(()=>{
      ElMessage({
        type:'error',
        message:'添加失败，请求超时'
      })
      multipleTableRef.value.clearSelection()
    })
  }else{
    ElMessage({
      type:'error',
      message:'请选择需要添加的客户'
    })
  }
}
const reset = ()=>{
  multipleTableRef.value.clearSelection()
  searchForm.value.keyword = "";
}
// 搜索下拉选择框
const selectOptions = ref([])
const selectValue = ref({name:'美国'})
const fetchData = async () => {
  const selectArr = []
  options[0].dyz.map((item)=>{
    selectArr.push(item)
  })
  options[0].fz.forEach((item)=>{
    selectArr.push(item)
  })
  options[0].mz.forEach((item)=>{
    selectArr.push(item)
  })
  options[0].oz.forEach((item)=>{
    selectArr.push(item)
  })
  options[0].yz.forEach((item)=>{
    selectArr.push(item)
  })
  selectOptions.value = selectArr.map((item)=>({label:item.name,value:item}))
  console.log(options[0].dyz)
  console.log(selectOptions.value)
};
const selectCountry = (data)=>{
  console.log(data)
  selectValue.value.site = data.site
  console.log(selectValue.value.site)
}
const handleCurrentChange = async (page)=>{
  searchPage.value.page = page
  await search()
}
onMounted(()=>{
  fetchData()
})
</script>

<template>
  <div class="flex justify-center items-center h-20 mb-5  bg-white bg-[url('/public/search.jpg')] bg-cover rounded-lg">
    <!--    <el-select-->
    <!--        v-model="selectOptions.value"-->
    <!--        placeholder="Select"-->
    <!--        size="large"-->
    <!--        style="width: 240px"-->
    <!--    >-->
    <!--      <el-option-->
    <!--          v-for="item in selectOptions"-->
    <!--          :key="item.value"-->
    <!--          :label="item.label"-->
    <!--          :value="item.value"-->
    <!--      />-->
    <!--    </el-select>-->
    <el-select-v2
        :options="selectOptions"
        v-model="selectValue.name"
        value-key="name"
        placeholder="请选择"
        size="large"
        style="width: 240px;margin-right: 10px"
        @change="selectCountry"
    />
    <el-input
        v-model="searchForm.keyword"
        style="width: 600px"
        @change="search"
        placeholder="请输入关键词搜索"
    >
      <template #append>
        <el-button size="large" class="bg-cyan-400" type="primary" @click="search">搜索</el-button>
      </template>
    </el-input>
    <el-button :disabled="disabled" size="large" class="ml-4" type="primary" @click="addAllClient" :icon="Plus">批量添加客户</el-button>
    <el-button :disabled="disabled" size="large" @click="reset" :icon="Refresh">重置</el-button>
  </div>
  <div v-loading="loading">
    <div class="h-auto min-h-[60vh] bg-white rounded-lg px-4 pt-4" v-if="tableData.length">
      <el-table  ref="multipleTableRef" :data="tableData" border @select="select" @select-all="selectAll">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="域名" prop="displayLink" width="200" align="center"></el-table-column>
        <el-table-column  label="标题" prop="title" align="center" :show-overflow-tooltip="showTip"></el-table-column>
        <el-table-column  label="描述" prop="snippet" align="center" :show-overflow-tooltip="showTip"></el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template #default="{row}">
            <el-button link type="primary" @click="addClients(row)">添加客户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center items-center p-4">
        <el-pagination
            v-model:current-page="searchPage.current"
            :page-size="searchPage.pageSize"
            layout="slot, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        >
          <template #default>
            <span>共 {{ total }} 条</span>
          </template>
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <img class="w-full h-auto" src="~/assets/map.jpg" alt="map">
    </div>
  </div>
</template>