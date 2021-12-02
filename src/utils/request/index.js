import axios from 'axios'
// import qs from 'qs'
// import router from '@/router'
// import store from '@/store'

const baseURL = "http://portoweb-backend-starter.test";
const service = axios.create({
  baseURL,
})

export default service