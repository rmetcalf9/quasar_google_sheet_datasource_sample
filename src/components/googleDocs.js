// Global Store - contains server information, and user information
import Vue from 'vue'
import Vuex from 'vuex'

import tenantSpecificData from '../tenantSpecific.js'

const state = {
  googleDocsClientID: tenantSpecificData.googleDocsClientID,
  googleDocsScopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/userinfo.profile'
  ],
  accessToken: '',
  userInfo: {}
}

const mutations = {
  SET_ACCESS_TOKEN (state, token) {
    state.accessToken = token
  },
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  }
}

// Called when a user logs out - must clear all data
function clearState (commit) {
  commit('SET_ACCESS_TOKEN', '')
  commit('SET_USER_INFO', {})
}

const getters = {
  isLoggedIn: (state, getters) => {
    return state.accessToken !== ''
  },
  userInfo: (state, getters) => {
    return state.userInfo
  }
}

// Gets the users info and saves access token
function getUserInfo (commit, state, accessToken, callbackFN) {
  window.gapi.client.request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json').then(function (response) {
    if ((response.status < 200) || (response.status > 299)) {
      console.log(response)
      callbackFN('Error', 'Couldn\'t retrieve user info')
    }
    else {
      commit('SET_ACCESS_TOKEN', accessToken)
      commit('SET_USER_INFO', response.result)
      callbackFN('Success', 'Logged in')
    }
  })
  // https://www.googleapis.com/oauth2/v1/userinfo?alt=json
}

const actions = {
  AUTHENTICATE ({commit, state}, callbackFN) {
    clearState(commit)
    try {
      window.gapi.auth.authorize(
        {
          'client_id': state.googleDocsClientID,
          'scope': state.googleDocsScopes.join(' '),
          'immediate': true
        },
        function (authResult) {
          // console.log(authResult)
          if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            getUserInfo(commit, state, authResult.accessToken, callbackFN)
          }
          else {
            // tried with immediate ture but failed - try again with immediate set to false
            window.gapi.auth.authorize(
              {
                'client_id': state.googleDocsClientID,
                'scope': state.googleDocsScopes.join(' '),
                'immediate': false
              },
              function (authResult) {
                if (authResult && !authResult.error) {
                  // Hide auth UI, then load client library.
                  getUserInfo(commit, state, authResult.accessToken, callbackFN)
                }
                else {
                  // tried with immediate set to both true and false and failed both times
                  // clearState(commit) not required here - called at begining of process
                  callbackFN('Error', 'Not authorized')
                };
              }
            )
          }
        } // function
      )
    }
    catch (err) {
      console.log(err)
      callbackFN('Error', 'Exception')
    }
  },
  DEAUTHENTICATE ({commit, state}) {
    clearState(commit)
  },
  GetSheetAccessLevel ({commit, state}, {sheetID, callbackFN}) {
    callbackFN('Error', 'GetSheetAccessLevel - Not implemented')
  },
  GetDataRangesFromSheet ({commit, state}, {sheetID, callbackFN, ranges}) {
    callbackFN('Error', 'GetDataRangesFromSheet - Not implemented')
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
