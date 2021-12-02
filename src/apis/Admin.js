//Admin.js
//管理员操作
import request from './request.js'
//接受申请
export function accept(userId){
  return request({
    url:`/admin/accept/${userId}`,
    method:'post'
  })
}
//拒绝申请
export function deny(userId){
  return request({
    url:`/admin/deny/${userId}`,
    method:'delete',
  })
}
//邀请成员进入团队//该函数与项目拥有者的invite重名
export function invite(userId){
  return request({
    url:`/admin/member/${userId}`,
    method:'put',
  })
}
export function kick(userId){
  return request({
    url:`/admin/member/${userId}`,
    method:'delete',
  })
}