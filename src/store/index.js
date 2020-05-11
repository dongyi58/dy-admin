import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      collapse:false
    },
    mutations

  })
  export default store