//Log.js 1.用户登录 2.Cas获取登录信息 3.下线
//引入在request.js中写好 的axios实例
import request from './request.js'

//用户点击登录 前台跳转+获得重定向地址
export function login(){
  return request({
    url:'/api/login',
    method:'get',
    //无参数
  })
}
//把guid 和 secret交给后端
export function runCallback(guid,secret){
  return request({
    url:'/api/login',
    method:'post',
    data:{
      guid:guid,//URL中获取
      secret:secret//URL中获取
    }
  })}
//退出登录
export function logout(){
  return request({
    url:'/api/login',
    method:'delete',
    //无参数
  })
}
