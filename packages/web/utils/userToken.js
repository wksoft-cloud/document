// 本地存储操作用户信息方法
export const SET_TOKEN = (userInfo)=>{
    localStorage.setItem('USERINFO',userInfo)
}
export const GET_TOKEN = ()=>{
    return  localStorage.getItem('USERINFO')
}

//清除本地存储

export const REMOVE_TOKEN = ()=>{
    localStorage.removeItem('USERINFO')
}
