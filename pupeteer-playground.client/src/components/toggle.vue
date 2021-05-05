/* eslint-disable vue/no-mutating-props */
<template>
  <div class="switch-container">
    <div class="switch" :class="bool? 'switchOn': 'switchOff'"></div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
export default {
  props: {
    bool: { type: Boolean, required: true },
    options: { size: { type: Number, default: 20 } }
  },
  name: 'Toggle',
  setup(props) {
    const state = reactive({

    })
    return { state }
  }
}
</script>

<style lang='scss' scoped>
.switch{
  height: 20px;
  width: 20px;
  transition: all .2s;
  border-radius: 10px;
}

.switch-container{
  display: flex;
  height: 20px;
  width: 60px;
  border: 1px solid var(--light);
  border-radius: 10px;
  cursor: pointer;
}

.switchOn{
  background-color: var(--light);
  border: 1px solid transparent;
  transform: translate(39px, -1px);
}
.switchOff{
  background-color: transparent;
  border: 1px solid var(--light);
  transform: translate(-1px, -1px);
}
</style>
