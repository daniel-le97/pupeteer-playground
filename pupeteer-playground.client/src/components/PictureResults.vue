<template>
  <div class=" text-light row p-5 bg-fade-dark">
    <div class=" border-primary">
      <Masonry :items="state.goodPictures">
        <template #item="{item}">
          <PictureComponent :picture-data="item" />
        </template>
      </Masonry>
    </div>
    <div class=" col-12 text-light justify-content-center">
      <div class="row">
        <Picture-component v-for="picture in state.badPictures" :key="picture.url" :picture-data="picture" />
      </div>
    </div>
    <!-- NOTE this section needs to be cut out into a component -->
    <div v-if="state.loading" class="col-12">
      <div class="row align-items-center">
        <div class="col-8">
          Getting your pictures now. This could take a minute...
        </div>
        <div class="col">
          <div class="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="state.error" class="col-12">
      {{ state.error }}
      <i class="ml-2 fas fa-sad-tear    "></i>
    </div>
  <!-- --------------------------------------------------------- -->
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted, watch, watchEffect } from 'vue'
import { logger } from '../utils/Logger'
export default {
  name: 'PictureResults',
  setup() {
    const state = reactive({
      goodPictures: computed(() => AppState.pictureResults.downloadedImages),
      badPictures: computed(() => AppState.pictureResults.failedImages),
      error: computed(() => AppState.pictureResults.error),
      loading: computed(() => AppState.loading)

    })
    watch(
      () => state.goodPictures,
      (state, prevState) => {
        logger.log('tried to draw grid')
      },
      { deep: true }
    )
    return { state }
  }
}
</script>

<style lang='scss' scoped>

.masonry-with-columns {
  columns: 6 200px;
  column-gap: 1rem;
  div {
    width: 150px;
    color: white;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
  }
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
