import request from "@/utils/request.js";
import {reactive, ref} from "vue";


// 获取客户列表
export const getClientList = (data)=>{
    return request.post('/client/list',data)
}

// 新增客户
export const addClient = (data)=>{
    return request.post('/client/create',data)
}

// 删除客户
export const removeClient = (data)=>{
    return request.post('/client/remove',data)
}
//更新客户
export const updateClient = (data)=>{
    return request.post('/client/update',data)
}
export const data = reactive({
    content: '',
    editorOption: {
        modules: {
            toolbar: [
                [{ header: 1 }, { header: 2 }], // 1、2 级标题
                [{ direction: 'rtl' }], // 文本方向
                [{ size: [ 'small', false, 'large', 'huge' ]}], // 字体大小
                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                [{ align: [] }], // 对齐方式
                ['clean'], // 清除文本格式
            ]
        },
        placeholder: '请输入内容...'
    }
})
export const clientFormVisible = ref(false)