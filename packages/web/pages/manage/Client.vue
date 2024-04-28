<script setup>
import {onMounted, ref} from "vue";
import {clientFormVisible, data, getClientList, removeClient, updateClient} from "@/api/client.js";
import {dayjs, ElMessage} from "element-plus";
import {mailSend, mailTmplist} from "@/api/mail.js";
import {QuillEditor} from "@vueup/vue-quill";
import {Download, Message, Refresh, Upload} from "@element-plus/icons-vue";
import {exportClient} from "@/api/export.js";
import useUserStore from "@/store/modules/login.js";
import {loading} from "@/utils/loading.js";

let tableData = ref([])
let tooltipOptions = {
  enterable: true, placement: 'top', showArrow: true, hideAfter: 200, popperOptions: {strategy: 'fixed'}
}
// 表格实例
let multipleTableRef = ref()
let clientPage = ref({
  pageSize: 10,
  current: 1
})
let total = ref(0)
let updateForm = ref({
  clientId: 0,
  email: '',
  website: '',
  title: '',
  desc: '',
})
let updateFormVisible = ref(false)
// 控制邮件表单弹出
let mailFormVisible = ref(false)
let mailForm = ref({
  to: [],
  subject: '',
  text: '',
  html: '',
  replyTo: ''
})
// 表单实例
let formRef = ref()
// 邮箱表单实例
let mailRef = ref()
// 控制模版是否选中
const checked = ref(false)
let myQuillEditor = ref(null)
let showTip = ref(true)
const cancelCreate = () => {
// 清空收集的数据
  Object.assign(updateForm, {email: '', website: '', title: '', desc: ''})
// 清除上一次校验的结果
  formRef.value.resetFields()
  clientFormVisible.value = false
}
let removeClientId = ref({
  clientId: 0
})
const validateWebsite = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入网址'))
  } else {
    callback()
  }
}
const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateTitle = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入标题'))
  } else {
    callback()
  }
}
const validateDesc = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请描述内容'))
  } else {
    callback()
  }
}
const validateTwitter = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入推特网址'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else {
    callback()
  }
}
const validateTag = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入标签'))
  } else {
    callback()
  }
}
// 新增客户表单校验
const addRules = {
  email: [{validator: validateEmail, trigger: 'change'}],
  website: [{validator: validateWebsite, trigger: 'change'}],
  title: [{validator: validateTitle, trigger: 'change'}],
  desc: [{validator: validateDesc, trigger: 'change'}],
  twitter: [{validator: validateTwitter, trigger: 'change'}],
  phone: [{validator: validatePhone, trigger: 'change'}],
  tag: [{validator: validateTag, trigger: 'change'}]
}
const validateTo = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱账号'))
  } else {
    callback()
  }
}
const validateSubject = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入主题'))
  } else {
    callback()
  }
}
const validateText = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}
const validateHtml = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}
const validateReplyTo = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入回复邮箱账号'))
  } else {
    callback()
  }
}
// 发送邮箱表单校验
const mailRules = {
  to: [{validator: validateTo, trigger: 'change'}],
  subject: [{validator: validateSubject, trigger: 'change'}],
  text: [{validator: validateText, trigger: 'change'}],
  html: [{validator: validateHtml, trigger: 'change'}],
  replyTo: [{validator: validateReplyTo, trigger: 'change'}]
}
const getList = async () => {
  const res = await getClientList(clientPage.value)
  tableData.value = [...res.data.list]
  total.value = res.data.total
  console.log(res, "客户列表")
}
// 删除客户
const remove = async (row) => {
  removeClientId.value.clientId = row.id
  const res = await removeClient(removeClientId.value)
  if (res.status === 200) {
    ElMessage({
      type: "success",
      grouping: true,
      message: res.message
    })
  }
  console.log(res, "删除客户")
  await getList()
  console.log(tableData.value)
}
// 更新客户
const update = async (row) => {
  JSON.parse(JSON.stringify(row))
  console.log(updateForm.value, "更新表单")
  if (row?.detail?.emails?.length) {
    updateForm.value.email = row.detail.emails.join()
  }
  updateForm.value.clientId = row.id;
  updateForm.value.desc = row.desc;
  updateForm.value.website = row.website;
  updateForm.value.title = row.title;
  updateFormVisible.value = true
  console.log(row, "更新数据")
}
// 取消更新客户表单
const cancelUpdate = () => {
  // 清空收集的数据
  Object.assign(updateForm, {detail: {}, website: '', title: '', desc: ''})
// 清除上一次校验的结果
  formRef.value.resetFields()
  updateFormVisible.value = false
}
// 确认更新客户表单
const confirmUpdate = async () => {
  let data = {...updateForm.value};
  data.detail = {
    emails: [data.email]
  }
  delete data.email;
  const res = await updateClient(data)
  updateFormVisible.value = false
  await getList()
  if (res.status === 200) {
    ElMessage({
      type: "success",
      message: res.message
    })
  }
  console.log(res, "更新客户")
}
// 发送邮件
const sendMail = (row) => {
  if (!row?.detail?.emails?.length) {
    ElMessage({
      type: 'error',
      message: "未发现邮箱"
    })
    return
  }
  if (row.detail.emails.join() === '') {
    ElMessage({
      type: 'error',
      message: "未发现邮箱"
    })
    return
  }
  mailFormVisible.value = true
  const uniqueArray = [...new Set(row.detail.emails)];
  console.log(uniqueArray);
  mailForm.value.to = row.detail.emails
  console.log(row, "每一行数据")
  console.log(mailForm.value.to, '数据邮箱')
}
const cancelSend = () => {
// 清空收集的数据
  Object.assign(mailForm, {to: [], subject: '', text: '', html: '', replyTo: ''})
  mailForm.value.html = ''
// 清除上一次校验的结果
  mailRef.value.resetFields()
  myQuillEditor.value.setContents('')
  mailFormVisible.value = false;
  temChecked.value = null
}
// 选择发送邮件的模版
const temChecked = ref()
const selectTmp = (item, index) => {
  mailForm.value.html = item;
  temChecked.value = index;
  console.log(mailForm.value.html, '富文本的值')
  // console.log(index,'选择的模版')
}
// const tagChange = (status) => {
//   checked.value = status
//   console.log(status, '点击状态')
// }
const confirmSend = async () => {
  const res = await mailSend(mailForm.value)
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: res.message
    })
    mailFormVisible.value = false;
  }
  console.log(res, '邮件发送')
}
// 选择一项客户
const select = (data) => {
  const selectEmail = []
  data.forEach((item) => {
    if (item?.detail?.emails?.length) {
      selectEmail.push(item.detail.emails.join())
    }
  })
  mailForm.value.to = selectEmail
  console.log(data, '选择的email')
}
const selectAll = (data) => {
  const selectEmail = []
  data.forEach((item) => {
    if (item?.detail?.emails?.length) {
      selectEmail.push(item.detail.emails.join())
    }
  })
  mailForm.value.to = selectEmail
  console.log(selectEmail, '选择所有')
}
// 群发邮件
const sendAllMail = async () => {
  if (!mailForm.value.to.length || mailForm.value.to.join() === '') {
    ElMessage({
      type: 'error',
      message: '未检测到邮箱'
    })
    return
  }
  mailFormVisible.value = true
}

