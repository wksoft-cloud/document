import request from "../utils/request.js";
import {ref} from "vue";
//用户登录接口
export const UserLogin = (data)=>{
    return request.post("/auth/login",data)
}
//用户注册接口
export const UserRegister = (data)=>{
    return request.post('/auth/register',data)
}

export const isLogin = ref(true)
export const iscollapse = ref(false)