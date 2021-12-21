
import {fetchContents,createContent,getContent,updateContent,destroyContent,} from '@/api/content'


export default {

  state: {
    contents:{

    }
  },
  getters: {
    tagVal: state => {
      return state.token.token
    }
  },
  mutations: {
    SET_CONTENT: (state,value) => {
      state.categories = value
    },
  },
  actions: {

  
  async create(contex,payload) {
      const params = {
       form : payload,
       headers: contex.rootState.auth.headers
      }
     
      const r = await createContent(params)
      return r
    },

     async update(contex,payload) {
      const headers = contex.rootState.auth.headers
      const r = await updateContent(payload, headers)
      return r
    },

  

     async destroy(contex,payload) {  
      const headers = contex.rootState.auth.headers
      const r = await destroyContent(payload, headers)
      return r
    },

  
    async fetch({ commit },headers) {
     
       const response = await fetchContents(headers).then((r)=>{
        
          commit('SET_CONTENT',r.data.data)
          return r.data 
       });
       return response;
      
    },

     async get(contex,payload) {
       const params = {
        headers:  contex.rootState.auth.headers,
         slug:payload
       }
      const r = await getContent(params)
      return r
    },

  }
}