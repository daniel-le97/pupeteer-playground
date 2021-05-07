<template>
  <div class=" text-light row p-3">
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
      goodPictures: computed(() => AppState.imageResults.downloadedImages),
      badPictures: computed(() => AppState.imageResults.failedImages),
      message: computed(() => AppState.imageResults.message),
      error: computed(() => AppState.imageResults.error),
      loading: computed(() => AppState.loading),
      imgsFound: computed(() => AppState.imageResults.found)

    })
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

</style>
