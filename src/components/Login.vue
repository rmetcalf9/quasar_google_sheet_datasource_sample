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
					<q-btn color="primary" @click="login" small>{{ loginButtonMessage }}</q-btn>
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
  QItemMain,
  Toast,
  Loading
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
      password: '',
      loginButtonMessage: 'Login with google'
    }
  },
  computed: {
    pageTitle () {
      return globalStore.state.pageTitle
    }
  },
  methods: {
    login () {
      var tt = this
      tt.loginButtonMessage = 'Login with google in progress...'
      globalStore.dispatch('LOGIN', function (result, message) {
        if (result === 'Error') {
          tt.loginButtonMessage = 'Login with google'
          Toast.create('Login failed: ' + message)
        }
        else if (result === 'Success') {
          tt.loginButtonMessage = 'Login with google'
          tt.$router.replace(tt.$route.query.redirect || '/')
        }
        else {
          Loading.hide()
          Toast.create('Error: ' + message)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
