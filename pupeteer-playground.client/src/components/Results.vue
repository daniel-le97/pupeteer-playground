<template>
  <div v-if="state.mode == 'none'"></div>
  <div v-else class="Results row rounded-8 justify-content-center p-5 bg-fade-dark my-1 window">
    <PictureResults v-if="state.mode == 'ImageStealer'" />

    <StyleResults v-if="state.mode == 'StyleThief'" />
    <div class="col">
      <button class="btn btn-outline-light" @click="downloadResults">
        download results
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { firebaseService } from '../services/FireBaseService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'Results',
  setup() {
    const route = useRoute()
    const state = reactive({
      mode: computed(() => route.name)

    })
    return {
      state,
      async downloadResults() {
        await firebaseService.downloadFireBase()
      }
    }
  }
}
</script>

<style scoped>

</style>
