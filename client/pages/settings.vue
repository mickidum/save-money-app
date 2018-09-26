<template>
  <div class="settings-page">
    
    <div class="forms settings">
      <h1>All Settings</h1>
      <form autocomplete="off" @submit.stop.prevent="update" class="pure-form pure-form-stacked">
        <fieldset>
          <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
          <!-- <div class="b-change"><span>Email: {{user.email}}</span> <button @click.stop.prevent="changebutton" class="pure-button pure-button-primary button-xsmall">Change</button></div> -->
          <p>
            <label for="email">Email</label>
            <button @click.stop.prevent="changebutton" class="update-button pure-button pure-button-primary button-xsmall">{{button}}</button>
            <input :disabled="changebutton"  v-model="email" value="user.email" id="email" type="email" placeholder="Enter your email">
          </p>
          <p>
            <label for="password">Password</label>
            <input :disabled="changebutton" v-model="password" id="password" type="password" placeholder="Enter new password">
          </p>
          <p>
            <label for="firstname">Name</label>
            <input :disabled="changebutton" v-model="firstname" id="firstname" type="text" placeholder="Enter your Name">
          </p>
          <p>
            <label for="firstname">Month Cost</label>
            <input :disabled="changebutton" v-model="monthcost" id="monthcost" type="number" placeholder="Enter your Month Cost">
          </p>
          <p>
            <button :disabled="loading" type="submit" class="submit-button pure-button pure-button-primary button-primary">Update</button>
          </p>
          <p class="text-center">
          <nuxt-link tag="a" class="text-center" to="/" exact>Return to Home Screen</nuxt-link>
        </p>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  // layout: 'forms',
  // auth: false,
  // middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      monthcost: '',
      loading: false,
      error: null,
      button: 'Change'
    }
  },
  computed: {
    ...mapGetters({
      logged: 'isAuthenticated', 
      user: 'loggedInUser'
    })
  },
  mounted() {
    this.email = this.user.email;
    this.firstname = this.user.name || 'John Doe';
    this.monthcost = this.user.settings.monthCost;
  },
  methods: {
    changebutton() {
      this.button = 'Update';
      console.log(e)
    },
    async update() {
        try {
          await this.$axios.put('/users', {
            email: this.email,
            password: this.password,
            name: this.firstname || 'john doe',
            settings: {
              monthCost: this.monthcost
            }
          })
          this.$router.push('/');
        } catch (e) {
          this.error = e.response.data.error
        }
      }
    }
}
</script>
