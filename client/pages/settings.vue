<template>
  <div class="settings-page">
    
    <div class="forms settings">
      <h1>All Settings</h1>
      <form autocomplete="off" @submit.stop.prevent="update" class="pure-form pure-form-stacked">
        <fieldset>
          <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
          <span v-if="message" class="pure-form-message" style="color: green;border-color:green;">{{message}}</span>
          <p>
            <label for="email">Email</label>
            <input  v-model="email" value="user.email" id="email" type="email" placeholder="Enter your email">
          </p>
          <p>
            <button @click.stop.prevent="changebutton" class="update-button pure-button pure-button-primary button-xsmall">{{ button }}</button>
            <label for="password">Password</label>
            <input :disabled="passnew" v-model="password" id="password" type="password" placeholder="Enter new password">
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
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      monthcost: '',
      loading: false,
      error: null,
      passnew: true,
      message: null,
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
    changebutton(e) {
    if (this.passnew) {
      this.button = 'Cancel'
    }else {
      this.button = 'Change';
    }
      return this.passnew = !this.passnew;
    },
    async update() {
        if (this.password) {
          var obj = {
            email: this.email,
            password: this.password,
            name: this.firstname || 'john doe',
            settings: {
              monthCost: this.monthcost
            }
          }
        }else {
          var obj = {
            email: this.email,
            name: this.firstname || 'john doe',
            settings: {
              monthCost: this.monthcost
            }
          }
        }
        try {
          await this.$axios.put('/users', obj).then((res) => {
            if (!res.data.success) {
              this.message = null;
              this.error = res.data.error;
            }else {
              this.passnew = true;
              this.password = '';
              this.error = null;
              this.message = res.data.message;
            }
          })
          // this.$router.push('/');
        } catch (e) {
          this.error = e.response.data.error
          console.log(e)
        }
      }
    }
}
</script>
