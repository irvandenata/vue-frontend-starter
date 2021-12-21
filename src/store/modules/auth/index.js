
import { loginApi,logoutApi } from '@/api/login'


export default {
  state: {
    user: {
      id: '',
      email: '',
    },
    token: {
      
    },
    headers:{

    }
  },
  getters: {
    tokenVal: state => {
      return state.token.token
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
     SET_HEADERS: (state, value) => {
      state.headers = value;
    },
    CLEAR_TOKEN: state => {
      state.token="";
    }
  },
  actions: {

    async login({ commit }, params) {

      const r = await loginApi(params)
      if (r.data.access_token != '' ||r.data.access_token != undefined ) {
        commit('SET_TOKEN', r.data.access_token)
        const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + r.data.access_token,
        }
        commit('SET_HEADERS', headers)   
        return r
      }
      else return 401
      
    },
  
    async logout({ commit ,state}) {
     const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      };
        await logoutApi(headers).catch(() => {
          commit('CLEAR_TOKEN')
        })
        commit('CLEAR_TOKEN')
      return state.token
    },

  }
}