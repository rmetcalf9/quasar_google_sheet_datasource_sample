<template>
  <div>
    <p>Page containing raw data for development and debugging purposes</p>
	<h1>User information</h1>
	{{ loggedInUserInfo }}
  </div>
</template>

<script>
import globalStore from './globalStore'
export default {
  data () {
    return {
      loggedInUserInfo: globalStore.getters.loggedInUserInfo
    }
  }
}
</script>

<style>
</style>
