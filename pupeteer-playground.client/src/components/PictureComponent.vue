<template>
  <div class="pictureComponent  p-2 border-light">
    <img :src="state.picture.url" class=" rounded img-fluid img-hover">
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
export default {
  name: 'PictureComponent',
  props:
    { pictureData: { type: Object } },
  setup(props) {
    const state = reactive({
      picture: computed(() => props.pictureData)
    })
    return { state }
  }
}
</script>

<style scoped>
.img-hover{
  transition: all .3s ease;
}
.pictureComponent:hover img{
    transform: scale(1.03);
    z-index: +100;
}

</style>
