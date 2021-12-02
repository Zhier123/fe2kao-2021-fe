//UserInfo.js 
import request from './request.js'
//获取用户信息
export function getUserInfo(){
  return request({
    url:'/api/user',
    method: 'get'
    //无参数
  })
}
//获取其他用户信息 只有成员可用
export function getOtherUser(userId){//通过userId精确搜索。
  return request({
    url:`/api/user/${userId}`,
    method:'get',
  })
}
//member only 通过关键词或者姓名搜索用户
/**
 * 
 * @param {object} data 
 * @param {string} keyword
 * @param {boolean} superAdimin
 * @param {boolean} admin
 * @param {boolean} member
 * @param {number} page
 * @param {number} limit//看二考翻页
 */
export function searchUser(data){
  return request({
    params:data,
    url:'/api/user/search',
    method:'get'
  })
}
//修改用户信息
export function changeInfo(data){
  return request({
    url:'/api/user',
    method:'put',
    data:data
  })
}
//申请加入团队
//提交的这个申请也是一个会发送一个系统通知给所有管理员, 让其批准. 该通知对自己不可见
export function application(data){
  return request({
    url:'/api/user',
    method:'put',
    data:data
  })
}
//增加联系方式
export function addContact(data){
  return request({
    url:'/api/user/contact',
    method:'post',
    data:data
  })
}
export function modContact(data){
  return request({
    url:'/api/user/contact',
    method:'put',
    data:data
  })
}
export function delContact(name){
  return request({
    url:'/api/user/contact',
    method:'delete',
    data:{
      name:name
    }
  })
}
