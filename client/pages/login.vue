<template>
  <section>
    <div class="col-md-6 offset-md-3 mt-3">
      <b-alert show v-if="error" variant="danger">{{error}}</b-alert>
      <form autocomplete="off" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            autofocus="true"
            placeholder="Enter your email"
            required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <b-form-input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            autofocus="true"
            placeholder="Enter your password"
            required/>
        </div>
        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
        <p class="text-center mt-3">
          No account yet
          <router-link :to="{ name: 'signup'}" tag="a">
            Register
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.loading = false;
        this.$router.push('/');
      } 
      catch (e) {
        this.loading = false
        this.error = e.response.data.error
      }
    }
  },
  
}
</script>