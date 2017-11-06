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
    console.log('TODO LOGOUT')
  }
}

const getters = {
  is_logged_in: (state, getters) => {
    return false
  },
  tmp_data: (state, getters) => {
    return googleDocs.getters.project
  }
}

const actions = {
  loginuser ({commit}, params) {
    console.log('TODO Login user')
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
