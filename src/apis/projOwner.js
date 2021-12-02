//项目拥有者
import request from './request.js'
//删除项目
//管理员也可访问
export function delProj(){
  return request({
    url:`/project/owner/${projectId}`,
    method:'delete'
  })
}
//修改项目
export function modProj(data){
  return request({
    url:'/project/owner',
    method:'put',
    data:data
  })

}
/*修改项目成员
    -申请加入项目
    -申请退出项目
    -请求成员加入
    -请出成员
 */
//请求成员加入
export function invite(projectId,userId){//请注意 该函数与Admin的invite函数重名
  return request({
    url:'/project/owner/invite',
    method:'post',
    data:{
      projectId:projectId,
      userId:userId
    }
  })
}
//清出成员  同名
export function kick(projectId,userId){
  return request({
    url:'/project/owner/kick',
    method:'delete',
    params:{
      projectId:projectId,
      userId:userId
    }
  })
}   
//创建子项目
export function createSub(data){
  return request({
    url:'/projects/owner/subprojects',
    method:'post',
    data:data
  })
}
//删除子项目 
export function delSub(){
  return request({
    url:`/projects/owner/subprojects/${subprojectId}`,
    method:'delete'
  })
}
//修改子项目
export function modSub(data){
  return request({
    url:'/projects/owner/subprojects',
    method:'put',
    data:data
  })
}
//创建依赖
export function createDep(subprojectId,dependency){
  return request({
    url:'/projects/owner/dependency',
    method:'post',
    data:{
      subprojectId:subprojectId,
      dependency:dependency
    }
  })
}
//删除依赖 
export function delDep(subprojectId,dependency){
  return request({
    url:'/projects/owner/dependency',
    method:'delete',
    params:{
      subprojectId:subprojectId,
      dependency:dependency
    }  
  })
}