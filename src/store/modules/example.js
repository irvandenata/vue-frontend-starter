const state = {
 products :{}
}

const getters = {
 products: state => state.products
}

const actions = {}

const mutations = {
 SET_STORE(state,products){
  state.products = products;
 }
}

export default {
 state,
 getters,
 actions,
 mutations,

}