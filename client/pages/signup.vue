<template>
  <section class="container">
    <div class="col-md-6 offset-md-3 mt-3">
      <b-alert show v-if="error" variant="danger">{{error}}</b-alert>
      <form autocomplete="off" @submit.stop.prevent="register">
        <div class="form-group">
          <label for="username">Name</label>
          <b-form-input
            id="firstname"
            v-model="firstname"
            type="text"
            autofocus="true"
            placeholder="Enter your Name"
            />
        </div>
        <div class="form-group">
          <label for="monthcost">Month Cost</label>
          <b-form-input
            id="monthcost"
            v-model="monthcost"
            type="number"
            placeholder="Enter your Month Cost"
            />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            type="email"
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
          Already have an account?
          <router-link :to="{ name: 'login'}" tag="a">
            Login
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
export default {
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
          this.$router.push('/');
        } catch (e) {
          this.error = e.response.data.error
        }
      }
    }
}
</script>