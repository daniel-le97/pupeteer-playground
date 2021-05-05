<template>
  <div class="switch-container" @click=" state.options.scrapeImages = !state.options.scrapeImages">
    <div class="switch" :class="state.options.scrapeImages? 'switchOn': 'switchOff'"></div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
export default {
  name: 'Component',
  setup() {
    const state = reactive({

    })
    return { state }
  }
}
</script>

<style scoped>
.switch{
  height: .9em;
  width: .9em;
  transition: all .2s;
  border-radius: 10px;
}

.switch-container{
  display: flex;
  height: 1em;
  width: 3em;
  border: 1px solid var(--light);
  border-radius: 10px;
  cursor: pointer;
}

.switchOn{
  background-color: var(--light);
  border: 1px solid transparent;
  transform: translateX(2em);
}
.switchOff{
  background-color: transparent;
  border: 1px solid var(--light);
  transform: translateX(-1px);
}
</style>
