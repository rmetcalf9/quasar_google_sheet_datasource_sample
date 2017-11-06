<template>
  <q-layout
    ref="layout"
    :view="layoutStore.view"
    :left-breakpoint="layoutStore.leftBreakpoint"
    :reveal="layoutStore.reveal"
  >
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-btn v-if="backroute !== ''" class="within-iframe-hide" flat @click="$router.replace(backroute)" style="margin-right: 15px">
        <q-icon name="keyboard_arrow_left" />
      </q-btn>
      <q-toolbar-title>
        {{ pageTitle }}
        <span slot="subtitle">Empowering your app</span>
      </q-toolbar-title>
      <q-btn flat @click="refresh">
        Refresh
      </q-btn>

    </q-toolbar>

    <q-scroll-area slot="left" style="width: 100%; height: 100%">
      <q-list-header>Navigation</q-list-header>

      <q-side-link item to="/home">
        <q-item-side icon="home" />
        <q-item-main label="Home" />
      </q-side-link>
      <q-side-link item to="/sprints">
        <q-item-side icon="directions_run" />
        <q-item-main label="Sprints" />
      </q-side-link>
      <q-side-link item to="/progress">
        <q-item-side icon="pie_chart" />
        <q-item-main label="Progress" />
      </q-side-link>
      <q-side-link item to="/issues">
        <q-item-side icon="list" />
        <q-item-main label="Issues" />
      </q-side-link>
      <hr>
      <q-side-link item to="/test">
        <q-item-side icon="group_work" />
        <q-item-main label="TEST2" />
      </q-side-link>
      <hr>
      <q-side-link item to="/changeproject">
        <q-item-side icon="find_replace" />
        <q-item-main label="Change Project" />
      </q-side-link>
      <q-side-link item to="/logout">
        <q-item-side icon="exit_to_app" />
        <q-item-main label="Logout" />
      </q-side-link>

    </q-scroll-area>

    <router-view />

    <q-toolbar slot="footer">
      <!--<q-toolbar-title>
        Footer
      </q-toolbar-title>-->
    </q-toolbar>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QTabs,
  QRouteTab,
  QBtn,
  QIcon,
  QItemSide,
  QItemMain,
  QSideLink,
  QListHeader,
  QScrollArea
  // Loading,
  // Toast
} from 'quasar'
import globalStore from './globalStore'
export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  },
  data () {
    return {
      layoutStore: {
      }
    }
  },
  computed: {
    server_info_load_error_data () {
      return globalStore.state.server_info_load_error_data
    },
    backroute () {
      // console.log(this.$route.path)
      if (this.$route.path === '/') return ''
      var x = this.$route.path.split('/')
      var o = ''
      for (var y in x) {
        if (y < (x.length - 1)) o += '/' + x[y]
      }
      var newPath = o.substring(1)
      return newPath
    },
    pageTitle () {
      return globalStore.state.pageTitle
    }
  },
  created () {
    console.log('TODO')
    /* Loading.show()
    var callback = {
      OKcallback: {
        method: function (retData, passback) {
          Loading.hide()
        },
        params: {}
      },
      FAILcallback: {
        method: function (retData, passback) {
          Loading.hide()
          Toast.create('Failed to log in "' + retData.msg + '"')
        },
        params: {}
      }
    }
    mainJIRADataStore.dispatch('loadJIRAdata', {callback: callback})
    */
  },
  methods: {
    refresh () {
      console.log('TODO')
      /*
      Loading.show()
      var callback = {
        OKcallback: {
          method: function (retData, passback) {
            Loading.hide()
          },
          params: {}
        },
        FAILcallback: {
          method: function (retData, passback) {
            Loading.hide()
            Toast.create('Failed to get data "' + retData.msg + '"')
          },
          params: {}
        }
      }
      mainJIRADataStore.dispatch('loadJIRAdata', {callback: callback})
      */
    }
  }
}
</script>
