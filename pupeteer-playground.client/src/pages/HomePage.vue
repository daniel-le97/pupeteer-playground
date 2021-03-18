<template>
  <div class="container-fluid home">
    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-8">
        <div class="row justify-content-center p-5 bg-fade-dark">
          <div class="col-12 text-light">
            enter url
            <input v-model="state.url" class="w-100" type="text">
            <input v-model="state.filePath" class="w-100" type="text">
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
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { puppetService } from '../services/PuppetService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      url: '',
      filePath: ''
    })
    function getScreenCap() {
      puppetService.getScreenshot(state)
    }
    function getScrape() {
      puppetService.getScrape(state)
    }
    return {
      state,
      getScreenCap,
      getScrape
    }
  }
}

</script>

<style scoped lang="scss">
input{
  border-radius: 8px;
  background: transparent;
  color: rgb(209, 209, 209);
  border: solid 1px rgb(209, 209, 209);
}

.home{
 min-height: 100%;
}

.bg-fade-dark{
  border-radius: 8px;
  background: rgba(29, 29, 29, 0.382);
}
</style>
