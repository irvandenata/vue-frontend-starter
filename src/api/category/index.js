import service from '@/utils/request'


export function fetchCategories(params) {
  return service({
    url: '/categories',
    method: 'get',
    headers: params
  })}

  export function createCategory(params) {
   // console.log(params)
  return service({
    url: '/category',
    method: 'post',
    headers: params.headers,
    data:params.form
  })}

 export function getCategory(params) {
  return service({
    url: '/category/'+params.slug,
    method: 'get',
    headers: params.headers,
  })}

   export function updateCategory(params,headers) {
   const slug = params.slug;
   delete params.slug;
  return service({
    url: '/category/'+slug,
    method: 'put',
    headers: headers,
    data:params
  })}

   export function destroyCategory(params,headers) {
   const slug = params.data.slug;
  return service({
    url: '/category/'+slug,
    method: 'delete',
    headers: headers,
  })}




