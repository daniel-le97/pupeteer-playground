<template>
  <div class="col-12 text-light">
    enter url
    <input v-model="state.search.url" class="w-100" type="text">
    <div class="row my-3 px-0 justify-content-center align-items-center">
      <button class=" btn col-4 mbtn-light rounded-8" @click="getScrape">
        <div class="btn-text">
          Steal Style
        </div>
      </button>
      <div class="cog p-1 pl-2 pr-0 ml-2 pb-2" data-toggle="collapse" data-target="#settings" v-tooltip:right="'configure'">
        <i class="fa fa-cog mr-3" aria-hidden="true"></i>
      </div>
      <div class="col-12">
        <div id="settings" data-toggle="collapse" class="row bg-fade-light rounded-8  justify-content-center align-items-center settings-container collapse">
          <div class="col-9 col-md-7  py-2 pt-4">
            Main colors of the page
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeColors" @click="state.options.scrapeColors = !state.options.scrapeColors" />
          </div>
          <div class="col-9 col-md-7  py-2">
            Include text colors in the heist
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeTextColor" @click="state.options.scrapeTextColor = !state.options.scrapeTextColor" />
          </div>
          <div class="col-9 col-md-7  py-2">
            Steal style sheet
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeStyle" @click="state.options.scrapeStyle = !state.options.scrapeStyle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { queService } from '../services/QueService'
import $ from 'jquery'
export default {
  name: 'StyleThief',
  setup() {
    const state = reactive({
      options: { scrapeColors: true, scrapeTextColor: false, scrapeStyle: false },
      search: {
        url: '',
        filePath: '',
        socketRoom: computed(() => AppState.socketRoom)
      },
      pictures: computed(() => AppState.styleResults)
    })
    return {
      state,
      getScrape() {
        for (const key in state.options) {
          if (state.options[key]) {
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
    }
  },
  directives: {
    tooltip: function(el, binding) {
      $(el).tooltip({
        title: binding.value,
        placement: binding.arg,
        trigger: 'hover',
        html: true
      })
    }
  }
}
</script>

<style scoped>

</style>
