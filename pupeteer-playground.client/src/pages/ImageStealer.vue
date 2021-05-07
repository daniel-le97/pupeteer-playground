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
    <div class="row my-2 px-0 justify-content-center align-items-center">
      <button class=" btn sbtn round" @click="getScrape">
        <div class="btn-text">
          Scrape Images
        </div>
      </button>
      <div class=" cog pl-4">
        <i class="fa fa-cog mr-3" aria-hidden="true" data-toggle="collapse" data-target="#settings" v-tooltip:right="'configure'"></i>
      </div>
      <div class="col-12">
        <div id="settings" data-toggle="collapse" class="row bg-fade-light rounded-8 p-3 justify-content-center align-items-center settings-container collapse">
          <div class="col-6 py-1">
            Images and image sources on the page
          </div>
          <div class="col-3 py-1 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeImages" @click="state.options.scrapeImages = !state.options.scrapeImages" />
          </div>
          <div class="col-6 py-1">
            Background images
          </div>
          <div class="col-3 py-1 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeBackgrounds" @click="state.options.scrapeBackgrounds = !state.options.scrapeBackgrounds" />
          </div>
          <div class="col-6 py-1">
            Full images from thumbnails
          </div>
          <div class="col-3 py-1 d-flex align-items-center">
            <Toggle :bool="state.options.scrapeThumbnails" @click="state.options.scrapeThumbnails = !state.options.scrapeThumbnails" />
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
  position: absolute;
  z-index: 1000;
  cursor: pointer;

}

.cog{
  min-height: 1em;
}

.fa-cog:hover{
    animation: rotate-btn 1s linear 3;
  -webkit-animation: rotate-btn 1s linear 3;
}

@keyframes rotate-btn {
  0% {
    transform: rotate(0),scale(1.5);
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
