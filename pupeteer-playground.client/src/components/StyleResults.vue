<template>
  <div class="col-12 d-flex justify-content-center rounded w-100 p-0 checkerboard">
    <div v-for="color in colorSort(state.colors)"
         :id="'col:'+color.color"
         :key="color.color"
         class="color-block shadow-sm"
         v-tooltip:top="`<div>
           ${color.color}
           <i class='bi-clipboard pl-1'></i>
           </div>`"
         :style="`background:${color.color};width:${Math.ceil(color.percent)}%;`"
         @click="copyColor(color.color)"
    >
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted, watch, watchEffect } from 'vue'
import { logger } from '../utils/Logger'
import notification from '../utils/Notification'
import $ from 'jquery'
export default {
  name: 'StyleResults',
  setup() {
    const state = reactive({
      colors: computed(() => AppState.styleResults.colors),
      message: computed(() => AppState.imageResults.message),
      error: computed(() => AppState.imageResults.error),
      loading: computed(() => AppState.loading)
    })
    function colorSort(dict) {
      const arr = []
      for (const key in dict) {
        const value = dict[key]
        arr.push({ color: key, percent: value })
      }
      arr.sort((a, b) => b.percent - a.percent)
      return arr
    }
    return {
      state,
      colorSort,
      copyColor(color) {
        navigator.clipboard.writeText(color)
        notification.toast('color copied', 'success', 'top-right', 2000, false)
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

<style lang='scss' scoped>

.square{
  min-height: 5vh;
  background-color: red;
  color: var(--primary);
}

.color-block{
  height:6vh;
  transition: all ease .2s;
  color: transparent;
}
.color-block:hover{
  color: var(--light);
}

.checkerboard{
  background-image: url('https://opengameart.org/sites/default/files/Transparency500.png') ;
  background-size: 45%;

}

.col-12{
  overflow: hidden;
  flex-wrap: nowrap;
}

.vue-tooltip{
  background: red;
}

/* pictures fade in */
.good-enter-active,
.good-leave-active {
  transition: all 0.5s ease;
}
.good-enter-from,
.good-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

/* Loader  */

.loader {
    --path: var(--info);
    --dot: var(--primary);
    --duration: 3s;
    width: 44px;
    height: 44px;
    position: relative;
    &:before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        display: block;
        background: var(--dot);
        top: 37px;
        left: 19px;
        transform: translate(-18px, -18px);
        animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    svg {
        display: block;
        width: 100%;
        height: 100%;
        rect,
        polygon,
        circle {
            fill: none;
            stroke: var(--path);
            stroke-width: 10px;
            stroke-linejoin: round;
            stroke-linecap: round;
        }
        polygon {
            stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
            stroke-dashoffset: 0;
            animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        rect {
            stroke-dasharray: (256 / 4 * 3) (256 / 4) (256 / 4 * 3) (256 / 4);
            stroke-dashoffset: 0;
            animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        circle {
            stroke-dasharray: (200 / 4 * 3) (200 / 4) (200 / 4 * 3) (200 / 4);
            stroke-dashoffset: 75;
            animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
    }
    &.triangle {
        width: 48px;
        &:before {
            left: 21px;
            transform: translate(-10px, -18px);
            animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
    }
}

@keyframes pathTriangle {
    33% {
        stroke-dashoffset: 74;
    }
    66% {
        stroke-dashoffset: 147;
    }
    100% {
        stroke-dashoffset: 221;
    }
}

@keyframes dotTriangle {
    33% {
        transform: translate(0, 0);
    }
    66% {
        transform: translate(10px, -18px);
    }
    100% {
        transform: translate(-10px, -18px);
    }
}

@keyframes pathRect {
    25% {
        stroke-dashoffset: 64;
    }
    50% {
        stroke-dashoffset: 128;
    }
    75% {
        stroke-dashoffset: 192;
    }
    100% {
        stroke-dashoffset: 256;
    }
}

@keyframes dotRect {
    25% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(18px, -18px);
    }
    75% {
        transform: translate(0, -36px);
    }
    100% {
        transform: translate(-18px, -18px);
    }
}

@keyframes pathCircle {
    25% {
        stroke-dashoffset: 125;
    }
    50% {
        stroke-dashoffset: 175;
    }
    75% {
        stroke-dashoffset: 225;
    }
    100% {
        stroke-dashoffset: 275;
    }
}

.loader {
    display: inline-block;
    margin: 0 16px;
}

html {
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: border-box;
    &:before,
    &:after {
        box-sizing: border-box;
    }
}
</style>
