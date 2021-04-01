<template>
  <div class="masonry-with-flex">
    <div v-for="(item,i) in items" :key="item" class="">
      <slot :i="i" :item="item" />
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
.masonry-with-flex {
  column-count: 4;
  column-gap:10px;
  row-gap: 10px;
  word-break: keep-all;
  white-space:pre;
  word-wrap:break-word;
  padding: 100px;
  div {
    margin-bottom:10px ;
    background: #EC985A;
    color: white;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
    word-
  }
  @for $i from 1 through 3 {
    div:nth-child(#{$i}) {
      $h: (random(400) + 100) + px;
      min-height: $h;
    }
  }

}
</style>
