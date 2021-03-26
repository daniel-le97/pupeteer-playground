<template>
  <div class="container-fluid home ">
    <div class="row justify-content-center h-100 align-content-center">
      <div class="col-8 content1">
        <div class="row justify-content-center p-5 bg-fade-dark my-1 window">
          <div class="col-12 text-light">
            enter url
            <input v-model="state.search.url" class="w-100" type="text">
            <input v-model="state.search.filePath" class="w-100" type="text">
            <div class="mb-3">
              enter file path
            </div>
            <button class="btn btn-outline-light col-6" @click="getScreenCap">
              get site cap
            </button>
            <button class="btn btn-outline-light col-6" @click="getScrape">
              scrape images
            </button>
          </div>
        </div>
      </div>
      <transition name="compLoad">
        <div class="col-8 content" v-if="state.mode == 'picture scrape'">
          <Picture-Results />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { puppetService } from '../services/PuppetService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      search: {
        url: '',
        filePath: ''
      },
      mode: '',
      pictures: computed(() => AppState.pictureResults)

    })
    function getScreenCap() {
      puppetService.getScreenshot(state.search)
    }
    function getScrape() {
      state.mode = 'picture scrape'
      puppetService.getScrape(state.search)
    }
    return {
      state,
      getScreenCap,
      getScrape
    }
  }
}

</script>

<style lang="scss">
input{
  border-radius: 4px;
  padding: .3rem;
  background: transparent;
  color: rgb(209, 209, 209);
  border: solid 1px rgb(209, 209, 209);
}

.home{
 min-height: 100%;
}

.bg-fade-dark{
  border-radius: 8px;
  background:#1e1e1e80;
}

.window{
  transition: all .5s ease;
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
