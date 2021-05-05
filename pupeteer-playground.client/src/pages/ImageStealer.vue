<template>
  <!-- <button @click="testData('big')" class="btn btn-outline-warning">
    add test data big
  </button>
  <button @click="testData('small')" class="btn btn-outline-warning">
    add test data small
  </button>
  <button @click="testData('smallest')" class="btn btn-outline-warning">
    add test data small
  </button> -->
  <div class="col-12 text-light">
    enter url
    <input v-model="state.search.url" class="w-100" type="text">
    <button class="btn btn-outline-light col-6" @click="getScreenCap">
      get site cap
    </button>
    <button class="btn btn-outline-light col-6" @click="getScrape">
      scrape images
    </button>
    <div class="row my-2 px-0">
      <div class="col-12 cog pl-4">
        <i class="fa fa-cog" aria-hidden="true" data-toggle="collapse" data-target="#settings"></i>
      </div>
      <div class="col-12">
        <div id="settings" data-toggle="collapse" class="row justify-items-center settings-container collapse">
          <div class="col-8">
            images and image sources
          </div>
          <div class="col-4 d-flex align-items-center">
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { puppetService } from '../services/PuppetService'
import { queService } from '../services/QueService'
import { AppState } from '../AppState'
export default {
  name: 'ImageStealer',
  setup() {
    const state = reactive({
      options: { scrapeImages: true, scrapeBackgrounds: false, scrapeThumbnails: false },
      search: {
        url: '',
        filePath: '',
        socketRoom: computed(() => AppState.socketRoom)
      },
      mode: '',
      pictures: computed(() => AppState.pictureResults)

    })
    function getScreenCap() {
      puppetService.getScreenshot(state.search)
    }
    function getScrape() {
      for (const key in state.options) {
        if (state.options[key]) {
          state.mode = 'picture scrape'
          const payload = {
            service: 'puppetService',
            action: key,
            search: state.search
          }
          queService.addAction(payload)
        }
      }
      queService.nextAction()
    }
    return {
      state,
      getScreenCap,
      getScrape,
      testData(size) {
        state.mode = 'picture scrape'
        puppetService.testData(size)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.settings-container{
  // transform: translateY(-1em);
}

.fa-cog{
  position: absolute;
  z-index: 1000;
  cursor: pointer;
}

.cog{
  min-height: 1em;
}

.compLoad-enter-active,
.compLoad-leave-active {
  transition: all 0.5s ease;
}
.compLoad-enter-from,
.compLoad-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

// animated flex

</style>
