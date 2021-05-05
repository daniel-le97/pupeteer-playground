<template>
  <nav class="navbar navbar-expand-lg ">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <span class="navbar-text d-flex justify-content-end fixed-top p-3">
        <button class="btn btn-outline-dark rounded-pill" @click="login" v-if="!user.isAuthenticated">Login</button>
        <div class="dropdown" v-else>
          <div class="btn btn-outline-secondary rounded-pill dropdown-toggle w-100" @click="state.dropOpen = !state.dropOpen">
            <img :src="user.picture" alt="user photo" height="40" class="rounded-circle" />
            <span class="mx-1"></span>
          </div>
          <div
            class="dropdown-menu p-0 bg-transparent w-25 justify-self-end"
            :class="{show: state.dropOpen}"
            @click="state.dropOpen = false"
          >
            <div class="p-2 pl-4 mt-1 rounded-pill bg-transparent text-secondary border border-secondary hoverable" @click="logout">logout</div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { AuthService } from '../services/AuthService'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })

    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>

.navbar{
position: absolute  ;
z-index: 0;
}
.dropdown-menu {
  user-select: none;
  border:none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
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
</style>
