<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-toolbar-title>
        {{ pageTitle }}
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

		<div class="layout-padding  docs-btn row justify-center">
			<div class="text-center" style="width: 500px; max-width: 90vw;">
				<br>
				<form onClick="return false;">
					<q-btn color="primary" @click="login" small>Login with Google</q-btn>
				</form>
			</div>
		</div>
	</q-layout>
</template>

<script>
import {
  QField,
  QToggle,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QInput,
  QOptionGroup,
  QSelect,
  QListHeader,
  QItem,
  QItemSide,
  QChipsInput,
  QRating,
  QItemMain
  // Toast,
  // Loading
} from 'quasar'
import globalStore from './globalStore'
export default {
  components: {
    QField,
    QToggle,
    QOptionGroup,
    QSelect,
    QChipsInput,
    QRating,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QInput
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    pageTitle () {
      return globalStore.state.pageTitle
    }
  },
  methods: {
    login () {
      console.log('TODO')
      /*
      Loading.show()
      var callback = {
        OKcallback: {
          method: function (retData, passback) {
            Loading.hide()
            // Toast.create('Success log in not defined')
            passback.$router.replace(passback.$route.query.redirect || '/')
          },
          params: this
        },
        FAILcallback: {
          method: function (retData, passback) {
            Loading.hide()
            Toast.create('Failed to log in "' + retData.msg + '"')
            console.log(retData)
          },
          params: {}
        }
      }
      var params = {
        username: this.username,
        password: this.password,
        callback: callback
      }
      globalStore.dispatch('loginuser', params)
      */
    }
  }
}
</script>

<style lang="stylus">
</style>
