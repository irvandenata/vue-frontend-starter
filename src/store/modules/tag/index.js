
import {fetchTags,createTag,getTag,updateTag,destroyTag} from '@/api/tag'


export default {

  state: {
    tags:{

    }
  },
  getters: {
    tagVal: state => {
      return state.token.token
    }
  },
  mutations: {
    SET_TAG: (state,value) => {
      state.categories = value
    },
  },
  actions: {

  
  async create(contex,payload) {

      const params = {
       form : payload,
       headers: contex.rootState.auth.headers
      }
     
      const r = await createTag(params)
      return r
    },

     async update(contex,payload) {
      const headers = contex.rootState.auth.headers
      const r = await updateTag(payload, headers)
      return r
    },

     async destroy(contex,payload) {  
      const headers = contex.rootState.auth.headers
      const r = await destroyTag(payload, headers)
      return r
    },

  
    async fetch({ commit },headers) {
       const response = await fetchTags(headers).then((r)=>{
          commit('SET_TAG',r.data.data)
          return r.data 
       });
       return response;
      
    },

     async get(contex,payload) {
       const params = {
        headers:  contex.rootState.auth.headers,
         slug:payload
       }
      const r = await getTag(params)
      return r
    },

  }
}