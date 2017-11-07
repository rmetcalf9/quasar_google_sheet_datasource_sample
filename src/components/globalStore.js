// Global Store - contains server information, and user information
import Vue from 'vue'
import Vuex from 'vuex'

import googleDocs from './googleDocs.js'

const state = {
  pageTitle: 'Default Page Title'
}

const mutations = {
  SET_PAGE_TITLE (state, link) {
    state.pageTitle = 'Example Quasar framework to demo using google doc as datasource - ' + link
  },
  LOGOUT (state) {
    googleDocs.dispatch('DEAUTHENTICATE')
  }
}

const getters = {
  isLoggedIn: (state, getters) => {
    return googleDocs.getters.isLoggedIn
  },
  loggedInUserInfo: (state, getters) => {
    return googleDocs.getters.userInfo
  }
}

const actions = {
  LOGIN ({commit}, callback) {
    googleDocs.dispatch('AUTHENTICATE', callback)
  }
}

Vue.use(Vuex)

// Vuex version
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
