<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid home text-light">
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
          <div class="row justify-content-center p-5 my-1 window">
            <router-view />
          </div>
        </div>
        <div class="col-md-8">
          <Results />
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-transparent text-light text-center p-4">
      Made with 💖 by CodeWorks
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
      mode: computed(() => route.name)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css");
#app{
 background-image: url('./assets/img/Background-blur.png');
 background-size: cover ;
 background-position: center;

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
