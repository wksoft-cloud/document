import request from "@/utils/request.js";

//更新用户

export const updateUser = (data)=>{
    return request.post('/user/update',data)
}