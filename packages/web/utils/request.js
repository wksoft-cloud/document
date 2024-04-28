import axios from "axios"
import useUserStore from "@/store/modules/login.js";
import {loading} from "@/utils/loading.js";
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: 'https://foreign-trade-api.snailshellsoft.com', //请求基础地址的设置
    // timeout: 5000,  //超时时间的设置，超出五秒请求就是失败，
})
// 请求拦截器
request.interceptors.request.use((config) => {
    let token = useUserStore().userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    loading.value = true;
    return config
}, error => {
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use((response) => {
        loading.value = false;
        return response.data;
    }, (error) => {
        let status = error.response
        switch (status) {
            case 404:
                ElMessage({
                    type: 'error',
                    message: '请求路径发生错误'
                })
                break;
            case 500:
                ElMessage({
                    type: 'error',
                    message: '服务器发生错误'
                })
        }
        loading.value = false;
        return Promise.reject(new Error(error.message))
    }
)
export default request