// Global Store - contains server information, and user information
import Vue from 'vue'
import Vuex from 'vuex'

import tenantSpecificData from '../tenantSpecific.js'

const state = {
  googleDocsClientID: tenantSpecificData.googleDocsClientID,
  accessToken: ''
}

const mutations = {
  SET_ACCESS_TOKEN (state, token) {
    state.accessToken = token
  }
  /* SET_PAGE_TITLE (state, link) {
    state.pageTitle = 'Example Quasar framework to demo using google doc as datasource - ' + link
  },
  */
}

const getters = {
  isLoggedIn: (state, getters) => {
    return state.accessToken !== ''
  }
}

const actions = {
  AUTHENTICATE ({commit, state}, callbackFN) {
    var boardSCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    window.gapi.auth.authorize(
      {
        'client_id': state.googleDocsClientID,
        'scope': boardSCOPES.join(' '),
        'immediate': true
      },
      function (authResult) {
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          commit('SET_ACCESS_TOKEN', authResult.accessToken)
          callbackFN('Success', 'Logged in')
        }
        else {
          // tried with immediate ture but failed - try again with immediate set to false
          window.gapi.auth.authorize(
            {
              'client_id': state.googleDocsClientID,
              'scope': boardSCOPES.join(' '),
              'immediate': false
            },
            function (authResult) {
              if (authResult && !authResult.error) {
                // Hide auth UI, then load client library.
                commit('SET_ACCESS_TOKEN', authResult.accessToken)
                callbackFN('Success', 'Logged in')
              }
              else {
                // tried with immediate set to both true and false and failed both times
                commit('SET_ACCESS_TOKEN', '')
                callbackFN('Error', 'Not authorized')
              };
            }
          )
        };
      }
    )
  },
  DEAUTHENTICATE ({commit, state}) {
    commit('SET_ACCESS_TOKEN', '')
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
