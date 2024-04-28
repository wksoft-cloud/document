// 定义用户相关仓库
import {defineStore} from "pinia";
import {UserLogin, UserRegister} from "@/api/login.js";
import {GET_TOKEN, SET_TOKEN} from "@/utils/userToken.js";


const useUserStore = defineStore('login', {
    state: () => {
        return {
            userInfo:JSON.parse(GET_TOKEN()) || {}
        }
    },
    actions: {
        async userLogin(data) {
            let res = await UserLogin(data)
            if (res.status === 200){
                this.userInfo = res
                //     本地化持久存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo))
                return "ok"
            }else{
                return Promise.reject(new Error(res.message))
            }
        },
        async userRegister(data){
            let res = await UserRegister(data)
            console.log(res,"登录接口")
            if (res.status === 200){
                this.userInfo = res
                //     本地化持久存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo))
                return "ok"
            }else{
                return Promise.reject(new Error(res.message))
            }
        }
    },
    getters: {}
})
export default useUserStore