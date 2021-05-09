<template>
  <header>
    <Navbar />
  </header>
  <main class="no-scroll">
    <div class="container-fluid pt-5 home text-light">
      <div class="row justify-content-center h-100 align-content-center p-1">
        <div class="col-md-8">
          <div class="row justify-content-start">
            <router-link :to="{name :'ImageStealer'}" class="col-3 rounded-top-8" :class="mode == 'ImageStealer'?'bg-fade-dark': 'bg-fade-light'">
              <small class=" text-info rounded-top-8 p-1 text-center ">
                Image Lifter
              </small>
            </router-link>
            <router-link :to="{name :'StyleThief'}" class="col-3 rounded-top-8" :class="mode == 'StyleThief'?'bg-fade-dark': 'bg-fade-light'">
              <small class=" text-info rounded-top-8 p-1 text-center ">
                Style Thief
              </small>
            </router-link>
          </div>
        </div>
        <div class="col-md-8 bg-fade-dark content1 rounded-8 rounded-top-left-0">
          <div class="row justify-content-center px-4 pt-4 pb-2 my-1 window">
            <router-view />
          </div>
        </div>
        <transition name="results" tag="div" class="col-md-8">
          <Results v-if="loading !== null" />
        </transition>
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-transparent text-primary text-center p-4">
      Made with <i class="bi bi-heart"></i> by Mick Shanny
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { socketService } from './services/SocketService'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await socketService.getSocketRoom()
    })
    return {
      appState: computed(() => AppState),
      mode: computed(() => route.name),
      loading: computed(() => AppState.loading)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css");

body{
 background-image: url('./assets/img/frame1.png'), url('./assets/img/frame2.png'), url('./assets/img/frame1.png'), url('./assets/img/frame2.png'), url('./assets/img/frame1.png'), url('./assets/img/frame2.png'), url('./assets/img/frame1.png'), url('./assets/img/frame2.png');
 background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
 background-size: 100vw, contain, contain, contain, contain, contain, contain, contain;
 background-position: 0 top, 0 125vw, 0 245vw, 0 365vw, 0 485vw, 0 605vw, 0 725vw, 0 845vw;
}

input{
  border-radius: 4px;
  padding: .3rem;
  background: transparent;
  color: rgb(209, 209, 209);
  border: solid 1px rgb(209, 209, 209);
}

.sweet-alert{
  background: black;
  color: var(--light)!important;
}

a {
color:var(--light)!important;
}

a:hover {
  text-decoration: none!important;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
  padding-left: 2em;
  padding-right: 2em;
  margin-bottom: 0em;
}

.home{
 min-height: 100%;
}

.bg-fade-dark{
  background:#1e1e1e80;
  backdrop-filter: blur(5px);
}
.bg-fade-light{
 background:#1e1e1e56;
}

.rounded-8{
  border-radius: 8px;
}
.rounded-top-8{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.rounded-top-left-0{
  border-top-left-radius: 0px;
}

.window{
  transition: all .5s ease;
}

// Results Transition
/* pictures fade in */
.results-enter-active,
.results-leave-active {
  transition: all .4s ease;
}
.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: scaleY(0) translateY(-120px);
}

// Scroll bar
*::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

*::-webkit-scrollbar-track {
  width: 2px;
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
 border-radius: 15px;
  background-color:#1e1e1e80;
}

.mbtn-light{
  color: var(--light);
  border: 1px solid var(--light);
  border-bottom: 4px solid var(--light);
  transform: translateY(-4px);
  transition: all .2s ease;
}

.mbtn-light:hover{
  color: var(--light);
  background: #1e1e1e80;
  border-bottom: 1px solid var(--light);
  transform: translateY(0px);
  margin-bottom: 3px;
}

</style>
