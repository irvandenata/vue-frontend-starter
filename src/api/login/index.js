import service from '@/utils/request'


export function loginApi(params) {
  return service({
    url: '/login',
    method: 'post',
    data: params
  })}

export function logoutApi(params) {
  return service({
    url: '/logout',
    method: 'get',
    headers: params
  })
 }
 
  
