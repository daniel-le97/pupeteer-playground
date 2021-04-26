<template>
  <div v-if="state.mode == 'none'"></div>
  <div v-else class="Results row rounded-8 justify-content-center p-5 bg-fade-dark my-1 window">
    <PictureResults v-if="state.mode == 'images'" />

    <StyleResults v-if="state.mode == 'colors'" />
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
