<template>
  <div v-if="state.mode == 'none'"></div>
  <div v-else class="Results row rounded-8 justify-content-center p-5 bg-fade-dark my-1 window">
    <PictureResults v-if="state.mode == 'images'" />

    <StyleResults v-if="state.mode == 'colors'" />
  </div>
  <button class="btn btn-outline-light" @click="downloadResults">
    download results
  </button>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { firebaseService } from '../services/FireBaseService'
export default {
  name: 'Results',
  setup() {
    const state = reactive({
      mode: 'colors'

    })
    return {
      state,
      downloadResults() {
        firebaseService.downloadFireBase()
      }
    }
  }
}
</script>

<style scoped>

</style>