const handleCurrentChange = (page) => {
  clientPage.value.current = page
  getList()
}
const exportClients = async () => {
  const res = await exportClient()
  const link = document.createElement('a');
  link.href = res.url;
  link.download = '客户邮箱.xlsx';
  document.body.appendChild(link);
  // 模拟点击下载
  link.click();
  // 下载完成后移除<a>标签
  document.body.removeChild(link);
  console.log(res, '导出')
}
const useStore = useUserStore()
const token = {Authorization: `Bearer ${useStore.userInfo.token}`}
const uploadSuccess = () => {
  ElMessage({
    type: 'success',
    message: "上传成功"
  })
  getList()
}
const uploadError = () => {
  ElMessage({
    type: "error",
    message: "上传失败"
  })
}
const uploadTmp = () => {
  const link = document.createElement('a');
  link.href = 'https://snailshellsoft.oss-cn-shanghai.aliyuncs.com/%E5%AE%A2%E6%88%B7%E5%88%97%E8%A1%A8%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx';
  link.download = '上传格式.xlsx';
  document.body.appendChild(link);
  // 模拟点击下载
  link.click();
  // 下载完成后移除<a>标签
  document.body.removeChild(link);
}
const reset = () => {
  multipleTableRef.value.clearSelection();
  mailForm.value.to = [];
  clientPage.value.current = 1;
  getList()
}
let tmpList = ref([])
let mailPage = ref({
  pageSize: 10,
  current: 1
})
// 获取邮件模版
const getMailTmp = async () => {
  const res = await mailTmplist(mailPage.value)
  const tmp = res.data.list
  tmp.forEach((item) => {
    tmpList.value.push(item.title)
  })
  console.log(tmpList.value, "数据循环")
  console.log(res, '邮件模版列表')
}
onMounted(() => {
  getList()
  getMailTmp()
})
</script>

