import request from "@/utils/request.js";

export const exportClient = ()=>{
    return request.post('/excel/export/client')
}
export const uploadClient = ()=>{
    return request.post('/excel/upload/client')
}