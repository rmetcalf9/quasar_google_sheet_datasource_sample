// Global Store - contains server information, and user information
import Vue from 'vue'
import Vuex from 'vuex'

import googleDocs from './googleDocs.js'

const state = {
  pageTitle: 'Default Page Title',
  dataLoadState: 0, // 0 = CREATED, 1 = LOADING, 2 = LOADED, 3 = ERROR
  loadedGoogleSheet: {
    id: '10mv_ebHQbq2KIhHuH1HY-kNjWuL5OQ6ls-TX865MjIg',
    accessLevel: 'NONE'
  }
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
  },
  dataLoadState: (state, getters) => {
    return state.dataLoadState
  },
  loadedGoogleSheet: (state, getters) => {
    return state.loadedGoogleSheet
  }
}

const actions = {
  LOGIN ({commit}, callbackFN) {
    googleDocs.dispatch('AUTHENTICATE', callbackFN)
  },
  LOADAPPDATA ({commit, state}, callbackFN) {
    googleDocs.dispatch('GetSheetAccessLevel', {sheetID: state.loadedGoogleSheet.id, callbackFN: callbackFN}, function (result, message) {
      if (result === 'Success') {
        console.log('TODO Success')
        console.log(result)
        callbackFN(result, message)
      }
      else {
        callbackFN(result, message)
      }
    })
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
