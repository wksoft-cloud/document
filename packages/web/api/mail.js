import request from "@/utils/request.js";
import {ref} from "vue";

//发送邮件
export const mailSend = (data)=>{
    return request.post('/mail/send',data)
}
//邮件列表
export const mailList = (data)=>{
    return request.post('/mail/list',data)
}
// 邮件模版列表
export const mailTmplist = (data)=>{
    return request.post('/client/list/mail/tmp',data)
}
// 新增邮件模版
export const mailTmp = (data)=>{
    return request.post('/client/create/mail/tmp',data)
}
export const createTmpVisible = ref(false)
