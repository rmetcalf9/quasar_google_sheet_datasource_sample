<template>
  <div>Main page to show that this app can read data from a google sheet (sheet ID is hardcoded)<br>
    <h2>Values</h2>
    <table style="margin-top: 30px;" class="q-table bordered striped-odd">
      <thead>
        <tr>
          <th class="text-left">Field</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-th="Field" class="text-left">dataLoadState</td>
          <td data-th="Value" class="text-left">{{ dataLoadState }}</td>
        </tr>
        <tr>
          <td data-th="Field" class="text-left">Loaded sheet access level</td>
          <td data-th="Value" class="text-left">{{ loadedGoogleSheet.accessLevel }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import globalStore from './globalStore'
export default {
  data () {
    return {
      // dataLoadState: globalStore.getters.dataLoadState
    }
  },
  computed: {
    dataLoadState () {
      return globalStore.getters.dataLoadState
    },
    loadedGoogleSheet () {
      return globalStore.getters.loadedGoogleSheet
    }
  }
}
</script>

<style>
</style>
