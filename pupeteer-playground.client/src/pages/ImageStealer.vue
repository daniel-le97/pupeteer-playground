<template>
  <button @click="testData('big')" class="btn btn-outline-warning">
    add test data big
  </button>
  <button @click="testData('small')" class="btn btn-outline-warning">
    add test data small
  </button>
  <button @click="testData('smallest')" class="btn btn-outline-warning">
    add test data small
  </button>
  <div class="col-12 text-light">
    enter url
    <input v-model="state.search.url" class="w-100" type="text">
    <div class="row my-3 px-0 justify-content-center align-items-center">
      <button class=" btn col-4 mbtn-light rounded-8" @click="getScrape">
        <div class="btn-text">
          Scrape Images
        </div>
      </button>
      <div class="cog p-1 pl-2 pr-0 ml-2 pb-2" data-toggle="collapse" data-target="#settings" v-tooltip:right="'configure'">
        <i class="fa fa-cog mr-3" aria-hidden="true"></i>
      </div>
      <div class="col-12">
        <div id="settings" data-toggle="collapse" class="row bg-fade-light rounded-8  justify-content-center align-items-center settings-container collapse">
          <div class="col-9 col-md-7  py-2 pt-4">
            Images and image sources on the page
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeImages" @click="state.options.scrapeImages = !state.options.scrapeImages" />
          </div>
          <div class="col-9 col-md-7  py-2">
            Background images
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeBackgrounds" @click="state.options.scrapeBackgrounds = !state.options.scrapeBackgrounds" />
          </div>
          <div class="col-9 col-md-7  py-2">
            Full images from thumbnails
          </div>
          <div class="col-3 py-2 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeThumbnails" @click="state.options.scrapeThumbnails = !state.options.scrapeThumbnails" />
          </div>
          <div class="col-9 col-md-7  py-2">
            Clear results with each search
          </div>
          <div class="col-3 py-2 pb-4 d-flex align-items-center">
            <Toggle :bool="state.clearResults" @click="state.clearResults = !state.clearResults" />
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
import $ from 'jquery'
export default {
  name: 'ImageStealer',
  setup() {
    const state = reactive({
      clearResults: true,
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
      if (state.clearResults === true) puppetService.clearResults()
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

<style lang="scss" scoped>

.settings-container{
  // transform: translateY(-1em);
}

.fa-cog{
  z-index: 1000;

}

.cog{
  min-height: 1em;
  cursor: pointer;

}

.cog:hover .fa-cog{
    animation: rotate-btn 1s linear infinite;
  -webkit-animation: rotate-btn 1s linear infinite;
}

@keyframes rotate-btn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
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
