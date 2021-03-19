<template>
  <header>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-transparent text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
#app{
 background-image: url('./assets/img/Background-blur.png');
 background-size: cover;
 background-position: center;

}
</style>
