<template>
  <div class="masonry-with-columns">
    <div v-for="(item,i) in items" :key="i" class="">
      <slot name="item" :i="i" :item="item" />
    </div>
  </div>
</template>

<script>

import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
export default {
  name: 'Masonry',
  props: { items: { type: Array, default: () => [] } },
  setup() {
    const state = reactive({

    })
    return { state }
  }
}
</script>

<style lang='scss' scoped>
.masonry-with-columns {
  // display: flex;
  // flex-wrap: wrap;
  // flex-direction: column;
  // max-height: 1000px;
  columns: 200px!important;
  column-gap: 1rem;
  div, img {
    float: left;
    width: 100%;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    text-align: center;
      }
}
</style>
