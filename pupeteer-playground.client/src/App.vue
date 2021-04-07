<template>
  <header>
    <Navbar />
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
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
#app{
 background-image: url('./assets/img/Background-blur.png');
 background-size: cover ;
 background-position: center;

}

// Scroll bar
body::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

body::-webkit-scrollbar-track {
  width: 2px;
  background-color: transparent;
}

body::-webkit-scrollbar-thumb {
 border-radius: 10px;
  background-color:#1e1e1e80;
}
</style>
