import request from '@/utils/request'
export const recommendMusic=params=> request  ({
  url:'/personalized',
  params
})

//封装获取最新的音乐

export const newMusic=params=>request ({
    url:'/personalized/newsong',
    params
})