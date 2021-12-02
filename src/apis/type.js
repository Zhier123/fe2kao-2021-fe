
import request from './request.js'
//段落
/**
 * 
 * @param {'easy'|'hard'} type 
 * @param {number} page
 * @param {number} limit 
 *  */
export function getList(type,page){
  return request({
    url:'/api/passage',
    method:'get',
    params:{
      type,
      page,
      limit:6
    }
  })
}
//获取内容
export function getContent(id){
  return request({
    url:'/api/passage/content',
    method:'get',
    params:{
      id
    }
  })
}
//用户模块
/**
 * @param {string} name
 * @param {string} password
 * @param {number} id
 */

export function login(name,password){
  return request({
    url:'/api/user',
    method:'post',
    data:{
      name,
      password
    }
  })
}
export function logout(){
  return request({
    url:'/api/user',
    method:'delete'
  })
}
export function registry(name,password){
  return request({
    url:'/api/user/registry',
    method:'post',
    data:{
      name,
      password,
    }
  })
}
export function modUser(id,name,password){
  return request({
    url:'/api/user',
    method:'put',
    data:{
      id,
      name,
      password
    }
  })
}

//历史记录模块
/**
 * @param {number} passageId
 * @param {number} userId 
 * @param {number} wpm
 * @param {number} userId
 */
//上传本次打谱记录
export function addrecord(passageId,userId,wpm){
  return request({
    url:'/api/record',
    method:'put',
    data:{
      passageId,
      userId,
      wpm
    }
  })
}
export function getrecord(userId,page){
  return request({
      url:'/api/record',
      method:'get',
      params:{
        userId,
        page,
        limit:1900
      }
  })
}
//无耻的修改记录 
export function delrecord(recordId){
  return request({
    url:`/api/record/${recordId}`,
    method:'delete',
  })
}