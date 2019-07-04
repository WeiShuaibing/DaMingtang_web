import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    role: 'user'
  },
  mutations: {
    showPeople (state, msg) {
      state.name = msg
    },
    changeRole (state, roles) {
      state.role = roles
    }
  }
})

export default store
