<template>
  <div class="col-12">
    <div class="row justify-content-center">
      <div class="col-12 mb-3 px-0">
        enter url
        <input v-model="state.search.url" class="w-100" type="text">
      </div>
      <button class="btn btn-outline-light col-12" @click="getScrape">
        Steal Style Sheets
      </button>
      <button class="btn btn-outline-light col-12" @click="geScrape">
        Steal Site Style
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { queService } from '../services/QueService'
export default {
  name: 'StyleThief',
  setup() {
    const state = reactive({
      options: { stealStyleSheets: false, stealSiteStyle: true },
      search: {
        url: '',
        filePath: '',
        socketRoom: computed(() => AppState.socketRoom)
      },
      mode: '',
      pictures: computed(() => AppState.styleResults)
    })
    function getScrape() {
      for (const key in state.options) {
        if (state.options[key]) {
          state.mode = 'style steal'
          const payload = {
            service: 'styleService',
            action: key,
            search: state.search
          }
          queService.addAction(payload)
        }
      }
      queService.nextAction()
    }
    return { state, getScrape }
  }
}
</script>

<style scoped>

</style>
