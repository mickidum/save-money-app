<template>
  <section class="container">
    <div class="forms">
      <h1 class="text-center">Save App Registration</h1>
      <form autocomplete="off" @submit.stop.prevent="register" class="pure-form pure-form-stacked">
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
            <label for="firstname">Name</label>
            <input v-model="firstname" id="firstname" type="text" placeholder="Enter your Name">
          </p>
          <p>
            <label for="firstname">Month Cost</label>
            <input v-model="monthcost" id="monthcost" type="number" placeholder="Enter your Month Cost">
          </p>
          <p>
            <button :disabled="loading" type="submit" class="submit-button pure-button pure-button-primary button-primary">Submit</button>
          </p>
          <p class="text-center">
          Already have an account?
          <nuxt-link tag="a" class="text-center" to="/login" exact>Login</nuxt-link>
        </p>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'forms',
  auth: false,
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      monthcost: '',
      loading: false,
      error: null
    }
  },
  methods: {
    async register() {
        try {
          this.loading = true;
          await this.$axios.post('/users', {
            email: this.email,
            password: this.password,
            name: this.firstname || 'john doe',
            settings: {
              monthCost: this.monthcost
            }
          })
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            },
          })
          this.loading = false;
          this.$router.push('/');
        } catch (e) {
          this.loading = false;
          this.error = e.response.data.error
        }
      }
    }
}
</script>