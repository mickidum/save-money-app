<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxt-link tag="a" class="navbar-brand" to="/" exact>Smoke and Save</nuxt-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="isAuthenticated">
            <nuxt-link class="nav-link" to="/profile">Hello {{ loggedInUser.email }}</nuxt-link>
          </li>
          <li v-if="isAuthenticated">
            <a class="nav-link" href="#" @click="logoutHandler">
              Logout
            </a>
          </li>
          <li v-if="!isAuthenticated">
            <nuxt-link tag="a" class="nav-link" to="/login" exact>
              Signin
            </nuxt-link>
          </li>
          <li v-if="!isAuthenticated">
            <nuxt-link tag="a" class="nav-link" to="/signup" exact>
              Signup
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logoutHandler() {
      try {
        this.loading = true
        await this.$auth.logout();
        this.$router.push('/login')
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    }
  }
}
</script>