<template>
  <div class="bg-white w-full pt-5 rounded-lg pl-4">
    <el-form inline class="h-full">
      <el-form-item>
        <el-button @click="sendAllMail" type="primary" :icon="Message">群发邮件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportClients" type="primary" :icon="Download">导出</el-button>
      </el-form-item>
      <el-form-item>
          <el-upload
              action="https://foreign-trade-api.snailshellsoft.com/excel/upload/client"
              multiple
              :headers="token"
              name="file"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :show-file-list="false"
          >
            <el-button type="primary" :icon="Upload">上传</el-button>
          </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uploadTmp" :icon="Upload">上传模版</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset" type="primary" :icon="Refresh">刷新</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--  更新客户表单-->
  <el-dialog v-model="updateFormVisible" width="500" @close="cancelCreate" class="p-7">
    <template #header>
      <h1 class="font-extrabold">更新客户</h1>
    </template>
    <el-form :model="updateForm" :rules="addRules" ref="formRef">
      <el-form-item label="邮箱" prop="email" label-width="70px">
        <el-input class="w-96" v-model="updateForm.email" placeholder="请输入邮箱账号"/>
      </el-form-item>
      <!--      <el-form-item v-if="updateForm.detail.emails" label="邮箱" label-width="70px">-->
      <!--        <el-tag  type="info" v-for="(item,index) of updateForm.detail.emails" :key="index">{{item}}</el-tag>-->
      <!--      </el-form-item>-->
      <el-form-item label="网站" prop="website" label-width="70px">
        <el-input class="w-96" v-model="updateForm.website" placeholder="请输入网站地址"/>
      </el-form-item>
      <el-form-item label="标题" prop="title" label-width="70px">
        <el-input type="textarea" class="w-96" v-model="updateForm.title" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="描述" prop="desc" label-width="70px">
        <el-input type="textarea" class="w-96" rows="5" v-model="updateForm.desc" placeholder="请输入描述内容"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelUpdate">取消</el-button>
        <el-button type="primary" @click="confirmUpdate">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  发送邮件表单-->
  <el-dialog v-model="mailFormVisible" @close="cancelSend" class="p-7">
    <template #header>
      <h1 class="font-extrabold">发送邮件</h1>
    </template>
    <el-form :model="mailForm" :rules="mailRules" ref="mailRef">
      <!--      <el-form-item label="邮箱" prop="to">-->
      <!--        <el-input class="w-96" v-model="mailForm.to" placeholder="请输入邮箱账号"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item v-if="mailForm.to" label="邮箱">-->
      <!--          <el-tag class="ml-2 mt-2" v-show="item"  type="info" v-for="(item,index) of mailForm.to" :key="index">{{item}}</el-tag>-->
      <!--      </el-form-item>-->
      <el-form-item label="标题" prop="subject" label-width="70px">
        <el-input class="w-96" v-model="mailForm.subject" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="text" label-width="70px">
        <el-input class="w-96" v-model="mailForm.text" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="回复邮箱" prop="replyTo" label-width="70px">
        <el-input class="w-96" v-model="mailForm.replyTo" placeholder="请输入回复邮箱账号"></el-input>
      </el-form-item>
      <el-form-item label="模版" label-width="70px" v-if="tmpList.length">
        <el-check-tag type="primary" class="ml-2 " @click="selectTmp(item,index)" :checked="temChecked===index"
                      v-for="(item,index) of tmpList" :key="index">{{ item }}
        </el-check-tag>
      </el-form-item>
      <el-form-item label="文本" prop="html" label-width="70px">
        <QuillEditor
            class="w-full"
            style="width: 418px;height: 150px"
            ref="myQuillEditor"
            theme="snow"
            v-model:content="mailForm.html"
            :options="data.editorOption"
            contentType="html"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelSend">取消</el-button>
        <el-button type="primary" @click="confirmSend">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div v-loading="loading" class="h-auto min-h-[80vh] mt-4 px-4 pt-4 bg-white rounded-lg" v-if="total">
    <el-table ref="multipleTableRef"
              :data="tableData"
              tooltip-effect="light"
              border
              @select="select"
              @select-all="selectAll"
              :tooltip-options="tooltipOptions"
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="序号" type="index" width="55" align="center"></el-table-column>
      <el-table-column width="100" label="来源" align="center">
        <template #default="{row}">
          <span v-if="row.type===1">全球搜索</span>
          <span v-if="row.type===3">用户添加</span>
          <span v-if="!row.type">上传文件</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" :show-overflow-tooltip="showTip" align="center" width="200">
        <template #default="{row}">
          <template v-if="row?.detail?.emails?.length">
            <el-tag v-for="(item,index) of row.detail.emails" :key="index">{{ item }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="200" prop="title" align="center" :show-overflow-tooltip="showTip"
                       title="title" tooltip-effect="'light'"></el-table-column>
      <el-table-column label="域名" width="200" prop="website" align="center"
                       :show-overflow-tooltip="showTip"></el-table-column>
      <el-table-column label="描述" width="200" prop="desc" align="center"
                       :show-overflow-tooltip="showTip"></el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template #default="{row}">
          <div>{{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200" align="center">
        <template #default="{row}">
          <div>{{ dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="200" label="操作" align="center">
        <template #default="{row}">
          <el-button link type="primary" @click="update(row)">更新</el-button>
          <el-button link type="danger" @click="remove(row)">删除</el-button>
          <el-button link type="primary" @click="sendMail(row)">发送邮件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center items-center p-4">
      <el-pagination
          v-model:current-page="clientPage.current"
          :page-size="clientPage.pageSize"
          layout="slot, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          :hide-on-single-page="tableData.length<=clientPage.pageSize"
      >
        <template #default>
          <span>共 {{ total }} 条</span>
        </template>
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <el-empty description="无数据"/>
  </div>
</template>
<style scoped>
el-check-tag:hover {

}
</style>