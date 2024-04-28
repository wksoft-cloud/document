import request from "@/utils/request.js";

//谷歌搜索
export const googleSearch = (data)=>{
    return request.post('/google/search', data)
}
export const googleCrawl = (data)=>{
    return request.post('/google/crawl',data)
}