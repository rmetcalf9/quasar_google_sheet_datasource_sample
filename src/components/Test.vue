<template>
  <div>
    <p>Page containing raw data for development and debugging purposes</p>
	<h1>User information</h1>
	{{ loggedInUserInfo }}
	<h1>Loaded google Sheet</h1>
	{{ loadedGoogleSheet }}
  </div>
</template>

<script>
import globalStore from './globalStore'
export default {
  data () {
    return {
      loggedInUserInfo: globalStore.getters.loggedInUserInfo,
      loadedGoogleSheet: globalStore.getters.loadedGoogleSheet
    }
  }
}
</script>

<style>
</style>
