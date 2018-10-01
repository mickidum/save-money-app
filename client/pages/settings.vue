<template>
  <div class="settings-page">
    <nuxt-link tag="span" class="close-button" to="/" exact></nuxt-link>
    <div class="forms settings">
      <h1>All Settings</h1>
      <form autocomplete="off" @submit.stop.prevent="update" class="pure-form pure-form-stacked">
        <fieldset>
          <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
          <span v-if="message" class="success-message">{{message}}</span>
          <p>
            <label for="email">Email</label>
            <input  v-model="email" value="user.email" id="email" type="email" placeholder="Enter your email">
          </p>
          <p>
            <span @click.stop.prevent="changebutton" class="update-button pure-button pure-button-primary button-xsmall">{{ button }}</span>
            <label for="password">Password</label>
            <input :disabled="passnew" v-model="password" id="password" type="password" placeholder="Enter new password">
          </p>
          <p>
            <label for="firstname">Name</label>
            <input v-model="firstname" id="firstname" type="text" placeholder="Enter your Name">
          </p>
          <p>
            <label for="monthcost">Month Cost</label>
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
      <p v-if="logged">
        <button @click="logoutHandler" class="text-center pure-button">Logout</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  layout: 'forms',
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
      this.password = '';
    if (this.passnew) {
      this.button = 'Cancel'
    }else {
      this.button = 'Change';
    }
      return this.passnew = !this.passnew;
    },
    async update() {

        this.passnew = false;
        this.button = 'Change';
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
          this.loading = true;
          await this.$axios.put('/users', obj).then((res) => {
            if (!res.data.success) {
              this.message = null;
              this.error = res.data.error;
            }else {
              this.passnew = true;
              this.error = null;
              this.message = res.data.message;
              if (this.password || this.email !== this.user.email) {
                setTimeout(() => {
                  this.message = 'Redirecting to login';
                }, 1000);
                setTimeout(() => {
                  this.$auth.logout();
                }, 2000);
              }
              else {
                this.$auth.fetchUser();
              }
            }
          })
          this.loading = false;
        } catch (e) {
          this.loading = false;
          this.error = e.response.data.error;
        }
      },
      async logoutHandler() {
        try {
          this.loading = true
          await this.$auth.logout();
        } catch (err) {
          this.loading = false
          alert(err.message || 'An error occurred.')
        }
      }
    } 
}
</script>
