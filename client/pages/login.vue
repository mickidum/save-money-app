<template>
  <section>
    <div class="forms">
      <h1 class="text-center">Save App Login</h1>
      <form autocomplete="off" @submit.stop.prevent="handleSubmit" class="pure-form pure-form-stacked">
        <fieldset>
          <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
          <p>
            <label for="email">Email</label>
            <input v-model="email" id="email" type="email" placeholder="Enter your email" autofocus>
          </p>
          
      
          <p>
            <label for="password">Password</label>
            <input v-model="password" id="password" type="password" placeholder="Enter your password">
          </p>
      
          <p>
            <button :disabled="loading" type="submit" class="submit-button pure-button pure-button-primary button-primary">Submit</button>
          </p>
          <p class="text-center">
          No account yet?
          <nuxt-link tag="a" class="text-center" to="/signup" exact>Register</nuxt-link>
        </p>
        </fieldset>
      </form>
    </div>
    <div class="employer">
      <button @click="employer" class="pure-button button-success">For Lazy Employer</button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'forms',
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null
    }
  },
  mounted() {
    this.$store.commit('intents/emptyList');
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.loading = false;
        // this.$router.replace('/');
      } 
      catch (e) {
        this.loading = false
        this.error = e.response.data.error
      }
    },
    employer() {
      this.email = "demo@test.com";
      this.password = "demo123";
    }
  },
  
}
</script>