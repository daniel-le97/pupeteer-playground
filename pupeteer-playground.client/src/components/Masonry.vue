<template>
  <transition-group name="masonry" class="masonry-with-columns" tag="div">
    <div v-for="(item,i) in items" :key="i" class="">
      <slot name="item" :i="i" :item="item" />
    </div>
  </transition-group>
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

/* pictures fade in */
.masonry-enter-active,
.masonry-leave-active {
  transition: all 0.5s ease;
}
.masonry-enter-from,
.masonry-leave-to {
  opacity: 0;
  transform: scale(.8);
}
</style>
