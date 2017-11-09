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

function loadGoogleSheetsAPIIntoWebPage (commit, accessToken, callbackFN) {
  window.gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(function () {
    commit('SET_ACCESS_TOKEN', accessToken)
    callbackFN('Success', 'Logged in')
  })
}

// Generate a name for the temporary sheet
//  check the passed sheets variable to ensure it isn't already used
function generateNameForTemporarySheet (sheets) {
  var coun = 16
  var retVal = 'TempSheetNameSSS' + coun.toString()
  while (sheets.filter(function (val) {
    return retVal === val.properties.title
  }).length !== 0) {
    coun++
    retVal = 'TempSheetNameSSS' + coun.toString()
  }
  return retVal
}

// Gets the users info and saves access token
function getUserInfo (commit, state, accessToken, callbackFN) {
  window.gapi.client.request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json').then(function (response) {
    if ((response.status < 200) || (response.status > 299)) {
      console.log(response)
      callbackFN('Error', 'Couldn\'t retrieve user info')
    }
    else {
      commit('SET_USER_INFO', response.result)
      loadGoogleSheetsAPIIntoWebPage(commit, accessToken, callbackFN)
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
  /*
  GetSheetAccessLevel works out what access level we have in the google sheet and will call the callbackFN with
  'NONE', 'READONLY', 'READWRITE'
  If does this by
   1. Try and read the sheet - if it can't set access level to with 'NONE'
   2. Try and create a new sheet with the name 'GetSheetAccessLevelTestSheet' - if this fails respond with 'READONLY'
   3. Delete the sheet named 'GetSheetAccessLevelTestSheet' and respond with 'READWRITE'
  */
  GetSheetAccessLevel ({commit, state}, {sheetID, callbackFN}) {
    window.gapi.client.sheets.spreadsheets.get({
      spreadsheetId: sheetID,
      includeGridData: false,
      ranges: 'A1',
      fields: 'sheets'
    }).then(function (response) {
      if (response.status !== 200) {
        callbackFN('Success', {level: 'NONE'})
        return
      }
      // We have determined we can read the sheet, now find if we can write to it
      // Start by creating a unique name for the sheet to test with
      var tmpSheetName = generateNameForTemporarySheet(response.result.sheets)
      var googleAPIBatchRequestToCreateWorkSheet = [
        {
          'addSheet': {
            'properties': {
              'title': tmpSheetName,
              'gridProperties': {
                'rowCount': 20,
                'columnCount': 12
              },
              'tabColor': {
                'red': 1.0,
                'green': 0.3,
                'blue': 0.4
              }
            }
          }
        }
      ]
      window.gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetID,
        resource: googleAPIBatchRequestToCreateWorkSheet
      }).then(function (response) {
        if (response.status !== 200) {
          callbackFN('Error', response.status)
          return
        }
        // TODO Create sheet
        console.log(tmpSheetName)
        callbackFN('Error', 'GetSheetAccessLevel - Not implemented delete what we created (' + tmpSheetName + ')')
      }, function (exception) {
        console.log('GetSheetAccessLevel - Trying to create sheet')
        console.log(exception)
        callbackFN('Error', 'Unknown API exception ' + exception.result.error.message)
      })
    }, function (exception) {
      console.log('GetSheetAccessLevel - No access exception encountered')
      console.log(exception)
      callbackFN('Success', {level: 'NONE'})
    })
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
