import service from '@/utils/request'


export function fetchContents(params) {
 
  return service({
    url: '/contents',
    method: 'get',
    headers: params
  })}

  export function createContent(params) {
  return service({
    url: '/content',
    method: 'post',
    headers: params.headers,
    data:params.form
  })}

 export function getContent(params) {
  return service({
    url: '/contents/'+params.slug,
    method: 'get',
    headers: params.headers,
  })}

   export function updateContent(params,headers) {
   const slug = params.slug;
   
   delete params.id;
   delete params.slug;
  return service({
    url: '/content/'+slug,
    method: 'put',
    headers: headers,
    data:params
  })}



   export function destroyContent(params,headers) {
   const slug = params.data.slug;
  return service({
    url: '/content/'+slug,
    method: 'delete',
    headers: headers,
  })}




