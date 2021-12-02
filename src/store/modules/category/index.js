
import {fetchCategories,createCategory,getCategory,updateCategory,destroyCategory} from '@/api/category'


export default {

  state: {
    categories:{

    }
  },
  getters: {
    categoryVal: state => {
      return state.token.token
    }
  },
  mutations: {
    SET_CATEGORY: (state,value) => {
      state.categories = value
    },
  },
  actions: {

  
  async create(contex,payload) {

      const params = {
       form : payload,
       headers: contex.rootState.auth.headers
      }
     
      const r = await createCategory(params)
      return r
    },

     async update(contex,payload) {
      const headers = contex.rootState.auth.headers
      const r = await updateCategory(payload, headers)
      return r
    },

     async destroy(contex,payload) {  
      const headers = contex.rootState.auth.headers
      const r = await destroyCategory(payload, headers)
      return r
    },

  
    async fetch({ commit },headers) {
       const response = await fetchCategories(headers).then((r)=>{
          commit('SET_CATEGORY',r.data.data)
          return r.data 
       });
       return response;
      
    },

     async get(contex,payload) {
       const params = {
        headers:  contex.rootState.auth.headers,
         slug:payload
       }
      const r = await getCategory(params)
      return r
    },

  }
}