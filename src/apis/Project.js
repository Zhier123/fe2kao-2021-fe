import request from './request.js'
//创建一个项目
export function createProj(data){
  return request({
    url:'/project',
    method:'post',
    data:data
  })
}
//获取所有项目
//管理员不受项目可见性约束
export function getProj(data){
  return request({
    url:'/project/search',
    method:'post',
    data:data
  })
}
//获取项目详情
//管理员不受项目可见性约束
export function projInfo(projectId){
  return request({
    url:`/project/${projectId}`,
    method:'get'
  })
}
//申请加入项目
export function joinProj(projectId){
  return request({
    url:'/project/join',
    method:'get',
    params:{
      projectId:projectId,
      identity:'participant'
    }
  })
}
//申请退出项目
export function quitProj(projectId,quitReason){
  return request({
    url:'/project/quit',
    method:'get',
    params:{
      projectId:projectId,
      reason:quitReason//退出理由
    }
  })
}
export function childProInfo(subprojectId){
  return request({
    url:`/subproject/${subprojectId}`,
    method:'get'
  })
}

  
