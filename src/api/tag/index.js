import service from '@/utils/request'


export function fetchTags(params) {
  return service({
    url: '/tags',
    method: 'get',
    headers: params
  })}

  export function createTag(params) {
   // console.log(params)
  return service({
    url: '/tag',
    method: 'post',
    headers: params.headers,
    data:params.form
  })}

 export function getTag(params) {
  return service({
    url: '/tag/'+params.slug,
    method: 'get',
    headers: params.headers,
  })}

   export function updateTag(params,headers) {
   const slug = params.slug;
   delete params.slug;
  return service({
    url: '/tag/'+slug,
    method: 'put',
    headers: headers,
    data:params
  })}

   export function destroyTag(params,headers) {
   const slug = params.data.slug;
  return service({
    url: '/tag/'+slug,
    method: 'delete',
    headers: headers,
  })}




