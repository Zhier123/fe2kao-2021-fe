import request from './request.js'
//获取未读消息条数
export function unread(){
  return request({
    url:'/api/notification/unread',
    method:'get',
    //没参数
  })
}
//获取所有通知
export function getnotice(data){
  return request({
    url:'/api/notification',
    method:'post',
    data:data
  })
}
//发送信息
export function send(data){
  return request({
    url:'/api/notification/send',
    method:'post',
    data:data
  })
}
//标记为已读或未读
export function setread(Id,readornot){
  return request({
    url:'/api/notification/read',
    method:'post',
    data:{
      notificationId:Id,
      read:readornot
    }
  })
}
//撤回消息只能由发送者发起.这个需要前端判断
export function withdraw(id){
  return request({
    url:`/api/notification/${id}`,
    method:'delete',    
  })
}