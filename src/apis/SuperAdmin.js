import request from './request.js'
//super Admin 超级管理员
//设置管理员
export function setAdmin(userId){
  return request({
    url:`/super/admin/${userId}`,
    method:'put',
  })
}
//设置为非管理员
export function setNormal(userId){
  return request({
    url:`/super/admin/${userId}`,
    method:'delete'
  })
}
 