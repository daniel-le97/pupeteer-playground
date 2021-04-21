<template>
  <div v-if="state.mode == 'none'"></div>
  <div v-else class="Results row rounded-8 justify-content-center p-5 bg-fade-dark my-1 window">
    <div v-if="state.mode == 'images'">
      <PictureResults />
    </div>
    <div v-if="state.mode == 'colors'">
      <StyleResults />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
export default {
  name: 'Results',
  setup() {
    const state = reactive({
      mode: 'colors'

    })
    return { state }
  }
}
</script>

<style scoped>

</style>
